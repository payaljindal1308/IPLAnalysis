
const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
    
csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray)=>{ 
    let matchIds2015Obj = getMatchIds2015(jsonMatchesArray);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesArray)=>{  
        let topTenEconomicBowlers = getTopTenEconomicBowlers(matchIds2015Obj, jsonDeliveriesArray);
        console.log(topTenEconomicBowlers);
        fs.writeFileSync('public/output/topTenEconomicalbowlers.json', JSON.stringify(topTenEconomicBowlers));
    });
});

function getMatchIds2015(jsonMatchesArray){
    return jsonMatchesArray.reduce((matchIds2015Obj, dataRow) => {
        let season = dataRow.season;
        let id = dataRow.id;
        if (season === '2015') matchIds2015Obj[id] = 1;
        return matchIds2015Obj;
    });
}

function getTopTenEconomicBowlers(matchIds2015Obj, jsonDeliveriesArray){
    let data = jsonDeliveriesArray.reduce((bowlerData, dataRow) => {
        let id = dataRow.match_id;
        if(matchIds2015Obj[id]){
            let bowler = dataRow.bowler;
            let runs = Number(dataRow.total_runs);
            if(bowlerData[bowler]){
                    bowlerData[bowler].runs += runs;
                    bowlerData[bowler].balls += 1;
                    bowlerData[bowler].economyRate = (bowlerData[bowler].runs/bowlerData[bowler].balls)*6;
            }
            else{
                bowlerData[bowler] = { 
                    runs,
                    balls: 1,
                    economyRate: 0,
                };
            }
        }
        return bowlerData;
    },{});
    return Object.entries(data).sort((a,b) => a[1].economyRate-b[1].economyRate).slice(0,10);
}

