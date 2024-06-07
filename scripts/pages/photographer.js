let compteurLikes = 0;
async function getPhotographer(photographerId) {
    try {
        // Ajout d'un message d'attente
        console.log("Récupération des photographes...");

        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        // Retourne le tableau photographers
        const photographers = data.photographers;
        const currentPhotographer = photographers.find(
            (p) => p.id === Number(photographerId)
        );
        console.log(currentPhotographer);
        return currentPhotographer;
    } catch (error) {
        // Gestion des erreurs
        console.error(
            `Erreur lors de la récupération des photographes : ${error.message}`
        );
        return [];
    }
}
let currentPhotographerMedia;
async function getPhotographerMedia(photographerId) {
    try {
        // Ajout d'un message d'attente
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        // Retourne le tableau photographers
        const photographersMedia = data.media;
        currentPhotographerMedia = photographersMedia.filter(
            (m) => m.photographerId === Number(photographerId)
        );
        console.log(currentPhotographerMedia);
        return currentPhotographerMedia;
    } catch (error) {
        // Gestion des erreurs
        console.error(
            `Erreur lors de la récupération des photographes : ${error.message}`
        );
        return [];
    }
}

async function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPhotographerId = urlParams.get("id");
    console.log(currentPhotographerId);
    const currentPhotographerData = await getPhotographer(currentPhotographerId);
    displayHeader(currentPhotographerData);
    document.querySelector("#tjm").textContent = currentPhotographerData.price;
    const currentPhotographerMedia = await getPhotographerMedia(
        currentPhotographerId
    );
    console.log(currentPhotographerMedia);
    displayMedia(currentPhotographerMedia);
}

function displayHeader(data) {
    const header = document.querySelector(".photograph-header");
    header.innerHTML = photographerPageTemplate().headerDom(data);
    document.querySelector("#photographer-name").innerText = data.name;
    handleContactForm();
}

const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const arrow = dropdown.querySelector('.arrow');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelector('.selected');

select.addEventListener('click', ()=>{
    select.classList.toggle('select-clicked');
    arrow.classList.toggle('arrow-rotate')
    menu.classList.toggle('menu-open')
});

options.forEach( option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        arrow.classList.remove('arrow-rotate')
        menu.classList.remove('menu-open')
        trieMedia(option.getAttribute('value'));
    })
})
function trieMedia(choix) {
    if (choix === "popularite") {
        currentPhotographerMedia.sort((a, b) => b.likes - a.likes);
    } else if (choix === "date") {
        currentPhotographerMedia.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    } else if (choix === "titre") {
        currentPhotographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayMedia(currentPhotographerMedia);
}

function displayMedia(data) {
    const mediaContainer = document.querySelector(".gallerie");
    mediaContainer.innerHTML = "";
    let index = 0;
    data.forEach((media) => {
        mediaContainer.insertAdjacentHTML(
            "beforeend",
            photographerPageTemplate().mediaCardDom(media, index)
        );
        index++;
        compteurLikes += media.likes;
    });
    document.querySelector("#total-likes").textContent = compteurLikes;
    const btnLikes = document.querySelectorAll(".liker");
    btnLikes.forEach((like) => {
        like.addEventListener("click", () => {
            const parentElement = like.parentElement;
            let mediaLikes = parentElement.querySelector("span").textContent;
            console.log(parentElement);
            const totalLikesElement = document.querySelector("#total-likes");
            const spanMediaLikes = parentElement.querySelector("span");
            if (!like.classList.contains("liked")) {
                compteurLikes++;
                totalLikesElement.textContent = compteurLikes;
                spanMediaLikes.textContent = Number(mediaLikes) + 1;
                like.classList.add("liked");
            } else {
                compteurLikes--;
                totalLikesElement.textContent = compteurLikes;
                spanMediaLikes.textContent = Number(mediaLikes) - 1;
                like.classList.remove("liked");
            }
        });

    });

    const medias = document.querySelectorAll(".media-element");
    medias.forEach((media) => {
        media.addEventListener("click", () => {
            const mediaId = media.parentElement.dataset.index;
            console.log(mediaId);
            handleLightBox(mediaId);
        });
    });
}




function displayFooterData(totalLikes, tjm) { }

function handleLightBox(index) { 
    const lightBox = document.querySelector(".lightbox-modal");
    let currentMediaIndex = index;
    const closeLightBox = document.querySelector(".btn-close-lightbox");
    closeLightBox.addEventListener("click", () => {
        lightBox.style.display = "none";
    });
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    btnPrev.addEventListener("click", () => {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
        }else {
            currentMediaIndex = currentPhotographerMedia.length - 1;
        }
        openLightBox(currentMediaIndex);
    });
    btnNext.addEventListener("click", () => {
        if (currentMediaIndex < currentPhotographerMedia.length - 1) {
            currentMediaIndex++;
        } else {
            currentMediaIndex = 0;
        }
        openLightBox(currentMediaIndex);
    });
    openLightBox(currentMediaIndex);
}

function openLightBox(index) {
    let currentMedia = currentPhotographerMedia[index];
    const { title, image, video, photographerId } = currentMedia;
    const lightBox = document.querySelector(".lightbox-modal");
    const lightBoxContent = document.querySelector(".lightbox-content");
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
    lightBoxContent.innerHTML = `${media} <h3>${title}</h3>`;  

    

    lightBox.style.display = "block";
}



init();
