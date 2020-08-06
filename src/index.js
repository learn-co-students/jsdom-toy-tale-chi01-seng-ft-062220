let addToy = false;
const allToys = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
  addNewToy();
  updateLikes();
});

//fetch the toys
function fetchToys(){
  fetch(allToys)
    .then(resp => resp.json())
      .then(json => {
        json.forEach(element =>{
          createCard(element)
        })
      })
}

function createCard(element){
  const toyCollection = document.getElementById('toy-collection');
  const newCard = document.createElement('div');
  newCard.className = 'card';

  const toyName = document.createElement('h2');
  toyName.innerHTML = element.name;
  newCard.appendChild(toyName);

  const toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar';
  toyImage.src = element.image;
  newCard.appendChild(toyImage);

  const toyLikes = document.createElement('p');
  toyLikes.innerText = `${element.likes} Likes`;
  newCard.appendChild(toyLikes);

  const likeButton = document.createElement('button');
  likeButton.innerHTML = 'Like <3';
  likeButton.method = 'PATCH';
  likeButton.className = 'like-btn';
  likeButton.id = element.id;
  newCard.appendChild(likeButton);

  toyCollection.appendChild(newCard);
}

function addNewToy(){
  const newToyForm = document.querySelector('.add-toy-form');
  newToyForm.addEventListener('submit', function(event){
    event.preventDefault();

  const newToy =  {
    name: event.target['name'].value,
    image: event.target['image'].value,
    likes: 0
  }
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newToy)
  }
  fetch(allToys, reqObj)
    .then(response => response.json())
      .then(toy => {
          createCard(toy)
      })
    })
}

function updateLikes(){
  const cardInfo = document.getElementById('toy-collection')
    cardInfo.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON'){
      const id = event.target.id
      let increase = (Number(event.target.previousSibling.innerText.split(' ')[0])+1)
      console.log(increase)
      event.preventDefault();
      const reqObj = {
        method: 'PATCH',
        headers: 
          {
          "Content-Type": "application/json",
          Accept: "application/json"
          },
        body: JSON.stringify({"likes": increase})
          }
      fetch(`${allToys}/${id}`, reqObj)
        .then(response => response.json())
          .then(json => {
            event.target.previousSibling.innerText = `${increase} Likes`
          })
        }
      })
    }