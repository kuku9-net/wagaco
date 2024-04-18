import {scrollToAnchor, startRouting} from './routing';
export {startRouting} from './routing';

const container = document.querySelector('.sidebar-position');
const btn = document.querySelector('.toggle-menu');
const overlay = document.querySelector('.overlay');

function toggleSidebar(){
  container.classList.toggle('active');
}

function onClickAnchor(ev){
  scrollToAnchor(ev.currentTarget.getAttribute('href'));
  ev.preventDefault();
}

container.querySelectorAll('.menu-on-this-page a').forEach(el => {
  el.addEventListener('click', onClickAnchor);
});


overlay.addEventListener('click', toggleSidebar);
btn.addEventListener('click', toggleSidebar);

const tocLinks = document.querySelectorAll('.sidebar-content a');
const sections = Array.from(document.querySelectorAll('h1,h2'));
const scrollable = document.querySelector(".body-scrollable");
const offsetY = 18;

scrollable.addEventListener('scroll', function() {
  const scrollY = scrollable.scrollTop + offsetY;

  const current = sections
        .sort((x, y) => y.offsetTop - x.offsetTop)
        .find(x => x.offsetTop <= scrollY);

  const currentId = current?.getAttribute('id')

  tocLinks.forEach(link => {
    if (link.getAttribute('href').slice(1) === currentId) {
      link.classList.add('active');
    }else{
      link.classList.remove('active');
    }
  });
});

if(navigator.userAgent.indexOf("Firefox") == -1 ){
  const recommendationEl = document.querySelector(".recommendation-message");
  recommendationEl.classList.add('active');
}

