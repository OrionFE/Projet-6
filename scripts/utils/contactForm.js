// focusable modal

const focusableElements = "input , textarea, button"
const modal = document.getElementById("contact_modal")

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]
const focusableContent = modal.querySelectorAll(focusableElements)
const lastFocusableElement = focusableContent[focusableContent.length - 1]

document.addEventListener("keydown", (e) => {
  const isTabPressed = e.key === "tab"

  if (document.activeElement === lastFocusableElement) {
    firstFocusableElement.focus()
    e.preventDefault()
  }
})

const main = document.querySelector("main")
const header = document.querySelector("header")

function displayModal() {
  const modal = document.getElementById("contact_modal")
  modal.style.display = "block"
  main.setAttribute("aria-hidden", "true")
  header.setAttribute("aria-hidden", "true")
  firstFocusableElement.focus()
}

function closeModal() {
  const modal = document.getElementById("contact_modal")
  modal.style.display = "none"
  main.setAttribute("aria-hidden", "false")
  header.setAttribute("aria-hidden", "false")
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("contact_modal")
    modal.style.display = "none"
    main.setAttribute("aria-hidden", "false")
    header.setAttribute("aria-hidden", "false")
  }
})

const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const email = document.getElementById("email")
const message = document.getElementById("message")
const onlyLetter = /^[A-Za-z]+$/
const form = document.querySelector("form")
let sendForm

function setError(input, message) {
  input.nextElementSibling.innerText = message
  input.classList.remove("success")
  input.classList.add("error")
  input.setAttribute("aria-invalid", "true")
}

function setSuccess(input) {
  input.classList.remove("error")
  input.setAttribute("aria-invalid", "false")
  input.classList.add("success")
  input.nextElementSibling.innerText = ""
  sendForm++
}

function firstNameValidity() {
  if (firstName.value.match(onlyLetter) && firstName.checkValidity()) {
    setSuccess(firstName)
  } else {
    setError(firstName, "Veuillez entrer un prénom valide")
  }
}

firstName.onblur = firstNameValidity

function lastNameValidity() {
  if (lastName.value.match(onlyLetter) && lastName.checkValidity()) {
    setSuccess(lastName)
  } else {
    setError(lastName, "Veuillez entrer un nom valide")
  }
}

lastName.onblur = lastNameValidity

function emailValidity() {
  if (email.checkValidity()) {
    setSuccess(email)
  } else {
    setError(email, "Veuillez entrer un email valide")
  }
}

email.onblur = emailValidity

function messageValidity() {
  if (message.value.length > 20) {
    setSuccess(message)
  } else {
    setError(message, "Veuillez entrer un message avec au moins 20 caractères")
  }
}

message.onblur = messageValidity

form.addEventListener("submit", (e) => {
  e.preventDefault()

  sendForm = 0
  firstNameValidity()
  lastNameValidity()
  emailValidity()
  messageValidity()

  if (sendForm === 4) {
    console.log(
      `First Name : ${firstName.value} Last Name : ${lastName.value} Email : ${email.value}  Message : ${message.value}`
    )
  }
})
