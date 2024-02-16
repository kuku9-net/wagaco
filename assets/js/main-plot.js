import './plot-preparation';
import {plotTop100} from './plotTop100';
import {plotIncome} from './plotIncome';

plotIncome(document.querySelector('.plot-income'));
plotTop100(document.querySelector('.plot-top100'));

