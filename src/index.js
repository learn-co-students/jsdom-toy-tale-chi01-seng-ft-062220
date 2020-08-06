///////////// variable stuff ////////////////

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyContainer = document.querySelector('#toy-collection')
const toyForm =document.querySelector('.add-toy-form')
let addToy = false;



///////////// layout stuff ////////////////

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toysData => createToyDivs(toysData))
  .catch(err => console.log(err))
}

function createToyDivs(toysData){
  toysData.forEach(toyData => createToyDiv(toyData))
}

function createToyDiv(toyData){
  const div = `  
    <div class="card">
      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar" />
      <p> ${toyData.likes} Likes</p>
      <button data-id=${toyData.id} class="like-btn">Like <3</button>
    </div>
    `
    toyContainer.innerHTML += div
}

///////////// new toy stuff ////////////////

function toggleForm(){
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
}

function submitNewToy() {
  event.preventDefault()
  const name = event.target.name.value
  const image = event.target.image.value
  postNewToy(name, image)
  event.target.reset()
}

function postToy(name, image){
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }
}

function postNewToy(name, image){
  fetch('http://localhost:3000/toys', postToy(name, image))
    .then(res => res.json())
    .then(toyData => createToyDiv(toyData))
    .catch(err => console.log(err))
  }

/////////////// liking stuff ///////////////////

function likeButton(){
  if (event.target.tagName === "BUTTON"){
    showNewLike()
    likeToy()
  }
}

function showNewLike(){
  const pTag = event.target.previousElementSibling
  const likeString = pTag.innerText.slice(0, -6)
  const likes = parseInt(likeString)
  pTag.innerText = `${likes + 1} Likes`
}

function likeToy(){
  const id = event.target.dataset.id
  fetch(`http://localhost:3000/toys/${id}`, patObj())
  .then(resp => resp.json())
  .then(toyData => console.log(toyData))
  .catch(err => console.log(err))
}

// patching likeOb through //
function patObj() {
  const likeString = event.target.previousElementSibling.innerText.slice(0, -6)
  const likes= parseInt(likeString)
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  }
}


///////////// listen stuff ////////////////

addBtn.addEventListener("click", toggleForm);
toyForm.addEventListener("submit", submitNewToy);
toyContainer.addEventListener("click", likeButton)



/// secret tunnellllllllll ///

fetchToys()
