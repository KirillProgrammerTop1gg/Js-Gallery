const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const jsGalleryEl = document.querySelector('.js-gallery');
const jsLightBoxEl = document.querySelector('.js-lightbox');
const jsLightBoxImageEl = document.querySelector('.lightbox__image');
const jsLightBoxButtonEl = document.querySelector('.lightbox__button[data-action="close-lightbox"]');
const jsLightBoxOverlayEl = document.querySelector('.lightbox__overlay');
let imgIndex = -1;

galleryItems.forEach(galleryItem => jsGalleryEl.innerHTML += `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${galleryItem.original}"
  >
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      alt="${galleryItem.description}"
    />
  </a>
</li>
`);

const setModalContent = (isAdd, src, alt) => {
  isAdd ? jsLightBoxEl.classList.add('is-open') : jsLightBoxEl.classList.remove('is-open');
  jsLightBoxImageEl.setAttribute('src', src);
  jsLightBoxImageEl.setAttribute('alt', alt);
}

jsGalleryEl.addEventListener('click', (e) => {
  e.preventDefault();
  const findGalleryItem = e.target.closest('.gallery__item') === null ? false : e.target.closest('.gallery__item').childNodes[1].getAttribute('href');
  if (findGalleryItem) {
    const galeryItem = galleryItems.find(galeryImg => galeryImg.original === findGalleryItem);
    imgIndex = galleryItems.indexOf(galeryItem);
    setModalContent(true, galeryItem.original, galeryItem.description);
  }
});

jsLightBoxEl.addEventListener('click', (e) => e.target === jsLightBoxButtonEl || e.target === jsLightBoxOverlayEl ? setModalContent(false, '', '') : null);

document.addEventListener('keydown', (e) => {
  e.key === 'Escape' ? setModalContent(false, '', '') : null;
  e.key === 'ArrowLeft' ? imgIndex = imgIndex <= 0 ? galleryItems.length - 1 : imgIndex - 1 : null;
  e.key === 'ArrowRight' ? imgIndex = imgIndex > galleryItems.length - 1 ? 0 : imgIndex + 1 : null;
  e.key === 'ArrowLeft' || e.key === 'ArrowRight' ? setModalContent(true, galleryItems[imgIndex].original, galleryItems[imgIndex].description) : null;
});