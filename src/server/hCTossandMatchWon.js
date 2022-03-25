const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const teams = Object.keys(dataObj);
    const matches = Object.values(dataObj);
    Highcharts.chart('container5', {
        chart:{
            type: 'bar'
        },
        title: {
            text: 'Toss and matches won per Team'
        },
        xAxis:{
           categories: teams,
           title: {
            text: 'Teams'
        }
        },
        yAxis: {
            title: {
                text: 'No. of Matches'
            }
        },
        series: [
            {
                name : "No of Matches",
                data : matches
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

getRequest('output/tossAndMatchWon.json', initialise);