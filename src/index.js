import './js/plot-preparation';
import {plotTop100} from './js/plotTop100';
import {plotIncome} from './js/plotIncome';
import './js/footnote';
import './js/lightbox';
import './js/routing';
import './js/start';

plotIncome(document.querySelector('.plot-income'));
plotTop100(document.querySelector('.plot-top100'));
