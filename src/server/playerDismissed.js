const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvDeliveriesFilePath).then(( jsonDeliveriesArray ) => {
    let highestDismissalOfAPlayer = gethighestDismissalOfAPlayer(jsonDeliveriesArray);
    console.log(highestDismissalOfAPlayer);
    fs.writeFileSync('public/output/playerDismissed.json', JSON.stringify(highestDismissalOfAPlayer) );
});

function gethighestDismissalOfAPlayer(jsonDeliveriesArray){
    let dismissedPlayersData = {};
    return jsonDeliveriesArray.reduce((max, dataRow) => { 
        const { bowler, player_dismissed} = dataRow || {};
        if(player_dismissed) {
            if(dismissedPlayersData[player_dismissed]){
                if(dismissedPlayersData[player_dismissed][bowler]) dismissedPlayersData[player_dismissed][bowler] +=1;
                else dismissedPlayersData[player_dismissed][bowler] =1;
                if(dismissedPlayersData[player_dismissed][bowler] > max){
                    max = dismissedPlayersData[player_dismissed][bowler];
                }
            }
            else{
                dismissedPlayersData[player_dismissed] = {}; 
                dismissedPlayersData[player_dismissed][bowler] = 1;
            }
        }
        return max;
    },0);
}

