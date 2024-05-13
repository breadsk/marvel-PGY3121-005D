// Claves de autenticación
const publicKey = "8bbdbf2b699338f4942984edfa5d15ae";
const privateKey = "2d14264f6da9050c725dd1a6120020b37098d9d8";

// Función para generar el hash necesario para la autenticación
const generateHash = (timestamp, privateKey, publicKey) => {
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    return hash;
}

// Función para hacer una solicitud a la API de Marvel
const getMarvelData = (offset) => {
    const timestamp = new Date().getTime().toString();
    const hash = generateHash(timestamp, privateKey, publicKey);
    const limit = 20; // Límite de héroes por solicitud
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            renderHeroes(data.data.results);
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Función para renderizar los héroes en la página
const renderHeroes = (heroes) => {
    const heroesRow = document.getElementById("heroesRow");

    heroes.forEach(hero => {
        const { id, name, description, thumbnail } = hero;
        const { extension, path } = thumbnail;

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = `${path}.${extension}`;
        img.alt = `Image of ${name}`;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = name;

        const desc = document.createElement("p");
        desc.classList.add("card-text");
        desc.textContent = description || "No description available";

        const detailsBtn = document.createElement("button");
        detailsBtn.classList.add("details-btn");
        detailsBtn.textContent = "View Details";
        detailsBtn.addEventListener("click", () => showHeroDetails(hero));

        cardBody.appendChild(title);
        cardBody.appendChild(desc);
        cardBody.appendChild(detailsBtn);

        card.appendChild(img);
        card.appendChild(cardBody);

        divCol.appendChild(card);

        heroesRow.appendChild(divCol);
    });
}

// Función para mostrar los detalles del héroe en un modal
const showHeroDetails = (hero) => {
    const { name, description, thumbnail } = hero;
    const { extension, path } = thumbnail;

    const modal = document.getElementById("heroModal");
    const heroDetails = document.getElementById("heroDetails");

    // Llenar el contenido del modal con los detalles del héroe
    heroDetails.innerHTML = `
        <img src="${path}.${extension}" alt="Image of ${name}">
        <h2>${name}</h2>
        <p>${description || "No description available"}</p>
    `;

    modal.style.display = "block";

    // Cerrar el modal al hacer clic en la "x"
    const closeBtn = document.getElementsByClassName("close")[0];
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Variable para llevar el seguimiento del número de héroes cargados
let offset = 0;

// Cargar los primeros héroes al cargar la página
getMarvelData(offset);

// Detectar cuándo el usuario llega al final de la página
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Incrementar el offset y cargar más héroes
        offset += 20;
        getMarvelData(offset);
    }
});