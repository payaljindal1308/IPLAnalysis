const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray) => {
    let tossAndMatchWinningTeams = getTossAndMatchWinningTeams(jsonMatchesArray);
    console.log(tossAndMatchWinningTeams);
    fs.writeFileSync('public/output/tossAndMatchWon.json', JSON.stringify(tossAndMatchWinningTeams));
});

function getTossAndMatchWinningTeams(jsonMatchesArray){
    return jsonMatchesArray.reduce((tossAndMatchWinningTeams, dataRow) => {
        const { winner, toss_winner } = dataRow || {};
        if (winner === toss_winner){
            if(tossAndMatchWinningTeams[winner]) tossAndMatchWinningTeams[winner] += 1;
            else tossAndMatchWinningTeams[winner] = 1;
        }
        return tossAndMatchWinningTeams;
    },{});
}
