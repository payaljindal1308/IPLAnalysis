const fs = require('fs');
const csvFilePath = 'data/matches.csv';
const csv = require('csvtojson')

csv().fromFile(csvFilePath).then((jsonObj)=>{  
    let matchesObject = findMatchesPerTeamPerYear(jsonObj); 
    let matchesPerTeam = noOfMatchesPerTeamPerYear(matchesObject);
    console.log(matchesPerTeam);
    fs.writeFile('public/output/matchesPerTeam.json', JSON.stringify(matchesPerTeam),{ flag: 'a+' }, err => {} );
});

    function findMatchesPerTeamPerYear(jsonObj){
    let  matchesObj = {};
    jsonObj.forEach(element => {
        if(element.winner){
        if(matchesObj[element.winner]) matchesObj[element.winner].push(element.season);
        else{
            matchesObj[element.winner] = [element.season];
        }
        }
    });
    return matchesObj;
    }   

    function noOfMatchesPerTeamPerYear(matchesObj){
        let matchesPerTeam = {};
        Object.keys(matchesObj).forEach( element => {
            let count = {};
            Object.values(matchesObj[element]).forEach( year => {
                if(count[year]) count[year]+=1;
                else{
                    count[year] = 1;
                }
            });
            matchesPerTeam[element] = count;
        });
        return matchesPerTeam;
    }
    