// recuperation des photographes
async function getPhotographers() {
    try {
        // Ajout d'un message d'attente
        console.log("Récupération des photographes...");

        const response = await fetch("./data/photographers.json");
        const photographers = await response.json();
        // Retourne le tableau photographers
        return photographers;
    } catch (error) {
        // Gestion des erreurs
        console.error(`Erreur lors de la récupération des photographes : ${error.message}`); 
        return []; 
    }
}

// Affiche les photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // Creation des donnees photographe
        const photographerModel = photographerTemplate(photographer);
        console.log(photographerModel.id);
        //recupere l'id du photographe
        const idPhotographer = photographerModel.id
        // creation de l'affichage via headerDom()
        const userCardDOM = photographerModel.getUserCardDOM();
        //Ajout de l'affichage au parent photographer_section
        photographersSection.appendChild(userCardDOM);
        console.log(idPhotographer);

    });

}

// Fonction d'initialisation
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

