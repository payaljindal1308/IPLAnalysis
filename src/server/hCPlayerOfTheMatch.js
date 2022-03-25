const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const years = Object.keys(dataObj).map(element => {return Number(element)});
    const playerOfMatch = Object.values(dataObj);
    Highcharts.chart('container3', {
        chart:{
            type: 'line'
        },
        title: {
            text: 'Player of the Match Per Year'
        },
        xAxis:{
           categories: playerOfMatch,
           title: {
            text: 'Players'
        }
        },
        yAxis: {
            title: {
                text: 'Years'
            }
        },
        series: [
            {
                name : "Players of the Match",
                data : years
            }
        ],
    
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

getRequest('output/playerOfTheMatch.json', initialise);