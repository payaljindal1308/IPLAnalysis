const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const bowlers = [];
    const economyRates = [];
    dataObj.forEach(element => { bowlers.push(element[0]);
        economyRates.push(element[1])});
    Highcharts.chart('container4', {
        chart:{
            type: 'line'
        },
        title: {
            text: 'Top Economic Bowlers'
        },
        xAxis:{
           categories: bowlers,
           title: {
            text: 'Bowlers'
        }
        },
        yAxis: {
            title: {
                text: 'Economy Rates'
            }
        },
        series: [
            {
                name : "Top Economic Bowlers",
                data : economyRates
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

getRequest('output/topTenEconomicalbowlers.json', initialise);