const csvFilePath = './src/data/matches.csv';
const csv = require('csvtojson')
const fs= require('fs');
csv().fromFile(csvFilePath).then((jsonObj)=>{  
    let matchesPerYearOutput = matchesPerYear(jsonObj)
    console.log(matchesPerYearOutput)
    fs.writeFile('./src/public/output/matchesPerYear.json', JSON.stringify(matchesPerYearOutput),{ flag: 'a+' }, err => {} )
});

function matchesPerYear(jsonObj){
    let  MatchObj = {};
    jsonObj.forEach(element => {
        if(MatchObj[element.season]) MatchObj[element.season] += 1;
        else{
            MatchObj[element.season] = 1;
        }
    })
    return MatchObj;
}




