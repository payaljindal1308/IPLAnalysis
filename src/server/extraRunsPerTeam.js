
const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    

csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray)=>{ 
    let matchIdsFor2016 = getMatchIdsFor2016(jsonMatchesArray);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesArray)=>{  
        let extraRunsPerTeamFor2016 = getExtraRunsPerTeamFor2016(matchIdsFor2016, jsonDeliveriesArray);
        console.log(extraRunsPerTeamFor2016);
        fs.writeFileSync('public/output/extraRunsPerTeam.json', JSON.stringify(extraRunsPerTeamFor2016));
    });
});


function getMatchIdsFor2016(jsonMatchesArray){
    return jsonMatchesArray.reduce((matchIds2016Object, dataRow) => {
        let id = dataRow.id;
        let season = dataRow.season;
        if (season === '2016') matchIds2016Object[id] = 1; 
        return matchIds2016Object;
    },{});
}

function getExtraRunsPerTeamFor2016(matchIds2016Obj, jsonDeliveriesArray){
    return jsonDeliveriesArray.reduce((extraRunsPerTeamFor2016,dataRow) => {
        let id = dataRow.match_id;
        let bowlingTeam = dataRow.bowling_team;
        let extraRuns = Number(dataRow.extra_runs);
        if (matchIds2016Obj[id]){
            if(extraRunsPerTeamFor2016[bowlingTeam]) extraRunsPerTeamFor2016[bowlingTeam] += extraRuns;
            else extraRunsPerTeamFor2016[bowlingTeam] = extraRuns;
        }
        return extraRunsPerTeamFor2016;
    },{});
}