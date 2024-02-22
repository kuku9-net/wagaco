import {Chart} from 'chart.js';
import { languageTable } from './i18n.js';
import json from './income.json';

const labels = languageTable({
  ja: {
    "income": '興行収入',
    "num-screen1": 'スクリーン数(シネコン以外)',
    "num-screen2": 'スクリーン数(シネコン)',
    "num-screen3": 'スクリーン数(合計)',
    "income/unit": '興行収入(十億円)',
    "num-screen/unit": 'スクリーン数(千枚)',
    "income+#screen": '興行収入合計とスクリーン数',
  },
  en: {
    "income": 'income',
    "num-screen1": '# screen(others)',
    "num-screen2": '# screen(cinema complex)',
    "num-screen3": '# screen(total)',
    "income/unit": 'income (¥bn)',
    "num-screen/unit": '# of screens (1000 units)',
    "income+#screen": 'income and # of screens',
  },
});

const data = {
    labels: json.map(row => row[0]),
    datasets: [{
        label: labels["income"],
        yAxisID: 'income',
        data: json.map(row => row[4])
    },{
        label: labels['num-screen1'],
        yAxisID: 'num-screen',
        borderDash: [2, 2],
        pointRadius: 2,
        fill: true,
        data: json.map(row => row[3])
    },{
        label: labels['num-screen2'],
        yAxisID: 'num-screen',
        borderDash: [5, 5],
        pointRadius: 2,
        fill: true,
        data: json.map(row => row[2])
    },{
        label: labels['num-screen3'],
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
                    text: labels['income/unit']
                },
                ticks: {callback: (v) => v / 1000},
                min: 0,
                max: 275000
            },
            "num-screen": {
                position: 'right',
                title: {
                    display: true,
                    text: labels['num-screen/unit']
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
                text: labels["income+#screen"],
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
