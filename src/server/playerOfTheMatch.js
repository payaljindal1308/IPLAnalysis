const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray) => {      
        let playersOfTheMatch = getPlayersOfTheMatchBySeason(jsonMatchesArray);
        let highestPlayersOnly = getHighestPlayersOnlyBySeason(playersOfTheMatch);
        console.log(highestPlayersOnly);
        fs.writeFileSync('public/output/playerOfTheMatch.json', JSON.stringify(highestPlayersOnly));
    });

function getPlayersOfTheMatchBySeason(jsonMatchesArray){
    return jsonMatchesArray.reduce((playersData, dataRow)  =>  { 
            const { player_of_match, season } = dataRow ||{};
            if(playersData[season]){
                if(playersData[season][player_of_match]) playersData[season][player_of_match]+=1;
                else playersData[season][player_of_match] = 1;
                if (playersData[season][player_of_match] > playersData[season].max){
                    playersData[season].max = playersData[season][player_of_match];
                    playersData[season].highest = [player_of_match];
                }
                else if (playersData[season][player_of_match] === playersData[season].max){
                    playersData[season].highest.push(player_of_match);
                }
            } 
            else {
                playersData[season] = {
                    max: 1,
                    highest: [player_of_match]
                };
            }
            return playersData;
    },{});
}

function getHighestPlayersOnlyBySeason(playersData){
    return Object.keys(playersData).reduce((highestPlayer, data) => {
        highestPlayer[data] = playersData[data].highest;
        return highestPlayer;
    },{});
}
