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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const idPhotographer = photographerModel.id
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        console.log(idPhotographer);

    });

}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

