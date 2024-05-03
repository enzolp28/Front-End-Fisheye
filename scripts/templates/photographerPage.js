function mediaFactory() {
    function ImageMedia(src, alt) {
        return `<img src=${src} alt=${alt} />`;
    }

    function VideoMedia(src) {
        return `<video src=${src} controls>
                    Votre navigateur ne supporte pas la lecture de vidéos intégrées.
            </video>`
    }

    function createMedia(type, src, alt) {
        switch (type) {
            case "image":
                return ImageMedia(src, alt);
            case "video":
                return VideoMedia(src, alt);
            default:
                throw new Error("Type de media non supporté" + type + ' ,' + src);
        }
    }
    return { createMedia };
}

function photographerPageTemplate() {
    function headerDom(photographerData) {
        const { tagline, country, city, name, portrait, price } = photographerData
        return `
        <div class="photographer-info">
            <h1>${name}</h1>
            <p>${city}, ${country}</p>
            <p>${tagline}</p>
        </div>
        <button class="contact_button"">Contactez-moi</button>
        <img src="./assets/images/photographers/${portrait}" alt="portrait de ${name}">
        `
    }




    function mediaCardDom(photographerData, index) {
        const { title, likes, photographerId, image, video } = photographerData
        const mediaFactoryInstance = new mediaFactory(); // Initialisation de mediaFactory ici
        let media;
        try {
            if (video) {
                media = mediaFactoryInstance.createMedia("video", `assets/images/${photographerId}/${video}`, title)
            }
            if (image) {
                media = mediaFactoryInstance.createMedia("image", `assets/images/${photographerId}/${image}`, title)
            }
        } catch (error) {
            console.log(error);
        }

        return `
            <div class="media" data-index="${index}">
                ${media}
                <div class="media-info">
                    <h2>${title}</h2>
                    <div class="likes">
                        <span>${likes}</span>
                        <img src="assets/icons/heart.svg" alt="likes">
                    </div> 
                </div>
            </div>
        `
    }

    return { headerDom, mediaCardDom, mediaFactory }
}
