
async function getPhotographer(photographerId) {
    try {
        // Ajout d'un message d'attente
        console.log("Récupération des photographes...");
        
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        // Retourne le tableau photographers
        const photographers = data.photographers;
        const currentPhotographer = photographers.find(p => p.id === Number(photographerId))
        console.log(currentPhotographer);
        return currentPhotographer;
    } catch (error) {
        // Gestion des erreurs
        console.error(`Erreur lors de la récupération des photographes : ${error.message}`);
        return []; 
    }
}

async function init (){
    const urlParams = new URLSearchParams(window.location.search);
    const currentPhotographerId = urlParams.get('id')
    console.log(currentPhotographerId);
    const currentPhotographerData = await getPhotographer(currentPhotographerId)
    displayHeader(currentPhotographerData)
}

function displayHeader(data){
    const header = document.querySelector('.photograph-header')
    header.innerHTML = photographerPageTemplate().headerDom(data)
}


init()