
const fs = require('fs');
const csvFilePathMatches = '/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/data/matches.csv';
const csvMatches = require('csvtojson')
const csvFilePathDeliveries = '/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    

csvMatches().fromFile(csvFilePathMatches).then((jsonMatchIdObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchIdObj);
    csvDeliveries().fromFile(csvFilePathDeliveries).then((jsonDeliveriesObj)=>{  
        let extraRuns = getExtraRuns(matchIdsArray, jsonDeliveriesObj);
        console.log(extraRuns);
        fs.writeFile('/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/public/output/extraRunsPerTeam.json', JSON.stringify(extraRuns),{ flag: 'a+' }, err => {} )
    });
});


//Function to get match ids of 2016 matches

function getMatchIds(jsonMatchIdObj){
    let MatchIds =[];
    jsonMatchIdObj.forEach(element => {
        if (element.season === '2016'){
            MatchIds.push(element.id);
        } 
    });
    return MatchIds;
}


// function to return extra runs per team in 2016
function getExtraRuns(matchIdsArray, jsonDeliveriesObj){
    let TeamObject = {};
        for ( let id of matchIdsArray){
            for (let index =0; index < jsonDeliveriesObj.length; index++){
                if (jsonDeliveriesObj[index].match_id === id){
                    if(TeamObject[jsonDeliveriesObj[index].bowling_team]){
                        TeamObject[jsonDeliveriesObj[index].bowling_team] += Number(jsonDeliveriesObj[index].extra_runs);
                    }
                    else {
                        TeamObject[jsonDeliveriesObj[index].bowling_team] = Number(jsonDeliveriesObj[index].extra_runs);
                    }
                }
            }
        }
    return TeamObject;
}