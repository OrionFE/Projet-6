function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("p");
    location.innerText = city + ", " + country;
    const description = document.createElement("p");
    description.innerText = tagline;
    const pricetag = document.createElement("p");
    pricetag.innerText = price + "€/jour";
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(pricetag);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
