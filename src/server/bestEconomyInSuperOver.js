const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvDeliveries = require('csvtojson')
csvDeliveries().fromFile(csvDeliveriesFilePath).then((deliveriesArray) => {
    let bowlersDataInSuperOvers = getEconomicBowlerInSuperOver(deliveriesArray);
    console.log(bowlersDataInSuperOvers);
    //let bestEconomicBowlerInSuperOvers = getMostEconomicBowler(bowlersDataInSuperOvers);
    //console.group(bestEconomicBowlerInSuperOvers);
    //fs.writeFile('public/output/bestEconomyInSuperOver.json', JSON.stringify(bestEconomicBowlerInSuperOver),{ flag: 'a+' }, err => {} )
});

function getEconomicBowlerInSuperOver(deliveriesArray){
    let bowlersDataInSuperOvers = {};
    isLastMatch = false;
    deliveriesArray.forEach(element => {
        if(deliveriesArray.indexOf(element) === deliveriesArray.length) isLastMatch = true;
        let bowler = element.bowler;
        let runs = Number(element.total_runs);
        let matchid = element.match_id;
        let previousMatchId;
        if(element.is_super_over){
            if(bowlersDataInSuperOvers[bowler]) {
                bowlersDataInSuperOvers[bowler].runs += runs;
                bowlersDataInSuperOvers[bowler].deliveries += 1;
                bowlersDataInSuperOvers[bowler].matches = bowlersDataInSuperOvers[bowler].matches;
            }
            else{ 
                previousMatchId = element.match_id;
                bowlersDataInSuperOvers[bowler] = {
                runs,
                deliveries : 1,
                strikeRatesSum : 0,
                matches : 1,
                matchid
                }
            }
        }
        if(previousMatchId !== element.match_id){
            bowlersDataInSuperOvers[bowler].strikeRatesSum += (bowlersDataInSuperOvers[bowler].runs/bowlersDataInSuperOvers[bowler].deliveries)*100,
            bowlersDataInSuperOvers[bowler].matches += 1;
        }
        if(isLastMatch){
            bowlersDataInSuperOvers[bowler].averageStrikeRate = (bowlersDataInSuperOvers[bowler].strikeRatesSum)/matches;
        }
        previousMatchId = element.match_id;
    });
    return bowlersDataInSuperOvers;
}

function getMostEconomicBowler(bowlersDataInSuperOvers){

    let bowlerEconomyRates = {};
    Object.keys(bowlersDataInSuperOvers).forEach((keys) => {bowlerEconomyRates[keys] = bowlersDataInSuperOvers[keys].runs/bowlersDataInSuperOvers[keys].deliveries});
    console.log(bowlerEconomyRates);
    return Object.keys(bowlerEconomyRates).find(keys => { return bowlerEconomyRates[keys] === Math.min(...Object.values(bowlerEconomyRates))
    })
    }
