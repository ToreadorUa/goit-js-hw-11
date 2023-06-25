import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const list = document.querySelector('.list');


form.addEventListener('submit', onsubmit);

function onsubmit(evt) {
    evt.preventDefault();
  let  searchQuery= evt.currentTarget.elements.searchQuery.value;
  
  getQuery(searchQuery);
};
    
var lightbox = new SimpleLightbox('.gallery a');


async function getQuery(q) {
    //  https://pixabay.com/api/?key=37611793-ff698e652459b51eca316bb1c&q=cats&image_type=photo&orientation=horizontal&safesearch=true
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
    page: 1,
    per_page:30,
    },
   }
  
  await axios.get(`https://pixabay.com/api/`, config )
    .then(resp => {
      console.log(createMarkup(resp.data.hits))
      list.insertAdjacentHTML('afterbegin', createMarkup(resp.data.hits))
    })
  .catch(err=>{console.error(err)})
}

function createMarkup(arr) {
 return  arr.map(({ webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads
  }) => `<li class="gallery__item" style = "list-style-type: none">
            <a class="gallery__link" href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" title="${tags}"/>
            <div class="info">
              <h2>Likes <br>${likes}</h2>
              <h2>Views <br>${views}</h2>
              <h2>Downloads <br>${downloads}</h2>
              <h2>Comments <br>${comments}</h2>
            </div>
            </a>
                </li>`
    
     ).join('');

}
