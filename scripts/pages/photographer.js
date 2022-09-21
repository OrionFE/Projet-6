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

// display data header

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

// tri function

function sortPhoto() {
  // tableau trié a return

  let arraySorted = []

  // on recupere tous les articles

  const mediaArray = media

  const mediaArrayWithLikeUpdate = mediaArray.map((item) => {
    const idPhoto = `id-${item.id}`
    const locStorage = localStorage.getItem(idPhoto)

    let likeUpdate

    if (locStorage) {
      likeUpdate = locStorage
    } else {
      likeUpdate = item.likes
    }

    return {
      id: item.id,
      photographerId: item.id,
      title: item.title,
      image: item.image,
      likes: likeUpdate,
      price: item.price,
      date: item.date,
      video: item.video,
    }
  })

  const filterOption = dropdownBtn.innerText

  switch (filterOption) {
    case "Popularité":
      arraySorted = mediaArrayWithLikeUpdate.sort((a, b) => b.likes - a.likes)

      break

    case "Date":
      arraySorted = mediaArrayWithLikeUpdate.sort((a, b) => {
        const da = new Date(a.date)
        const db = new Date(b.date)

        return db - da
      })

      break

    case "Titre":
      arraySorted = mediaArrayWithLikeUpdate.sort((a, b) => {
        const ta = a.title.toLowerCase()
        const tb = b.title.toLowerCase()

        if (ta < tb) {
          return -1
        }

        if (ta > tb) {
          return 1
        }

        return 0
      })

      break

    default:
      break
  }

  return arraySorted
}

// display data media
function displayMedia() {
  const gallery = document.querySelector(".photograph-gallery")
  gallery.innerHTML = ""

  const arrayToDisplay = sortPhoto()
  let pricePhotograph

  arrayToDisplay.map((item) => {
    const { image, video, title, likes, price } = item
    pricePhotograph = price
    const idPhoto = item.id
    const srcImg = photographer[0].name
    const srcImgFirstName = srcImg.split(" ")[0]

    const divDescriptionImg = document.createElement("div")
    divDescriptionImg.classList.add("description-img")
    const imgTitleText = document.createElement("p")
    imgTitleText.innerText = title

    // like ---------

    const spanNbLike = document.createElement("span")
    const locStorageIdPhoto = localStorage.getItem(`id-${idPhoto}`)

    if (!locStorageIdPhoto) {
      spanNbLike.innerHTML = `<p class="counter-like">${likes}</p><i class="fa-solid fa-heart"></i>`
    } else {
      spanNbLike.innerHTML = `<p class="counter-like">${locStorageIdPhoto}</p><i class="fa-solid fa-heart"></i>`
    }

    // ----------

    const article = document.createElement("article")
    article.classList.add("photo-card")
    article.classList.add(`id-${idPhoto}`)
    gallery.appendChild(article)

    if (image !== undefined) {
      const img = document.createElement("img")
      img.setAttribute("src", `../../assets/images/${srcImgFirstName}/${image}`)
      article.appendChild(img)
    } else {
      const videoDiv = document.createElement("video")
      videoDiv.src = `../../assets/images/${srcImgFirstName}/${video}#t=0.5`
      videoDiv.controls = true
      videoDiv.preload = "metadata"
      article.appendChild(videoDiv)
    }

    article.appendChild(divDescriptionImg)
    divDescriptionImg.appendChild(imgTitleText)
    divDescriptionImg.appendChild(spanNbLike)
  })

  const sectionPriceAndLike = document.createElement("div")
  sectionPriceAndLike.classList.add("price-and-like")

  const sumOfLike = arrayToDisplay.reduce(
    (total, obj) => Number(obj.likes) + total,
    0
  )

  const divLike = document.createElement("p")
  divLike.classList.add("sum-of-like")
  divLike.innerHTML = `${sumOfLike} <i class="fa-solid fa-heart"></i>`

  const divPrice = document.createElement("p")
  divPrice.classList.add("price")
  divPrice.innerText = `${pricePhotograph}€ / jour`

  const photographMedia = document.querySelector(".photograph-media")
  const resetPriceAndLike = document.querySelector(".price-and-like")
  if (resetPriceAndLike) {
    photographMedia.removeChild(resetPriceAndLike)
  }
  photographMedia.appendChild(sectionPriceAndLike)
  sectionPriceAndLike.appendChild(divLike)
  sectionPriceAndLike.appendChild(divPrice)

  openLightbox()
}

// like incrementation

function likeCount() {
  // select article
  const photoCardArray = [...document.querySelectorAll(".photo-card")]

  photoCardArray.forEach((card) => {
    const cardIdPhoto = card.getAttribute("class").split(" ")[1]
    const heart = document.querySelector(`.${cardIdPhoto} .fa-heart`)

    heart.addEventListener("click", () => {
      console.log("i clicked")
      let locStorageIdPhoto = localStorage.getItem(`${cardIdPhoto}`)
      const numberOfLike = document.querySelector(
        `.${cardIdPhoto} .counter-like`
      )
      const baseLike = numberOfLike.innerText

      // creer et/ou incremente
      localStorage.setItem(`${cardIdPhoto}`, `${Number(baseLike) + 1}`)
      // refresh valeur du localstorage
      locStorageIdPhoto = localStorage.getItem(`${cardIdPhoto}`)
      // show new value
      numberOfLike.innerText = locStorageIdPhoto
    })
  })
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
    const temp = textSelected.innerText
    textSelected.innerText = item.innerText
    item.innerText = temp
    animationDropdown()
    sortPhoto()
    displayMedia()
    likeCount()
  })
})

// lightbox photo
const body = document.querySelector("body")
const lightboxPhoto = document.querySelector(".lightbox-photo")
const lightboxContent = document.querySelector(".lightbox-content")
const exitBtn = document.querySelector(".lightbox-photo .fa-xmark")
const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("previous")
let content

function displayContentSlider(content) {
  // reset lightboxContent
  lightboxContent.innerText = ""

  // clone the content
  const contentClone = content.cloneNode(true)

  // get the img to display
  const img = contentClone.firstChild
  lightboxContent.appendChild(img)

  // get the title to display
  const title = contentClone.firstChild
  lightboxContent.appendChild(title)

  // disable scroll
  body.classList.add("stop-scrolling")

  // if next content doesn't exist then disable button next

  if (!content.nextElementSibling) {
    nextBtn.classList.add("disable-click")
  }

  // if previous content doesn't exist then disable button prev

  if (!content.previousElementSibling) {
    prevBtn.classList.add("disable-click")
  }
}

function openLightbox() {
  // get all the article
  const articles = [...document.querySelectorAll(".photo-card")]

  // get each photo
  const photos = articles.map((article) => article.firstChild)

  // for each photo
  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      // show lightbox
      lightboxPhoto.style.display = "block"

      // content equal to the article of the element clicked
      content = photo.parentElement

      // execute the function to show the content
      displayContentSlider(content)
    })
  })
}

function exitLightbox() {
  exitBtn.addEventListener("click", () => {
    nextBtn.classList.remove("disable-click")
    prevBtn.classList.remove("disable-click")
    lightboxPhoto.style.display = "none"

    // remove stop-scrolling
    body.classList.remove("stop-scrolling")
  })
}

function nextSlide() {
  content = content.nextElementSibling
  displayContentSlider(content)
}

nextBtn.addEventListener("click", () => {
  // reset previous button disabled
  prevBtn.classList.remove("disable-click")

  // if next element doesn't exist then disable button next
  if (!content.nextElementSibling.nextElementSibling) {
    nextSlide()
    nextBtn.classList.add("disable-click")
  } else nextSlide()
})

function prevSlide() {
  content = content.previousElementSibling
  displayContentSlider(content)
}

prevBtn.addEventListener("click", () => {
  // reset next button disabled
  nextBtn.classList.remove("disable-click")

  // if next element doesn't exist then disable button next
  if (!content.previousElementSibling.previousElementSibling) {
    prevSlide()
    prevBtn.classList.add("disable-click")
  } else prevSlide()
})

// init

window.addEventListener("load", async () => {
  await getAllInformation()
  displayPhotographe()
  sortPhoto()
  displayMedia()
  likeCount()
  openLightbox()
  exitLightbox()
})
