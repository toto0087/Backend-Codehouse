const socket = io()

socket.on("products", (data) => {
    const id = document.getElementById("products");

    // Utiliza map en lugar de forEach para crear un array de nodos
    const productNodes = data.map(element => {
        const div = document.createElement("div");
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

