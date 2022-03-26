const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvDeliveriesFilePath).then(( jsonDeliveriesObj ) => {
    let dismissedPlayers = getDismissedPlayers(jsonDeliveriesObj);
    let highestNoOfTimesDismissed = getMostDismissed(dismissedPlayers);
    console.log(highestNoOfTimesDismissed);
    fs.writeFile('public/output/dismissedPlayers.json', JSON.stringify(highestNoOfTimesDismissed),{ flag: 'a+' }, err => {} )
});

function getDismissedPlayers(jsonDeliveriesObj){
    return jsonDeliveriesObj.reduce((teamObj, element) => { 
        if(element.player_dismissed) {
            if(teamObj[element.player_dismissed]){
                if(teamObj[element.player_dismissed][element.bowler]) teamObj[element.player_dismissed][element.bowler] +=1;
                else teamObj[element.player_dismissed][element.bowler] =1;
            }
            else{
                teamObj[element.player_dismissed] = {}; 
                teamObj[element.player_dismissed][element.bowler] = 1;
            }
        }
    return teamObj},{});
}

function getMostDismissed(dismissedPlayers){
    let dismissedHighest = {};
    Object.keys(dismissedPlayers).forEach( keys => { dismissedHighest[keys] = Math.max(...Object.values(dismissedPlayers[keys]));
});
return Math.max(...Object.values(dismissedHighest));
}
        

    