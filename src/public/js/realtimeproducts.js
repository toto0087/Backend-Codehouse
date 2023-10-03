import { socketServer } from "../../app";

const socket = io()

socket.on("products", (data) => {
    const id = document.getElementById("products");

    // Utiliza map en lugar de forEach para crear un array de nodos
    const productNodes = data.map(element => {
        const div = document.createElement("div");
        div.setAttribute('data-id', data.id);
        div.innerHTML = `
            <div>
                <div><p>${element.title}</p></div>
                <div><p>${element.description}</p></div>
                <div><p>${element.price}</p></div>
            </div>
        `;
        return div; 
    });

    // Agrega los nodos al elemento con el id "products"
    productNodes.forEach(node => {
        id.appendChild(node);
    });

});

socketServer.on("newProd",(data) => {

    const id = document.getElementById("products");

    // Utiliza map en lugar de forEach para crear un array de nodos
    const productNodes = data.map(element => {
        const div = document.createElement("div");
        div.setAttribute('data-id', data.id);
        div.innerHTML = `
            <div>
                <div><p>${element.title}</p></div>
                <div><p>${element.description}</p></div>
                <div><p>${element.price}</p></div>
            </div>
        `;
        return div;
    });

    // Agrega los nodos al elemento con el id "products"
    productNodes.forEach(node => {
        id.appendChild(node);
    });

})

socketServer.on("deleteProd",(data) => {

    const productId = data.id; 

    const productsContainer = document.getElementById("products");

    // Encuentra el elemento con el ID igual al ID del producto eliminado
    const productElement = document.getElementById(productId);
    
    if (productElement) {
        // Si se encuentra el elemento, elimínalo del DOM
        productsContainer.removeChild(productElement);
    }

})