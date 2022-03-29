const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
csvDeliveries().fromFile(csvDeliveriesFilePath).then((deliveriesArray) => {
    let bowlersData = getBowlersDataInSuperOvers(deliveriesArray);
    let bestEconomicBowler = getMostEconomicBowlerInSuperOvers(bowlersData);
    console.log(bestEconomicBowler);
    fs.writeFileSync('public/output/bestEconomyInSuperOver.json', JSON.stringify(bestEconomicBowler));
});

function getBowlersDataInSuperOvers(deliveriesArray){
    return deliveriesArray.reduce((bowlersData, element) => {
        let bowler = element.bowler;
        let runs = Number(element.total_runs);
        if(element.is_super_over != 0){
            if(bowlersData[bowler]) {
                bowlersData[bowler].runs += runs;
                bowlersData[bowler].balls += 1;
                bowlersData[bowler].economyRate = bowlersData[bowler].runs/bowlersData[bowler].balls;
            }
            else{ bowlersData[bowler] = {
                runs,
                balls : 1,
                economyRate : runs
                }
            }
        }
        return bowlersData;
    },{});

}
function getMostEconomicBowlerInSuperOvers(bowlersData){
    let min = 100;
    return Object.keys(bowlersData).reduce((bestEconomicBowler, bowler) => { 
        if(bowlersData[bowler].economyRate < min){
        min = bowlersData[bowler].economyRate;
        bestEconomicBowler = bowler;
    } 
    return bestEconomicBowler;
    },'')}    