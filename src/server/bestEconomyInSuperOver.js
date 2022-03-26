const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson');

csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesObj) => {
    let matchIds = getMatchIdsWithSeason(jsonMatchesObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonObj)=>{
        let bowlersData = getEconomicBowlerInSuperOver(matchIds, jsonObj);
        let bestEconomicBowlerInSuperOver = getMostEconomicBowler(bowlersData);
        console.group(bestEconomicBowlerInSuperOver);
        fs.writeFile('public/output/bestEconomyInSuperOver.json', JSON.stringify(bestEconomicBowlerInSuperOver),{ flag: 'a+' }, err => {} )
    })
});

function getMatchIdsWithSeason(jsonMatchesObj){
    let matchIds = {};
    jsonMatchesObj.forEach(element => { 
        if(matchIds[element.season]) matchIds[element.season].push(element.id);
        else matchIds[element.season] = [element.id];
    });
    return matchIds;

}

function getEconomicBowlerInSuperOver(matchIds, jsonObj){
    let bowlerData = {};
    Object.keys(matchIds).forEach(keys => {
        bowlerData[keys] = {};
        jsonObj.forEach(element => {
            if (matchIds[keys].includes(element.match_id) && element.is_super_over){
                    if(bowlerData[keys][element.bowler]) {
                        bowlerData[keys][element.bowler].runs += Number(element.total_runs);
                        bowlerData[keys][element.bowler].deliveries += 1;
                    }
                    else{ bowlerData[keys][element.bowler] = {
                        runs : Number(element.total_runs),
                        deliveries : 1
                        }
                    }
                }
            })
        
    });
    return bowlerData;
}

function getMostEconomicBowler(bowlersData){
    let bowlerEconomyRates = {};
    Object.keys(bowlersData).forEach((year) => { 
        bowlerEconomyRates[year] = {};
        Object.keys(bowlersData[year]).forEach(bowler => {
        bowlerEconomyRates[year][bowler] = bowlersData[year][bowler].runs/bowlersData[year][bowler].deliveries});
    }) 
    let bowlerEconomy = {};
    Object.keys(bowlerEconomyRates).forEach(year => { 
        bowlerEconomy[year] = {};
        Object.keys(bowlerEconomyRates[year]).forEach(bowler => { if (bowlerEconomyRates[year][bowler] === Math.min(...Object.values(bowlerEconomyRates[year]))){
            bowlerEconomy[year][bowler] = bowlerEconomyRates[year][bowler];
        }
    }
    )});
    return bowlerEconomy;
}
