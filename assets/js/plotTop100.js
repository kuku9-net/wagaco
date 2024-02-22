import {Chart} from 'chart.js'
import { languageTable } from './i18n.js';
import top100Json from './top100.json';
const labels = languageTable({
  ja: {
    "kimetsu": ['劇場版「鬼滅の刃」', '2020/10/16公開 404億円'],
    "released": '公開日',
    "income": '興行収入(億円)',
    "title": '興行収入TOP100の公開日 (2023.8.27現在)',
  },
  en: {
    "kimetsu": ['Demon Slayer The Movie', '2020/10/16 40.4 ¥bn'],
    "released": 'release date',
    "income": 'income (¥0.1bn)',
    "title": "The release date of the top 100 box office as of August 27, 2023"
  }
});

const annotation1 = {
  type: 'label',
  backgroundColor: 'rgba(245, 245, 245, 0.5)',
  borderColor: 'rgba(80, 80, 245, 0.5)',
  content: labels['kimetsu'],
  color: '#444',
  font: { size: 12 },
  padding: {x: 12, y: 6},
  xAdjust: -12,
  yAdjust: -6,
  borderRadius: 4,
  borderWidth: 1,
  position: {x: 'end', y: 'start'},
  xValue: new Date("2020-10-16"),
  yValue: 404.3
};

const config = {
    type: 'scatter',
    data: {
        labels: top100Json.map(row => row[0]),
        datasets: [{
            data: top100Json.map(row => ({x:new Date(row[3]), y: parseInt(row[2])}))
        }]
    },
    options: {
        animation:false,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {callback: (v) => new Date(v).getFullYear()},
                title: {
                    display: true,
                    text: labels["released"]
                },
                min: new Date(1975, 1,1),
                max: new Date(2024, 1,1)
            },
            y: {
                title: {
                    display: true,
                    text: labels["income"]
                }
            }
        },
        interaction: {
            mode: 'nearest'
        },
        plugins: {
            annotation: {
                annotations: {annotation1}
            },
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const {x: date, y: yen} = context.parsed
                        const d = new Date(date);
                        return `${yen}億円 (${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()})`;
                    }
                }
            },
            title: {
                display: true,
                text: labels["title"],
            }
        }
    }
};

export function plotTop100(element){
    new Chart(
        element,
        config
    );
}
