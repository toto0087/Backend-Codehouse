const fs = require('fs');

class ProductManaget {

    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try { 
            const products = await this.getProducts();
            if(!products.title || !products.descripcion || !products.price || !products.thumbnail || !products.code || !products.stock) {
                console.log("Todos los campos son obligatorios");
            } else {
                const code = products.find(e => e.code == product.code);  
                if (code) {
                    return "El codigo ya existe";
                } else {
                    const id = products.length ? products[this.products.length-1].id +1 : 1;
                    product.id = id;
                }
            }
        
            await fs.promises.writeFile(this.path, JSON.stringify([...products, product]));

            return "se agrego con exito";
        }
        catch(error) {
            return `Error al añadir el producto: ${error}`;
        }    
    };


    getProducts() {
        return this.products
    }


    async getProductById(id) {
        const products = await this.getProducts();
        const product = this.products.find(product => product.id == id);

        if(product) {
            return product;
        } else {
            return "no existe el producto";
        }
    }

}



// TEST  

const productManager = new ProductManaget();

// devuelve arreglo vacio
console.log(productManager.getProducts());

// se llama addProduct
console.log(productManager.addProduct(product));

// devuelve arreglo con producto
console.log(productManager.getProducts());

// se llama addProduct con mismo codigo para que arroje error
console.log(productManager.addProduct(product));

// se evalua getProductById
console.log(productManager.getProductById(1));

// se evalua getProductById para que falle
console.log(productManager.getProductById(2));

