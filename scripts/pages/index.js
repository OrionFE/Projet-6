import photographerFactory from "../factories/photographer.js"

async function getPhotographers() {
  // import json

  let photographers = []
  const mediaPhotographers = []

  await fetch("./../../data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers
      // photographers = data
    })

  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers],
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section")

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

let idPhotographe

function goToPhotographePage() {
  const photographe = Array.from(document.querySelectorAll("article"))

  photographe.forEach((card) => {
    card.firstChild.addEventListener("click", (e) => {
      idPhotographe = e.path[2].className

      if (idPhotographe == "photographer_section") {
        idPhotographe = e.path[1].className
      }
      localStorage.setItem("id", idPhotographe)
    })

    card.firstChild.addEventListener("focus", (e) => {
      idPhotographe = e.path[1].className
      localStorage.setItem("id", idPhotographe)
    })
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
  // Redirection vers la page du photographe
  goToPhotographePage()
}

init()
