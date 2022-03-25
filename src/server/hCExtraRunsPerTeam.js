const Highcharts = require('highcharts');
const getRequest =require('./utils.js');

const initialise = (dataObj) => {
    const teams = Object.keys(dataObj);
    const extraRuns = Object.values(dataObj);
    Highcharts.chart('container2', {
        chart:{
            type: 'line'
        },
        title: {
            text: 'Extra Runs Per Team'
        },
        xAxis:{
           categories: teams,
           title: {
            text: 'Teams'
        }
        },
        yAxis: {
            title: {
                text: 'Extra Runs'
            }
        },
        series: [
            {
                name : "Extra Runs",
                data : extraRuns
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

getRequest('output/extraRunsPerTeam.json', initialise);