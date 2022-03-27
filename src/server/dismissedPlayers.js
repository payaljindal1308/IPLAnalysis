const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvDeliveriesFilePath).then(( jsonDeliveriesArray ) => {
    let highestDismissalOfAPlayer = gethighestDismissalOfAPlayer(jsonDeliveriesArray);
    console.log(highestDismissalOfAPlayer);
    fs.writeFileSync('public/output/dismissedPlayers.json', JSON.stringify(highestDismissalOfAPlayer) );
});

function gethighestDismissalOfAPlayer(jsonDeliveriesArray){
    let dismissedPlayersData = {};
    return jsonDeliveriesArray.reduce((max, dataRow) => { 
        let playerDismissed = dataRow.player_dismissed;
        let bowler = dataRow.bowler;
        if(playerDismissed) {
            if(dismissedPlayersData[playerDismissed]){
                if(dismissedPlayersData[playerDismissed][bowler]) dismissedPlayersData[playerDismissed][bowler] +=1;
                else dismissedPlayersData[playerDismissed][bowler] =1;
                if(dismissedPlayersData[playerDismissed][bowler] > max){
                    max = dismissedPlayersData[playerDismissed][bowler];
                }
            }
            else{
                dismissedPlayersData[playerDismissed] = {}; 
                dismissedPlayersData[playerDismissed][bowler] = 1;
            }
        }
        return max;
    },0);
}

        

    