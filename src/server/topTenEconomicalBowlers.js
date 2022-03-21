
const fs = require('fs');
const csvFilePathMatches = '/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/data/matches.csv';
const csvMatches = require('csvtojson')
const csvFilePathDeliveries = '/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    
csvMatches().fromFile(csvFilePathMatches).then((jsonMatchIdObj)=>{ 
    let matchIdsArray = getMatchIds(jsonMatchIdObj);
    csvDeliveries().fromFile(csvFilePathDeliveries).then((jsonDeliveriesObj)=>{  
        let topTenBowlersEconomyRate = getEconomicalbowlerRuns(matchIdsArray, jsonDeliveriesObj);
        let topTenEconomicalBowlers =[];
        topTenBowlersEconomyRate.forEach(element => topTenEconomicalBowlers.push(element[0]));
        console.log(topTenEconomicalBowlers);
        fs.writeFile('/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/public/output/topTenEconomicalbowlers.json', JSON.stringify(topTenEconomicalBowlers),{ flag: 'a+' }, err => {} )
    });
});

function getMatchIds(jsonMatchIdObj){
    let MatchIds =[];
    jsonMatchIdObj.forEach(element => {
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
    let bowlerSortedEconomyRate = Object.entries(bowlerEconomyRate).sort((a,b) => a[1]-b[1]) // sorting economy rate 
    
return bowlerSortedEconomyRate.slice(0,10);
}

