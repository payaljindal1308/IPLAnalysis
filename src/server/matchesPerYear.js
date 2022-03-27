const csvMatchesFilePath = 'data/matches.csv';
const csv = require('csvtojson')
const fs= require('fs');
csv().fromFile(csvMatchesFilePath).then((jsonMatchesArray)=>{  
    let matchesPerYear = getMatchesPerYear(jsonMatchesArray)
    console.log(matchesPerYear);
    fs.writeFileSync('public/output/matchesPerYear.json', JSON.stringify(matchesPerYear));
});

function getMatchesPerYear(jsonMatchesArray){
    return jsonMatchesArray.reduce((matchesPerYear, dataRow) => {
        let season = dataRow.season;
        if(matchesPerYear[season]) matchesPerYear[season] += 1;
        else matchesPerYear[season] = 1;
        return matchesPerYear;
    },{});
}




