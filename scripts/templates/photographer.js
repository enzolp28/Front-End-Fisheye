function photographerTemplate(data) {
    const { tagline, country, city, name, portrait, price, id } = data;

    const picture = `assets/images/photographers/${portrait}`;
    
    // Gere l'affichage des photographes sur index.html
    function getUserCardDOM() {

        const article = document.createElement('article');
        const img = document.createElement('img');
        const div = document.createElement('div')
        const h2 = document.createElement('h2');
        const localisation = document.createElement('p');
        const description = document.createElement('p');
        const prix = document.createElement('p');
        const a = document.createElement('a');

        img.setAttribute("src", picture);
        img.setAttribute("alt", `Photo ${name}`);
        a.setAttribute("href", `photographer.html?id=${id}`);
        a.setAttribute("aria-label", `lien vers le profil de ${name}`);
        a.classList.add('img-name')
        img.classList.add("img-profile")
        div.classList.add("info")

        h2.textContent = name;
        localisation.textContent = city + ', ' + country;
        description.textContent = tagline;
        prix.textContent = price + "€/jour"

        article.appendChild(a);
        article.appendChild(div);

        a.appendChild(img)
        a.appendChild(h2)
        div.appendChild(localisation);
        div.appendChild(description);
        div.appendChild(prix)

        return (article);
    }
    
    function profilPhotographer(){
        const photographHeader = document.createElement('div')
        const img = document.createElement('img');

        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        console.log(img);
        photographHeader.appendChild(img)


        return (photographHeader)
    }

    return { name, picture, getUserCardDOM, id, profilPhotographer }
}


