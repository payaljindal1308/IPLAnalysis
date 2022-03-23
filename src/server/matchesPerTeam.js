const fs = require('fs');
const csvFilePath = './src/data/matches.csv';
const csv = require('csvtojson')

csv().fromFile(csvFilePath).then((jsonObj)=>{  
    let matchesObject = findMatchesPerTeamPerYear(jsonObj); 
    let matchesPerTeam = noOfMatchesPerTeamPerYear(matchesObject);
    console.log(matchesPerTeam);
    fs.writeFile('./src/public/output/matchesPerTeam.json', JSON.stringify(matchesPerTeam),{ flag: 'a+' }, err => {} );
});

    function findMatchesPerTeamPerYear(jsonObj){
    let  matchesObj = {};
    jsonObj.forEach(element => {
        if(matchesObj[element.winner]) matchesObj[element.winner].push(element.season);
        else{
            matchesObj[element.winner] = [element.season];
        }
    });
    return matchesObj;
    }   

    function noOfMatchesPerTeamPerYear(matchesObj){
        let matchesPerTeam = {};
        for ( let winners in matchesObj){
            let count = {};
            for (let year of matchesObj[winners]){
                if(count[year]) count[year]+=1;
                else{
                    count[year] = 1;
                }
            }
            matchesPerTeam[winners] = count;
        }
        return matchesPerTeam;
    }
    