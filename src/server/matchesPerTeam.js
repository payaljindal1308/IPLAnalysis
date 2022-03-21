const fs = require('fs');
const csvFilePath = '/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/data/matches.csv';
const csv = require('csvtojson')

csv().fromFile(csvFilePath).then((jsonObj)=>{  
    let matchesPerTeam = findMatchesPerTeamPerYear(jsonObj);
    console.log(matchesPerTeam);
    fs.writeFile('/Users/payalgupta/Desktop/JS Projects/CSVDATA/src/public/output/matchesPerTeam.json', JSON.stringify(matchesPerTeam),{ flag: 'a+' }, err => {} )
});

    // Finding matches won per team
    function findMatchesPerTeamPerYear(jsonObj){
    let  MatchObj = {};
    jsonObj.forEach(element => {
        if(MatchObj[element.winner]) MatchObj[element.winner].push(element.season);
        else{
            MatchObj[element.winner] = [element.season];
        }
    });
    let MatchesPerTeam = {};
    for ( let winners in MatchObj){
        let count = {};
        for (let year of MatchObj[winners]){
            if(count[year]) count[year]+=1;
            else{
                count[year] = 1;
            }
        }
        MatchesPerTeam[winners] = count;
    }
    return MatchesPerTeam;
   
}