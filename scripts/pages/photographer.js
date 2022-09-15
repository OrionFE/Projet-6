// Mettre le code JavaScript lié à la page photographer.html
const id = localStorage.getItem("id")

let photographer = []
let media = []

// eslint-disable-next-line import/prefer-default-export
export async function getAllInformation() {
  await fetch("../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographer = data.photographers
      media = data.media
    })

  photographer = photographer.filter((person) => person.id == id)
  media = media.filter((person) => person.photographerId == id)
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

// animation dropdown

const dropdownBtn = document.querySelector(".selected")
const item2 = document.querySelector(".item-2")
const item3 = document.querySelector(".item-3")

function animationDropdown() {
  dropdownBtn.classList.toggle("selected-bradius")
  item2.classList.toggle("show-dropdown")
  item3.classList.toggle("show-dropdown")
}

dropdownBtn.addEventListener("click", animationDropdown)

// replace filter value

const dropdownItem = [item2, item3]
const textSelected = document.querySelector(".text-selected")

dropdownItem.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.innerText)
    console.log(textSelected)
    const temp = textSelected.innerText
    textSelected.innerText = item.innerText
    item.innerText = temp
    animationDropdown()
  })
})

// init

window.addEventListener("load", async () => {
  await getAllInformation()
  displayPhotographe()
})
