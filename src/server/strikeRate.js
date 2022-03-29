
const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson');
const { match } = require('assert');

csvMatches().fromFile(csvMatchesFilePath).then((jsonMatchesArray) => {
    let matchIdsBySeason = getMatchIdsBySeason(jsonMatchesArray);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveriesArray) =>{
        let batsMenData = getBatsMenData(matchIdsBySeason, jsonDeliveriesArray);
        let batsMenStrikeRates = getBatsMenStrikeRates(batsMenData);
        console.log(batsMenStrikeRates);
        fs.writeFileSync('public/output/strikeRate.json', JSON.stringify(batsMenStrikeRates));
    });
});

function getMatchIdsBySeason(jsonMatchesArray){
    return jsonMatchesArray.reduce((matchIdsBySeason, dataRow)=> { 
        let season = dataRow.season;
        let id = dataRow.id;
        if(dataRow[id]) matchIdsBySeason[id][season] = 1;
        else { 
            matchIdsBySeason[id] = {};
            matchIdsBySeason[id] = season;
        }
        
        return matchIdsBySeason;
    },{});
}

function getBatsMenData(matchIdsBySeason, jsonDeliveriesArray){
    return jsonDeliveriesArray.reduce((batsMenData, dataRow) => { 
        let id = dataRow.match_id;
        let batsman = dataRow.batsman;
        let runs = Number(dataRow.batsman_runs);
        let season = matchIdsBySeason[id];
        if(batsMenData[batsman])
         {
             if(batsMenData[batsman][season]){
                batsMenData[batsman][season].runs += runs; 
                batsMenData[batsman][season].balls += 1;
                batsMenData[batsman][season].strikeRate = (batsMenData[batsman][season].runs/batsMenData[batsman][season].balls)*100;
             }
             else{
                 batsMenData[batsman][season] = {
                     runs,
                     balls : 1,
                     strikeRate : 0
                 }
             }
        }
        else{
            batsMenData[batsman] = {}
            batsMenData[batsman][season] = {
                runs,
                balls : 1,
                strikeRate : 0
            }
        }
        return batsMenData;
        },{});
}

function getBatsMenStrikeRates(batsMenData){
    return Object.keys(batsMenData).reduce((data, batsman) =>{
    data[batsman] = Object.keys(batsMenData[batsman]).reduce((dataSeason, season) => {
        dataSeason[season] = batsMenData[batsman][season].strikeRate;
        return dataSeason;
    },{});
    return data;
},{});
}