const fs = require('fs');
const csvDeliveriessFilePath = './src/data/deliveries.csv';
const csvDeliveries = require('csvtojson')
csvDeliveries().fromFile(csvDeliveriessFilePath).then((jsonObj) => {
    let bowlersData = getEconomicBowlerInSuperOver(jsonObj);
    let bestEconomicBowlerInSuperOver = getMostEconomicBowler(bowlersData);
    console.group(bestEconomicBowlerInSuperOver);
    fs.writeFile('./src/public/output/bestEconomyInSuperOver.json', JSON.stringify(bestEconomicBowlerInSuperOver),{ flag: 'a+' }, err => {} )
});

function getEconomicBowlerInSuperOver(jsonObj){
    let bowlerData = {};
    jsonObj.forEach(element => {
        if(element.is_super_over != 0){
            if(bowlerData[element.bowler]) {
                bowlerData[element.bowler].runs += Number(element.total_runs);
                bowlerData[element.bowler].deliveries += 1;
            }
            else{ bowlerData[element.bowler] = {
                runs : Number(element.total_runs),
                deliveries : 1
                }
            }
        }
    });
    return bowlerData;
}

function getMostEconomicBowler(bowlersData){
    let bowlerEconomyRates = {};
    for( let keys in bowlersData){
        bowlerEconomyRates[keys] = bowlersData[keys].runs/bowlersData[keys].deliveries;
    }
    for( let keys in bowlerEconomyRates){
        if(bowlerEconomyRates[keys] === Math.min(...Object.values(bowlerEconomyRates))){
            return keys;
        }
    }
}