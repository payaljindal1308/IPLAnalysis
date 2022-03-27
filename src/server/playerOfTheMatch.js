const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray) => {      
        let playersOfTheMatch = getPlayersOfTheMatch(jsonMatchesArray);
        let highestPlayersOnly = getHighestPlayersOnly(playersOfTheMatch);
        console.log(highestPlayersOnly);
        fs.writeFileSync('public/output/playerOfTheMatch.json', JSON.stringify(highestPlayersOnly));
    });

function getPlayersOfTheMatch(jsonMatchesArray){
    return jsonMatchesArray.reduce((playersData, dataRow)  =>  { 
            let player = dataRow.player_of_match;
            let season = dataRow.season;
            if(playersData[season]){
                if(playersData[season][player]) playersData[season][player]+=1;
                else playersData[season][player] = 1;
                if (playersData[season][player] > playersData[season].max){
                    playersData[season].max = playersData[season][player];
                    playersData[season].highest = [player];
                }
                else if (playersData[season][player] === playersData[season].max){
                    playersData[season].highest.push(player);
                }
            } 
            else {
                playersData[season] = {
                    max: 1,
                    highest: [player]
                };
            }
            return playersData;
    },{});
}

function getHighestPlayersOnly(playersData){
    return Object.keys(playersData).reduce((highestPlayer, data) => {
        highestPlayer[data] = playersData[data].highest;
        return highestPlayer;
    },{});
}
