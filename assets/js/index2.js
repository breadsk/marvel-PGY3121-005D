// Claves de autenticación
const publicKey = '8bbdbf2b699338f4942984edfa5d15ae';
const privateKey = '2d14264f6da9050c725dd1a6120020b37098d9d8';

// Función para generar el hash necesario para la autenticación
function generateHash(timestamp, privateKey, publicKey) {
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
    return hash;
}

// Función para hacer una solicitud a la API de Marvel
function getMarvelData() {
    const timestamp = new Date().getTime().toString();
    const hash = generateHash(timestamp, privateKey, publicKey);
    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Aquí puedes trabajar con los datos devueltos por la API
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Llamar a la función para obtener datos de Marvel
getMarvelData();