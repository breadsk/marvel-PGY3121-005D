let personas = [];

// Creamos algunas instancias de Persona y las añadimos al array
let persona1 = { 
    nombre : "Juan", 
    edad: 30
};
let persona2 = { 
    nombre : "Maria", 
    edad: 40
};

personas.push(persona1);
personas.push(persona2);

// Convertimos el array a formato JSON
let personasJSON = JSON.stringify(personas);

// Guardamos el JSON en el local storage
localStorage.setItem("personas", personasJSON);

// Para recuperar el array del local storage
let personasRecuperadas = JSON.parse(localStorage.getItem("personas"));

console.log(typeof(personasRecuperadas));
const llamar = () => {
    personasRecuperadas.map((personaRecuperada)=> {
        const { nombre , edad } = personaRecuperada;
        console.log(nombre);
        console.log(edad);
    })
}

llamar();
// Ahora puedes utilizar el array recuperado

// const operador = (...personaRecuperada){

// }
