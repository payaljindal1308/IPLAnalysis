
const fs = require('fs');
const csvMatchesFilePath = 'data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson');
const { match } = require('assert');
    

csvMatches().fromFile(csvMatchesFilePath).then((jsonObj) => {
    let matchIds = getMatchIdsWithSeason(jsonObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveryObj) =>{
        let batsMenData = getBatsMenData(matchIds, jsonDeliveryObj);
        let batsMenStrikeRates = getBatsMenStrikeRates(batsMenData);
        console.log(batsMenStrikeRates);
        fs.writeFile('public/output/strikeRate.json', JSON.stringify(batsMenStrikeRates),{ flag: 'a+' }, err => {} )
    });
});

function getMatchIdsWithSeason(jsonMatchesObj){
    let matchIds = {};
    jsonMatchesObj.forEach(element => { 
        if(matchIds[element.season]) matchIds[element.season].push(element.id);
        else matchIds[element.season] = [element.id];
    });
    return matchIds;

}

function getBatsMenData(matchIds, jsonDeliveryObj){
    let batsMenSeasons ={};
    jsonDeliveryObj.forEach(element=>{ batsMenSeasons[element.batsman] = {}} );
    Object.keys(matchIds).forEach( keys => { 
        jsonDeliveryObj.forEach(element => {
            if(matchIds[keys].includes(element.match_id)){
                if(batsMenSeasons[element.batsman][keys]){
                    //console.log(batsMenSeasons[element.batsman][keys]);
                    batsMenSeasons[element.batsman][keys].runs += Number(element.total_runs);
                    batsMenSeasons[element.batsman][keys].balls += 1;
                }
                else{
                    batsMenSeasons[element.batsman][keys] = { runs: Number(element.total_runs), balls : 1};
                }
            }
        });
    });
    console.log(batsMenSeasons.length);
    return batsMenSeasons;
}

function getBatsMenStrikeRates(batsMenSeasons){
        Object.keys(batsMenSeasons).forEach(keys =>{
        Object.keys(batsMenSeasons[keys]).forEach( seasonKey => {
        batsMenSeasons[keys][seasonKey] = Number(((batsMenSeasons[keys][seasonKey].runs/batsMenSeasons[keys][seasonKey].balls)*100).toFixed(2));
        });
    });
    return batsMenSeasons;
}