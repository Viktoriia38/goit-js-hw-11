import axios from 'axios';

export class PixabayAPI {
  static BASE_URL = 'https://pixabay.com/api/';
  static API_KEY = '32894528-594f80e09e5fe76b4b9ed7c42';

  constructor() {
    this.page = 1;
    this.q = null;
  }

  fetchPhotosByQuery() {
    const searchParams = {
      params: {
        q: this.q,
        page: this.page,
        per_page: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        key: PixabayAPI.API_KEY,
      },
    };

    return axios.get(`${PixabayAPI.BASE_URL}?`, searchParams);

    //   fetchPhotosByQuery() {
    // const searchParams = new URLSearchParams({
    //   q: this.q,
    //   page: this.page,
    //   per_page: 40,
    //   image_type: 'photo',
    //   orientation: 'horizontal',
    //   safesearch: 'true',
    //   key: PixabayAPI.API_KEY,
    // });
    //   return fetch(`${PixabayAPI.BASE_URL}?${searchParams}`).then(response => {
    //     if (!response.ok) {
    //       throw new Error(response.status);
    //     }
    //     return response.json();
    //   });
  }
}
