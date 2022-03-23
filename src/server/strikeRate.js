/*BatsManData ={}
if(BatsManData[id]){
    if(BatsManData['batsman']['2008']) { 
        BatsManData['batsman']['2008'].runs+=1;
        BatsManData['batsman']['2008'].balls+=1;
        
    else{ BatsManData['batsman']['2008'] = {
        runs : obj.total_runs,
        balls : 1
    };
}
else{
    BatsManData['batsman'] = { '2008' : { runs : obj.total_runs, balls : 1};
}*/

const fs = require('fs');
const csvMatchesFilePath = './src/data/matches.csv';
const csvMatches = require('csvtojson')
const csvDeliveriessFilePath = './src/data/deliveries.csv';
const csvDeliveries = require('csvtojson');
const { match } = require('assert');
    

csvMatches().fromFile(csvMatchesFilePath).then((jsonObj) => {
    let matchIds = getMatchIdsWithSeason(jsonObj);
    csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonDeliveryObj) =>{
        let batsMenData = getBatsMenData(matchIds, jsonDeliveryObj);
        let batsMenStrikeRates = getBatsMenStrikeRates(batsMenData);
        console.log(batsMenStrikeRates);
        fs.writeFile('./src/public/output/strikeRate.json', JSON.stringify(batsMenStrikeRates),{ flag: 'a+' }, err => {} )
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
    batsMenSeasons = {};
    Object.keys(matchIds).forEach( keys => { 
        batsMenSeasons[keys] = {};
        jsonDeliveryObj.forEach(element => {
            if(matchIds[keys].includes(element.match_id)){
                if(batsMenSeasons[keys][element.batsman]){
                    batsMenSeasons[keys][element.batsman].runs += Number(element.total_runs);
                    batsMenSeasons[keys][element.batsman].balls += 1;
                }
                else{
                    batsMenSeasons[keys][element.batsman] = { runs: Number(element.total_runs), balls : 1};
                }
            }
        });
    });
    return batsMenSeasons;
}

function getBatsMenStrikeRates(batsMenSeasons){
        Object.keys(batsMenSeasons).forEach(keys =>{
        Object.keys(batsMenSeasons[keys]).forEach( seasonKey => {
        batsMenSeasons[keys][seasonKey] = (batsMenSeasons[keys][seasonKey].runs/batsMenSeasons[keys][seasonKey].balls)*100;
        });
    });
    return batsMenSeasons;
}