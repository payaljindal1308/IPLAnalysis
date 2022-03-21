
const fs = require('fs');
const csvMatchesFilePath = '../data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = '../data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchesObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesObj)=>{  
        let topTenBowlersWithEconomyRate = getEconomicalbowlerRuns(matchIdsArray, jsonDeliveriesObj);
        let topTenEconomicalBowlers =[];
        topTenBowlersWithEconomyRate.forEach(element => topTenEconomicalBowlers.push(element[0]));
        console.log(topTenEconomicalBowlers);
        fs.writeFile('../public/output/topTenEconomicalbowlers.json', JSON.stringify(topTenEconomicalBowlers),{ flag: 'a+' }, err => {} )
    });
});

function getMatchIds(jsonMatchesObj){
    let MatchIds =[];
    jsonMatchesObj.forEach(element => {
        if (element.season === '2016'){
            MatchIds.push(element.id);
        } 
    });
    return MatchIds;
}


function getEconomicalbowlerRuns(matchIdsArray, jsonDeliveriesObj){ 
    let bowlerRuns = {};
    let delivery = {};
    let bowlerEconomyRate = {};
    for ( let id of matchIdsArray){
        for (let index = 0; index < jsonDeliveriesObj.length; index++){
            if( jsonDeliveriesObj[index].match_id === id ){
                if(bowlerRuns[jsonDeliveriesObj[index].bowler]){
                    bowlerRuns[jsonDeliveriesObj[index].bowler] += Number(jsonDeliveriesObj[index].total_runs);
                    delivery[jsonDeliveriesObj[index].bowler] += 1;
                }
                else{
                    bowlerRuns[jsonDeliveriesObj[index].bowler] = Number(jsonDeliveriesObj[index].total_runs);
                    delivery[jsonDeliveriesObj[index].bowler] = 1;
                }
            }
        }
    }
    for (let bowler in bowlerRuns){
        bowlerEconomyRate[bowler] = (bowlerRuns[bowler]*6)/delivery[bowler]; // calculating economy rate
    }
    return Object.entries(bowlerEconomyRate).sort((a,b) => a[1]-b[1]).slice(0,10)// sorting economy rate and returning top 10 of them
}

