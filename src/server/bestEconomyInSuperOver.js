const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
csvDeliveries().fromFile(csvDeliveriesFilePath).then((deliveriesArray) => {
    let bestEconomicBowler = getBestEconomicBowlerInSuperOver(deliveriesArray);
    console.log(bestEconomicBowler);
    fs.writeFileSync('public/output/bestEconomyInSuperOver.json', JSON.stringify(bestEconomicBowler));
});

function getBestEconomicBowlerInSuperOver(deliveriesArray){
    let bowlersDataInSuperOvers = deliveriesArray.reduce((bowlersDataInSuperOvers, dataRow) => {
        let bowler = dataRow.bowler;
        let runs = Number(dataRow.total_runs);
        if(dataRow.is_super_over){
            if(bowlersDataInSuperOvers[bowler]) {
                bowlersDataInSuperOvers[bowler].runs += runs;
                bowlersDataInSuperOvers[bowler].balls += 1;
            }
            else{ 
                bowlersDataInSuperOvers[bowler] = {
                runs,
                balls : 1,
                }
            }
        }
        return bowlersDataInSuperOvers;
    },{});
    let min = (bowlersDataInSuperOvers[deliveriesArray[0].bowler].runs/bowlersDataInSuperOvers[deliveriesArray[0].bowler].balls)*6;
    return Object.keys(bowlersDataInSuperOvers).reduce((bestEconomicBowler, bowler) =>{
        let economyRate = (bowlersDataInSuperOvers[bowler].runs/bowlersDataInSuperOvers[bowler].balls)*6;
        if (economyRate < min && bowlersDataInSuperOvers[bowler].runs > 0) {
            min = economyRate;
            bestEconomicBowler = bowler;
        }
        return bestEconomicBowler;
        },'');
}