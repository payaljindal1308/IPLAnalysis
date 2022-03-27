const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const teams = Object.keys(dataObj);
    const yearArray =[];
    Object.values(dataObj).forEach(value => { Object.keys(value).forEach(year => yearArray.push(Number(year)))})
    let years = Array.from(new Set(yearArray)).sort();
    let series1 = [];
    teams.forEach(team => { 
        if(team){
            let valueArray = [];
            keys = Object.keys(dataObj[team]);
            years.forEach(value => {
                 if(dataObj[team][value.toString()]){
            valueArray.push(dataObj[team][value.toString()]);}
            else valueArray.push(0);
        });
        series1.push({name: team, data : valueArray})
        }});
    Highcharts.chart('container', {
        chart:{
            type: 'bar'
        },
        title: {
            text: 'Matches Per Team'
        },
        xAxis:{
           categories: years,
           title: {
            text: 'Years'
        }
        },
        yAxis: {
            title: {
                text: 'No. of Matches'
            }
        },
        series: series1,
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });
}

getRequest('output/matchesPerTeam.json', initialise);