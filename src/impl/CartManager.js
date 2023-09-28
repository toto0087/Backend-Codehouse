const fs = require('fs');
const Product = require('./Product');
const path = require("path")
const ProductManager = require('./ProductManager');
const productManager = new ProductManager(path.resolve(__dirname,"./productos.json"));

class CartManager { 

    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carts);
            } else {
                return [];
            }
        } catch (error) {
            return `Error al leer el archivo: ${error}"`;
        }
    }

    async getcartById(id) {
        try {    
            const carts = await this.getCarts();
            const cart = carts.find(p => p.id == id);
            return cart || 'el carrito no existe'
        } catch(error) {
            return `Error al obtener el carrito: ${error}`;
        }    
    }

    async addCart() {
        try {
            const carts = await this.getCarts();
            const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
            const nuevoCarrito = {
            id: id, 
            products: [] // Inicialmente, no hay productos en el carrito
            };
    
            await fs.promises.writeFile(this.path, JSON.stringify([...carts, nuevoCarrito]));
        } catch (error) {
            return `Error al obtener el carrito: ${error}`;
        }
        
    }


    async addProdCart(carritoId,productId) {
        const carritos = await this.getCarts();
        const carrito = carritos.find(carrito => carrito.id == carritoId);
  
        if (!carrito) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        // Verifica si existe el producto que queremos agregar
        const productExist = await productManager.getProductById(productId);

        if (!productExist) {
            return 'El producto que desea agregar no existe' 
        } 
        
        // Verifica si el producto ya está en el carrito
        const existingProduct = carrito.products.find(product => product.id == productId);

      
        if (existingProduct) {
          // Si el producto ya existe, incrementa la cantidad
          existingProduct.quantity+=1;
        } else {
          // Si el producto no existe, agregamos al carrito
          carrito.products.push({
            id: productId,
            quantity: 1
          });
        }
        
        await fs.promises.writeFile(this.path, JSON.stringify(carritos));
        return 'Producto añadido correctamente';
      
    }
}


module.exports = CartManager;

