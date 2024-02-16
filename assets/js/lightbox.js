import GLightbox from 'glightbox';

const lightbox = GLightbox({
  selector: "*[data-lightbox]",
  draggable: false,
  zoomable: false,
  touchNavigation: false,
  keyboardNavigation: false
});

lightbox.on('open', () => {
  const el = document.querySelector("#glightbox-body");
  el.onclick = () => {
    lightbox.close();
  };
});
