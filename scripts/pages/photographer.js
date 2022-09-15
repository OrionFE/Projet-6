// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem("id")
console.log(`photographe${id}`)

let photographer = []
let media = []

// eslint-disable-next-line import/prefer-default-export
export async function getAllInformation() {
  await fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      photographer = data.photographers
      media = data.media
    })

  photographer = photographer.filter((person) => person.id == id)
  console.log(photographer)
  media = media.filter((person) => person.photographerId == id)
  console.log(media)
}

// display data

function displayPhotographe() {
  const { name, city, country, tagline, portrait } = photographer[0]

  const photographeHeader = document.querySelector(".photograph-header")

  const divText = document.createElement("div")
  divText.classList.add("container-text")
  const h1 = document.createElement("h1")
  h1.innerText = name
  const location = document.createElement("p")
  location.classList.add("location")
  location.innerText = `${city} , ${country}`
  const description = document.createElement("p")
  description.classList.add("description")
  description.innerText = tagline
  const img = document.createElement("img")
  img.setAttribute("src", `assets/photographers/${portrait}`)
  const divImg = document.createElement("div")
  divImg.classList.add("container-img")

  photographeHeader.appendChild(divText)
  photographeHeader.appendChild(divImg)
  divText.appendChild(h1)
  divText.appendChild(location)
  divText.appendChild(description)
  divImg.appendChild(img)
}

window.addEventListener("load", async () => {
  await getAllInformation()
  displayPhotographe()
})
