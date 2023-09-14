const express = require('express');
const path = require('path');
const app = express();
const port = 3000; 
const ProductManager = require('./ProductManager'); // Importa el archivo ProductManager.js

// Crea una instancia de ProductManager
const productManager = new ProductManager(path.resolve(__dirname,"productos.json"));

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

// Define una ruta para obtener todos los productos

app.get('/products', async (req, res) => {
    const {limit} = req.query
    try {
        let products = await productManager.getProducts();
        if(limit) {
            products = products.slice(0 , limit) 
        }
        res.status(200).json(products); 
    } catch (error) {
        res.status(404).json("Prods no encontrados"); 
    }
});

app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const product = await productManager.getProductById(id);
        res.status(200).json(product); 
        console.log(product)
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
});




