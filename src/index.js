let addToy = false;
BaseUrl = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {
  toyFetch()
  let toyContainer = document.querySelector("#toy-collection")
  document.getElementById("toy-form").addEventListener('submit', submitForm)
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

  function toyFetch(){
  fetch(BaseUrl) 
  .then((response) => response.json())
  .then((toyData) =>toyData.forEach((toy) => {
        renderToys(toy)
  }))
}

  function renderToys(toy){
   
    let toyContainer = document.querySelector("#toy-collection")
    
    let toyCard = document.createElement('div')
        toyCard.classList.add = ("card", "m-2")
        
    let toyTag = document.createElement('h2')
        toyTag.innerText = toy.name
        toyTag.classList.add = ('card-name')

    let toyImg = document.createElement('img')
        toyImg.setAttribute ('src', toy.image)
        toyImg.setAttribute('class', 'toy-avatar')
        toyImg.height = 300
        toyImg.width = 300

    let toyPTag = document.createElement('p')
        toyPTag.innerText = toy.likes + ` Likes`

    let toyButton = document.createElement('button')
        toyButton.innerText = `Like`  
        toyButton.classList.add = ("like-btn", 'btn-primary')
        toyButton.id = toy.id
        toyButton.addEventListener('click', (event) => {
          console.log(event.target.dataset);
          addLikes(event)
        })
      
      let deleteBtn = document.createElement('button')
          deleteBtn.innerText = `Delete`
          deleteBtn.classList.add = ('delete-btn', 'btn-danger')
          deleteBtn.addEventListener('click', () => {
            deleteToy(toy, toyCard)
          })
    
    toyCard.append(toyTag, toyImg, toyPTag, toyButton, deleteBtn)
    toyContainer.appendChild(toyCard)
  }

  function submitForm(event){
      event.preventDefault()

      let newToy = {
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0,
      }

      let reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newToy)

      }
      
      fetch(BaseUrl, reqObj)
        .then(res => res.json())
        .then((toyObj) => {
          let newToy = renderToys(toyObj)
          toyContainer.append(newToy)
        })

  }

    function addLikes(event){
      event.preventDefault()
        console.log(event)
        console.log(+event.target.previousElementSibling.innerText.split(" ")[0])


      let newLikes = {
        likes: +event.target.previousElementSibling.innerText.split(" ")[0] + 1
      }

      let reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "PATCH",
        body: JSON.stringify(newLikes)
        }

    fetch(BaseUrl+event.target.id, reqObj)
            .then(res => res.json())
            .then(console.log(updatedToy))

    } 

    function deleteToy(toy, toyCard) {
          fetch(BaseUrl+toy.id, {method: "DELETE"})
            .then(() => toyCard.remove())
    }



