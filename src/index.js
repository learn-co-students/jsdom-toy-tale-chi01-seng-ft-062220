let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.getElementById("addToy");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});

let toyCollection = document.querySelector("#toy-collection");
let toys = fetch("http://localhost:3000/toys")
  .then((response) => {
    return response.json();
  })
  .then((toys) => {
    for (let i = 0; i < toys.length; i++) {
      toyCard(toys[i]);
    }
  });

const toyCard = (toy) => {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
  `;
  card.appendChild(likeButton(toy));
  toyCollection.appendChild(card);
};

const likeButton = (toy) => {
  let button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  button.addEventListener("click", (event) => {
    event.preventDefault()
    likePatch(toy);
  });
  return button;
};

const likePatch = (toy) => {
  let url = `http://localhost:3000/toys/${toy.id}`;
  fetch(url, likeObj(toy))
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

const likeObj = (toy) => {
  let likesCount = parseInt(toy.likes);
  likesCount+=1;
  console.log(likesCount)
  const data = { likes: likesCount };
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
};

function submitNewToy() {
  event.preventDefault();
  const name = event.target.name.value;
  const image = event.target.image.value;
  postNewToy(name, image);
  event.target.reset();
}

function postToyObj(name, image) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0,
    }),
  };
}

function postNewToy(name, image) {
  fetch("http://localhost:3000/toys", postToyObj(name, image))
    .then((resp) => resp.json())
    .then((toyData) => createToyDiv(toyData))
    .catch((err) => console.log(err));
}

toyForm.addEventListener("submit", submitNewToy);