const fs = require('fs');
const csvFilePath = 'data/matches.csv';
const csv = require('csvtojson')

csv().fromFile(csvFilePath).then((jsonDeliveriesArray)=>{  
    let matchesWonByTeamsPerSeason = findMatchesPerTeamPerSeason(jsonDeliveriesArray); 
    console.log(matchesWonByTeamsPerSeason);
    fs.writeFileSync('public/output/matchesPerTeam.json', JSON.stringify(matchesWonByTeamsPerSeason));
});

function findMatchesPerTeamPerSeason(jsonDeliveriesArray){
    

    return jsonDeliveriesArray.reduce((matchesWonByTeamsPerSeason, dataRow) => {
        const { winner, season } = dataRow || {};
        if(dataRow.winner){
        if(matchesWonByTeamsPerSeason[winner]) {
            if(matchesWonByTeamsPerSeason[winner][season]){
                matchesWonByTeamsPerSeason[winner][season] += 1;
            }
            else{
                matchesWonByTeamsPerSeason[winner][season] = 1;
            }
        }
        else{
            matchesWonByTeamsPerSeason[winner] = {};
            matchesWonByTeamsPerSeason[winner][season] = 1;
        }
        }
        return matchesWonByTeamsPerSeason;
    },{});
}   
