import {Chart} from 'chart.js'

import json from './income.json';

const data = {
    labels: json.map(row => row[0]),
    datasets: [{
        label: '興行収入',
        yAxisID: 'income',
        data: json.map(row => row[4])
    },{
        label: 'スクリーン数(シネコン以外)',
        yAxisID: 'num-screen',
        borderDash: [2, 2],
        pointRadius: 2,
        fill: true,
        data: json.map(row => row[3])
    },{
        label: 'スクリーン数(シネコン)',
        yAxisID: 'num-screen',
        borderDash: [5, 5],
        pointRadius: 2,
        fill: true,
        data: json.map(row => row[2])
    },{
        label: 'スクリーン数(合計)',
        yAxisID: 'num-screen',
        pointRadius: 2,
        fill: true,
        data: json.map(row => row[1])
    }]
}

const config = {
    type: 'line',
    data,
    options: {
        animation:false,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            income: {
                title: {
                    display: true,
                    text: '興行収入(十億円)'
                },
                ticks: {callback: (v) => v / 1000},
                min: 0,
                max: 275000
            },
            "num-screen": {
                position: 'right',
                title: {
                    display: true,
                    text: 'スクリーン数(千枚)'
                },
                ticks: {
                    callback: (v) => v / 1000,
                    stepSize: 1000,
                },
                grid: {
                    display: false
                },
                max: 5000
            }

        },
        plugins: {
            legend: {
                labels: {
                    boxWidth: 20
                }
            },
            title: {
                display: true,
                text: '興行収入合計とスクリーン数',
            }
        }
    }
};

export function plotIncome(element){
    new Chart(
        element,
        config
    );
}
