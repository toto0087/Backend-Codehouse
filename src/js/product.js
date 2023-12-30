const addToCartButton = document.querySelector('.add-to-cart');
addToCartButton.onclick = function () {
    console.log("click hecho");
    const productId = this.getAttribute('data-productid');
    const cartId = this.getAttribute('data-cartid');
    addToCart(productId, cartId);
};

// Define la función addToCart que recibe el ID del producto y el ID del carrito
function addToCart(productId, cartId) {
    console.log("func ejecutada");

    // Realizar una solicitud POST al servidor usando fetch
    fetch(`/api/carts/${cartId}/product/${productId}`, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Puedes cambiar esto según el tipo de respuesta que esperas
    })
    .then(data => {
        // Manejar la respuesta del servidor, por ejemplo, actualizar la interfaz de usuario
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}