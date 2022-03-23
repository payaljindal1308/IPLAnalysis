
const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = './src/data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    

csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchesObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesObj)=>{  
        let extraRuns = getExtraRuns(matchIdsArray, jsonDeliveriesObj);
        console.log(extraRuns);
        fs.writeFile('./src/public/output/extraRunsPerTeam.json', JSON.stringify(extraRuns),{ flag: 'a+' }, err => {} )
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
        for (let index =0; index < jsonDeliveriesObj.length; index++){
            if (matchIdsArray.includes(jsonDeliveriesObj[index].match_id)){
                if(TeamObject[jsonDeliveriesObj[index].bowling_team]){
                    TeamObject[jsonDeliveriesObj[index].bowling_team] += Number(jsonDeliveriesObj[index].extra_runs);
                }
                else {
                    TeamObject[jsonDeliveriesObj[index].bowling_team] = Number(jsonDeliveriesObj[index].extra_runs);
                }
                }
            }
    return TeamObject;
}