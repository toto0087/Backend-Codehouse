const ProductManager = require('./ProductManager');

const Product = require('./Product');
const { title } = require('process');
const { describe } = require('node:test');


// TEST  

const productManager = new ProductManager("./productos.json");

const product1 = new Product({
    title: 'producto prueba 1',
    description: 'Este es un producto prueba 1',
    stock: 25,
    price: 200,
    code: 'abc123',
    thumbnail: 'Sin imagen'
});

const product2 = new Product({
    title: 'producto prueba 2',
    description: 'Este es un producto prueba 2',
    stock: 250,
    price: 500,
    code: 'abc122',
    thumbnail: 'Sin imagen'
});


const product3 = new Product({
    title: 'producto prueba TEST',
    description: 'Este es un producto prueba TEST',
    stock: 459,
    price: 2000,
    code: 'abc111',
    thumbnail: 'Sin imagen'
});


const test = async () => {

    // Obtiene un arreglo vacio si no hay productos
    console.log(await productManager.getProducts());
        // Agregamos productos
        //console.log(await productManager.addProduct(product1));
        //console.log(await productManager.addProduct(product2));
    
        // Obtenemos los productos agregados
        console.log(await productManager.getProducts());


        // Obtenemos un producto por ID que no existe
        
        //console.log(await productManager.getProductById(50));

        //console.log(await productManager.updateProduct(1, product3));

        // Obtenemos los productos actualizados
        //console.log(await productManager.getProducts());
}


test();