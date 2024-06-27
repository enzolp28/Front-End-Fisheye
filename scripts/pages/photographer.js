//let compteurLikes = 0;
async function getPhotographer(photographerId) {
    try {
        // Ajout d'un message d'attente
        console.log("Récupération des photographes...");
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        // Retourne le tableau photographers
        const photographers = data.photographers;

        // trouve l'id du photographe dans le Json
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
// initialisation d'une variable pour stocker l'id du photographe et avoir accés dans tout le fichier 
let currentPhotographerMedia;

// permet de recuperer dans le dossier Json les medias du photographe correspondant à son id
async function getPhotographerMedia(photographerId) {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        const photographersMedia = data.media;

        // ajout tout les element comportant l'id du media
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
    // URLSearchParams permet de recuperer l'id du photographe sur lequel on clique
    const urlParams = new URLSearchParams(window.location.search);
    const currentPhotographerId = urlParams.get("id");
    console.log(currentPhotographerId);

    //affiche le photographe
    const currentPhotographerData = await getPhotographer(currentPhotographerId);
    displayHeader(currentPhotographerData);

    //ajoute le prix du photographe
    document.querySelector("#tjm").textContent = currentPhotographerData.price;

    //Fonction qui affiche les medias
    const currentPhotographerMedia = await getPhotographerMedia(
        currentPhotographerId
    );
    console.log(currentPhotographerMedia);

    //affiche les photos ou vidéos
    displayMedia(currentPhotographerMedia);
}

//gere l'affichage du header du photographe
function displayHeader(data) {
    const header = document.querySelector(".photograph-header");
    header.innerHTML = photographerPageTemplate().headerDom(data);
    document.querySelector("#photographer-name").innerText = data.name;
    handleContactForm();
}


/////////////////// MENU DROPDOWN /////////////////

const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const arrow = dropdown.querySelector('.arrow');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelector('.selected');

select.addEventListener('click', ()=>{
    //select.classList.toggle('select-clicked');
    arrow.classList.toggle('arrow-rotate')
    menu.classList.toggle('menu-open')
});
select.addEventListener('keydown', ()=>{
    //select.classList.toggle('select-clicked');
    arrow.classList.toggle('arrow-rotate')
    menu.classList.toggle('menu-open')
    const firstLi = menu.querySelector('li[value="popularite"]');
    firstLi.focus();

});

options.forEach( option => {
    option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        //select.classList.remove('select-clicked');
        arrow.classList.remove('arrow-rotate')
        menu.classList.remove('menu-open')
        trieMedia(option.getAttribute('value'));
    })
    option.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            selected.innerText = option.innerText;
            //select.classList.remove('select-clicked');
            arrow.classList.remove('arrow-rotate')
            menu.classList.remove('menu-open')
            trieMedia(option.getAttribute('value'));
        }
    })
})
function trieMedia(choix) {
    if (choix === "popularite") {

        // Trie par le nombre de likes
        currentPhotographerMedia.sort((a, b) => b.likes - a.likes);
    } else if (choix === "date") {

        // Trie par date. Les dates recupérées dans le JSon sont converties en objets Date pour permettre la comparaison.
        currentPhotographerMedia.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
    } else if (choix === "titre") {

        // Trie par titre. localeCompare compare les chaines de caractères selon l'ordre alphabétique
        currentPhotographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayMedia(currentPhotographerMedia);
}

function displayMedia(data) {
    const mediaContainer = document.querySelector(".gallerie");
    mediaContainer.innerHTML = "";

    //index sert a definir l'attribut data-index
    let index = 0;

    let compteurLikes = 0;

    data.forEach((media) => {
        mediaContainer.insertAdjacentHTML(
            "beforeend",
            photographerPageTemplate().mediaCardDom(media, index)
        );
        index++;
        compteurLikes += media.likes;
    });

    // Affiche le total de likes des medias dans la baniere
    document.querySelector("#total-likes").textContent = compteurLikes;

    const btnLikes = document.querySelectorAll(".liker");
    btnLikes.forEach((like) => {
        like.addEventListener("click", () => {
            const parentElement = like.parentElement;
            console.log(parentElement);

            //recupere la valeur du nombre de likes
            let mediaLikes = parentElement.querySelector("span").textContent;
            console.log(mediaLikes);
            const totalLikesElement = document.querySelector("#total-likes");
            const spanMediaLikes = parentElement.querySelector("span");

            //si le bouton n'est pas encore la classe liked
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

    // lorsque que l'on clique sur un media qui a la classe media-element, on ouvre la lightbox
    const medias = document.querySelectorAll(".media-element");
    medias.forEach((media) => {
        media.addEventListener("click", () => {

            //recupere l'id du media
            const mediaId = media.parentElement.dataset.index;
            console.log(mediaId);
            handleLightBox(mediaId);
        });

        // lorsqu'on appuie sur entree, on ouvre la lightbox
        media.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const mediaId = media.parentElement.dataset.index;
                console.log(mediaId);
                handleLightBox(mediaId);
            }
        });
    });
}



function handleLightBox(index) { 
    const lightBox = document.querySelector(".lightbox-modal");
    const closeLightBox = document.querySelector(".btn-close-lightbox");
    let currentMediaIndex = index;
    console.log('currentmediaindex:',currentMediaIndex);

    closeLightBox.addEventListener("click", () => {
        lightBox.style.display = "none";
    });

    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");

    //change le data-index ce qui permet de changer l'affichage
    function goToPrev(){
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
        }else {
            currentMediaIndex = currentPhotographerMedia.length - 1;
        }
        openLightBox(currentMediaIndex);
    }

    function goToNext(){
        if (currentMediaIndex < currentPhotographerMedia.length - 1) {
            currentMediaIndex++;
        } else {
            currentMediaIndex = 0;
        }
        openLightBox(currentMediaIndex);
    }

    btnPrev.addEventListener("click", goToPrev);
    btnNext.addEventListener("click", goToNext);

    openLightBox(currentMediaIndex)
    lightBox.focus()
    closeLightBox.focus()

    // naviguer avec touche clavier
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            goToPrev();
        }
        if (e.key === "ArrowRight") {
            goToNext();
        }
        if (e.key === "Escape") {
            lightBox.style.display = "none";
        }
    })
}

function openLightBox(index) {
    let currentMedia = currentPhotographerMedia[index];
    const { title, image, video, photographerId } = currentMedia;
    const lightBox = document.querySelector(".lightbox-modal");
    const lightBoxContent = document.querySelector(".lightbox-content");
    const mediaFactoryInstance =  mediaFactory(); // Initialisation de mediaFactory ici
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

    // Affiche le media dans la lightbox
    lightBoxContent.innerHTML = `${media} <h3>${title}</h3>`;  
    lightBox.style.display = "block";
}



init();
