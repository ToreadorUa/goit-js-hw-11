import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');

form.addEventListener('submit', onsubmit);

function onsubmit(evt) {
    evt.preventDefault();
    let query = evt.target.value;
      console.log(query);
      // let query =
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = async () => {};
    };
}

// function getQuery(q) {
//   // const API_KEY = '37611793-ff698e652459b51eca316bb1c';
//   //  https://pixabay.com/api/?key=37611793-ff698e652459b51eca316bb1c&q=cats&image_type=photo&orientation=horizontal&safesearch=true
//   const option = {
//     key: '37611793-ff698e652459b51eca316bb1c',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   };
// }

// {
//     url: '/user',
//     baseURL: 'https://pixabay.com/api/',
//         params: {
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   },
// }

// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.
