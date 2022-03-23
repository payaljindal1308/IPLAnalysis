const fs = require('fs');
const csvDeliveriesFilePath = './src/data/deliveries.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvDeliveriesFilePath).then(( jsonDeliveriesObj ) => {
    let dismissedPlayers = getDismissedPlayers(jsonDeliveriesObj);
    let mostDismissedPlayer = getMostDismissedPlayer(dismissedPlayers, jsonDeliveriesObj);
    console.log(mostDismissedPlayer);
    fs.writeFile('./src/public/output/playerDismissed.json', JSON.stringify(mostDismissedPlayer),{ flag: 'a+' }, err => {} )
});

function getDismissedPlayers(jsonDeliveriesObj){
    return jsonDeliveriesObj.reduce((teamObj, element) => { if(element.player_dismissed) teamObj[element.player_dismissed] = 0; return teamObj},{});
}

function getMostDismissedPlayer(dismissedPlayers, jsonDeliveriesObj){
    jsonDeliveriesObj.forEach(element => { if(element.player_dismissed) dismissedPlayers[element.player_dismissed] += 1});
    for (let keys in dismissedPlayers){
        if(dismissedPlayers[keys] === Math.max(...Object.values(dismissedPlayers))){
            return keys;
        }
    }
}
        

    