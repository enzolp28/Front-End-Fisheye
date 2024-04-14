function photographerPageTemplate(){
    function headerDom(photographerData){
        const { tagline, country, city, name, portrait, price } = photographerData
        return `
        <div class="info">
            <h1>${name}</h1>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="./assets/images/${portrait}" alt="portrait de ${name}">
        `
    }

    return { headerDom }
}