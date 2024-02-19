var currentPage;

// sidebar.jsでやるべきだが、面倒
function hideSidebar(){
  const btn = document.querySelector('.toggle-menu');

  const isSidebarVisible = getComputedStyle(btn).display !== 'none';

  if(isSidebarVisible){
    const container = document.querySelector('.sidebar-position');
    container.classList.remove('active');
  }
}

function scrollTo(selector, smooth){
  const el = document.querySelector(selector);
  el?.scrollIntoView(smooth ? {behavior: "smooth"} : null);
  hideSidebar();
}


function parseHash(hash){
  const ret = {};
  hash.slice(1).split("&").forEach(s => {
    const [k, v] = s.split("=");
    ret[k] = decodeURIComponent(v);
  });
  return ret;
}

function toggleClass(currentElement, selector, className, doAdd){
  document.querySelectorAll(selector).forEach(el => {
    if((doAdd && el == currentElement) ||
       (!doAdd && el != currentElement)){
      el.classList.add(className);
    }else{
      el.classList.remove(className);
    }
  });
}

function showPage(chapter){
  const hash = "#chapter-" + chapter;
  const currentSection = document.querySelector(hash) ||
        document.querySelector(".cover");
  toggleClass(currentSection, "section", "hide", false);

  const menu = document.querySelector('.menu');
  const currentChapterInSidebar = menu.querySelector('a[href="#chapter=' + chapter + '"]');
  if(currentChapterInSidebar){
    toggleClass(currentChapterInSidebar.parentElement, ".menu li", 
                "current", true)
    const currentHeadings = currentChapterInSidebar
          .parentElement
          .querySelector(".menu-on-this-page");

    toggleClass(currentHeadings, '.menu-on-this-page', "hide", false);
  }
}

function onPopState(){
  let page = parseHash(document.location.hash);

  showPage(page.chapter);
  const anchor = page.anchor || "#chapter-" + page.chapter
  scrollTo(anchor, page.chapter == currentPage?.chapter);
  currentPage = page
}

window.addEventListener("popstate", onPopState);
onPopState();

export function scrollToAnchor(selector){
  const hash = "#chapter=" + currentPage?.chapter
    + "&anchor=" + selector;
  document.location.hash = hash;
}
