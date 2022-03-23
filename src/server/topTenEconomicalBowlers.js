
const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = './src/data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchesObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesObj)=>{  
        let topEconomicBowlersWithEconomyRate = getBowlerEconomyRates(matchIdsArray, jsonDeliveriesObj);
        let topTenEconomicalBowlers =[];
        topEconomicBowlersWithEconomyRate.forEach(element => topTenEconomicalBowlers.push(element[0]));
        console.log(topTenEconomicalBowlers);
        fs.writeFile('./src/public/output/topTenEconomicalbowlers.json', JSON.stringify(topTenEconomicalBowlers),{ flag: 'a+' }, err => {} )
    });
});

function getMatchIds(jsonMatchesObj){
    let MatchIds =[];
    jsonMatchesObj.forEach(element => {
        if (element.season === '2015'){
            MatchIds.push(element.id);
        } 
    });
    return MatchIds;
}


function getBowlerEconomyRates(matchIdsArray, jsonDeliveriesObj){
    let bowlerRuns = {};
    let bowlerDeliveries = {};
    let bowlerEconomyRates = {};
    for (let index = 0; index < jsonDeliveriesObj.length; index++){
        if( matchIdsArray.includes(jsonDeliveriesObj[index].match_id)){
            if(bowlerRuns[jsonDeliveriesObj[index].bowler]){
                bowlerRuns[jsonDeliveriesObj[index].bowler] += Number(jsonDeliveriesObj[index].total_runs);
                bowlerDeliveries[jsonDeliveriesObj[index].bowler] += 1;
            }
            else{
                bowlerRuns[jsonDeliveriesObj[index].bowler] = Number(jsonDeliveriesObj[index].total_runs);
                bowlerDeliveries[jsonDeliveriesObj[index].bowler] = 1;
            }
        }
    }
    for (let bowler in bowlerRuns){
        bowlerEconomyRates[bowler] = (bowlerRuns[bowler]*6)/bowlerDeliveries[bowler]; // calculating economy rate
    }
    return Object.entries(bowlerEconomyRates).sort((a,b) => a[1]-b[1]).slice(0,10)// sorting economy rate and returning top 10 of them
}

