
let fecha = new Date();

let dia = fecha.getDate();
let mes = fecha.getMonth() + 1;
let year = fecha.getFullYear();

export const getDate = ()=> {

    mes < 10 ? mes = `0${mes}` : mes;

    return `${dia}/${mes}/${year}`;
}