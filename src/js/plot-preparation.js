import {
  Chart,
  Colors,
  LineController,
  LineElement,
  ScatterController,
  PointElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);

Chart.register(
  Colors,
  Filler,
  LineController,
  LineElement,
  ScatterController,
  PointElement,
  LinearScale,
  BarElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);
