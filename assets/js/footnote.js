import tippy from 'tippy.js';

document.querySelectorAll('.footnote').forEach(el => {
    const markEl = document.createElement('span');
    markEl.innerHTML = '*';
    markEl.classList.add("tooltip-trigger");
    el.insertAdjacentElement("beforebegin", markEl);
    tippy(markEl, {
        content: el,
        placement: 'bottom',
        arrow: true,
        appendTo: document.body,
        theme: 'light-border',
        maxWidth: 'min(80vw, 500px)',
        //trigger: "click",
        interactive: true,
    });
});

