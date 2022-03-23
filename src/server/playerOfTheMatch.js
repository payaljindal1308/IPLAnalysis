const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj) => {
    let playerOfTheMatchPlayers = getPlayersOFTheMatches(jsonMatchesObj);
    let maximumTimesPlayerOfTheMatch = highestPlayerOfTheMatch(playerOfTheMatchPlayers, jsonMatchesObj);
    console.log(maximumTimesPlayerOfTheMatch);
    fs.writeFile('./src/public/output/playerOfTheMatch.json', JSON.stringify(maximumTimesPlayerOfTheMatch),{ flag: 'a+' }, err => {} )
});


function getPlayersOFTheMatches(jsonMatchesObj){
    return jsonMatchesObj.reduce((teamObj, element) => { teamObj[element.player_of_match] = 0; return teamObj},{});
}


function highestPlayerOfTheMatch(playerOfTheMatchPlayers, jsonMatchesObj){
    jsonMatchesObj.forEach(element => playerOfTheMatchPlayers[element.player_of_match] += 1);
    return Object.keys(playerOfTheMatchPlayers).find(keys => { return playerOfTheMatchPlayers[keys] === Math.max(...Object.values(playerOfTheMatchPlayers));
    });
}
