import { PixabayAPI } from './js/pixabay-api';
import { createGalleryCards } from './js/templates/gallery-cards.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchFormEl = document.querySelector('.js-search-form');
const galleryListEl = document.querySelector('.js-gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');
const searchBtnEl = document.querySelector('.js-search-btn');

const pixabayAPI = new PixabayAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  searchBtnEl.disabled = true;
  loadMoreBtnEl.classList.add('is-hidden');

  pixabayAPI.q = event.target.elements.searchQuery.value.trim();
  pixabayAPI.page = 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();

    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      event.target.reset();
      galleryListEl.innerHTML = '';

      return;
    }

    if (data.totalHits > 40) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryListEl.innerHTML = createGalleryCards(data.hits);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  } catch (err) {
    console.log(err);
  }
  searchBtnEl.disabled = false;
};

const onLoadMoreBtnClick = async event => {
  event.target.disabled = true;

  pixabayAPI.page += 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();

    galleryListEl.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );

    const totalPages = Math.ceil(data.totalHits / 40);

    if (totalPages === data.page) {
      loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
  event.target.disabled = false;
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
