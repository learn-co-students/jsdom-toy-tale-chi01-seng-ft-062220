let addToy = false;

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
});


function main(){
  findToy();
  createNewToy();
}

function findToy(){
  fetch("http://localhost:3000/toys")
    .then(resp=> resp.json())
    .then(toyData=> {
      toyData.forEach(toy =>{
        renderToy(toy)
        //console.log(toy)
      })
    })
}

function renderToy(toy){
  let toyCards = document.getElementById('toy-collection')
  makeCard = document.createElement('div')
  toyName = document.createElement('h2')
  toyImg = document.createElement('img')
  toyLikes = document.createElement('p')
  likeBtn =  document.createElement('button')
  
  makeCard.className = "card"
  toyImg.className = "toy-avatar"
  likeBtn.className = "like-btn"

  likeBtn.id = toy.id

  toyName.innerText = toy.name
  toyImg.src = toy.image
  toyLikes.innerText = `${toy.likes} likes`
  likeBtn.innerText = "like"

  makeCard.append(toyName, toyImg, toyLikes, likeBtn)
  toyCards.append(makeCard)
  
  likeBtn.addEventListener('click', function(event){
    likeToy(event)
   })
}


function createNewToy(){
  const form = document.querySelector('form')
  form.addEventListener('submit', function(event){
    event.preventDefault()

    const reqInfo = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": event.target.name.value,
        "image": event.target.image.value,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys", reqInfo)
    .then(resp=> resp.json())
      .then(toy=>{
        renderToy(toy)
      })
  })
}

function likeToy(event){
  event.preventDefault()
  let moreLikes = parseInt(event.target.previousElementSibling.innerText) + 1
  const reqInfo = {
    method: "PATCH",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": moreLikes
    }) 
  }
  fetch(`http://localhost:3000/toys/${event.target.id}`, reqInfo)
    .then(resp => resp.json())
    .then(likeData=> {
      event.target.previousElementSibling.innerText = `${moreLikes} likes`;
    })
}

main()