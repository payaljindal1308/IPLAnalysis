
const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    

csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchesObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesObj)=>{  
        let extraRuns = getExtraRuns(matchIdsArray, jsonDeliveriesObj);
        console.log(extraRuns);
        fs.writeFile('public/output/extraRunsPerTeam.json', JSON.stringify(extraRuns),{ flag: 'a+' }, err => {} )
    });
});


//Function to get match ids of 2016 matches

function getMatchIds(jsonMatchesObj){
    let MatchIds =[];
    jsonMatchesObj.forEach(element => {
        if (element.season === '2016'){
            MatchIds.push(element.id);
        } 
    });
    return MatchIds;
}


// function to return extra runs per team in 2016
function getExtraRuns(matchIdsArray, jsonDeliveriesObj){
    let TeamObject = {};
        jsonDeliveriesObj.forEach( element => {
            if (matchIdsArray.includes(element.match_id)){
                if(TeamObject[element.bowling_team]){
                    TeamObject[element.bowling_team] += Number(element.extra_runs);
                }
                else {
                    TeamObject[element.bowling_team] = Number(element.extra_runs);
                }
            }
        });
    return TeamObject;
}