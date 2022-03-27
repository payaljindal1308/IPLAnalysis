const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const years = Object.keys(dataObj);
    const matches = Object.values(dataObj);
    Highcharts.chart('container1', {
        chart:{
            type: 'line'
        },
        title: {
            text: 'Matches Per Year'
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

getRequest('output/matchesPerYear.json', initialise);