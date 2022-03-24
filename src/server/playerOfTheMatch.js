const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj) => {
    let matchIds = getMatchIdsWithSeason(jsonMatchesObj);      
        let highestPlayerOfTheMatch = gethighestPlayerOfTheMatch(matchIds);
        console.log(highestPlayerOfTheMatch);
        fs.writeFile('./src/public/output/playerOfTheMatch.json', JSON.stringify(highestPlayerOfTheMatch),{ flag: 'a+' }, err => {} )
    });

function getMatchIdsWithSeason(jsonMatchesObj){
    let matchIds = {};
    jsonMatchesObj.forEach(element => { 
        if(matchIds[element.season]) {
            if(matchIds[element.season][element.player_of_match]) matchIds[element.season][element.player_of_match]+=1;
            else matchIds[element.season][element.player_of_match] = 1;
        }
        else{
            matchIds[element.season] = {};
            matchIds[element.season][element.player_of_match] = 1;
        }
    });
    return matchIds;
 
}



function gethighestPlayerOfTheMatch(matchIds){
    let highestPlayerOfMatch = Object.keys(matchIds).reduce((playerArray,keys) => {
            playerArray[keys] = Object.keys(matchIds[keys]).find(element => {
        if(matchIds[keys][element] === Math.max(...Object.values(matchIds[keys]))) return element;
    }) 
    return playerArray;
    },{});
    return highestPlayerOfMatch;
}
