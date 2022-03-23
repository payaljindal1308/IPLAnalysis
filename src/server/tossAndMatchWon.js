const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj) => {
    let teamObj = getTeamsObject(jsonMatchesObj);
    let tossAndMatchWinningTeams = getTossAndMatchWinningTeams(jsonMatchesObj, teamObj);
    console.log(tossAndMatchWinningTeams);
    fs.writeFile('./src/public/output/tossAndMatchWon.json', JSON.stringify(tossAndMatchWinningTeams),{ flag: 'a+' }, err => {} )
});



function getTeamsObject(jsonMatchesObj){
    return jsonMatchesObj.reduce((teamObj, element) => { teamObj[element.toss_winner] = 0; return teamObj},{});
}


function getTossAndMatchWinningTeams(jsonMatchesObj, jsonTeamsObject){
    jsonMatchesObj.forEach(element => {
        if (element.toss_winner === element.winner){
            jsonTeamsObject[element.toss_winner] += 1;
        }
    });
    return jsonTeamsObject;
}
