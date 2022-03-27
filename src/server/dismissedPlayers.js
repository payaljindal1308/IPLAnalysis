const fs = require('fs');
const csvDeliveriesFilePath = 'data/deliveries.csv';
const csvMatches = require('csvtojson');
csvMatches().fromFile(csvDeliveriesFilePath).then(( jsonDeliveriesArray ) => {
    let highestDismissalOfAPlayer = gethighestDismissalOfAPlayer(jsonDeliveriesArray);
    console.log(highestDismissalOfAPlayer);
    fs.writeFileSync('public/output/dismissedPlayers.json', JSON.stringify(highestDismissalOfAPlayer) );
});

function gethighestDismissalOfAPlayer(jsonDeliveriesArray){
    let teamObj = {};
    return jsonDeliveriesArray.reduce((max, dataRow) => { 
        let playerDismissed = dataRow.player_dismissed;
        let bowler = dataRow.bowler;
        if(playerDismissed) {
            if(teamObj[playerDismissed]){
                if(teamObj[playerDismissed][bowler]) teamObj[playerDismissed][bowler] +=1;
                else teamObj[playerDismissed][bowler] =1;
                if(teamObj[playerDismissed][bowler] > max){
                    max = teamObj[playerDismissed][bowler];
                }
            }
            else{
                teamObj[playerDismissed] = {}; 
                teamObj[playerDismissed][bowler] = 1;
            }
        }
        return max;
    },0);
}

        

    