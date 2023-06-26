import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const list = document.querySelector('.list');
const guard = document.querySelector('.js-guard');
let observer = new IntersectionObserver(onLoad, {rootMargin:"500px"});
let page = 1;
let query;
let pages_total = 0;
let total_images;


form.addEventListener('submit', onSubmit);
var lightbox = new SimpleLightbox('.gallery a');

function onLoad(entries,observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting & page<pages_total) {
      page += 1;
      observer.unobserve(guard);
      getQuery(query,page)
    } 
  })
}

function onSubmit(evt) {
  evt.preventDefault();
  list.innerHTML = '';
  observer.unobserve(guard);
  query= evt.currentTarget.elements.searchQuery.value;
  getQuery(query)
  form.elements.searchQuery.value = '';
};
 
async function getQuery(q, currPage=1) {
  const per_page = 40;
  const config = { 
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
    key: '37611793-ff698e652459b51eca316bb1c',
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currPage,
    per_page:per_page,
    },
  }
 
  await axios.get(`https://pixabay.com/api/`, config )
    .then(resp => {
      total_images = resp.data.total;
      if(page===1&q!=='') Notiflix.Notify.success(`Hooray! We found ${total_images} images.`); 
      console.log(resp)
      if (resp.data.total > 0 & q!=='') {
      pages_total = Math.ceil(resp.data.total / per_page);
      console.log(pages_total)
      list.insertAdjacentHTML('beforeend', createMarkup(resp.data.hits))
      lightbox.refresh(); 
      observer.observe(guard);
      }
      else {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
    })
  .catch(err=>console.log(err))
}

function createMarkup(arr) {
 return  arr.map(({ webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads
  }) => `<li class="gallery__item" >
            <a class="gallery__link" href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>
            <div class="info">
              <h2>Likes <span>${likes}</span></h2>
              <h2>Views <span>${views}</span></h2>
              <h2>Downloads <span>${downloads}</span></h2>
              <h2>Comments <span>${comments}</span></h2>
            </div>
            </a>
                </li>`
    
     ).join('');

}
