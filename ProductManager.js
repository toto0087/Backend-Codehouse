const fs = require('fs');
const Product = require('./Product');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try { 
            const products = await this.getProducts();

            const productCodeExist = products && products.find(p => p.code === product.getCode());

            if (productCodeExist) return 'El Producto que intenta añadir tiene un código que ya existe';

            const id = products.length ? products[products.length - 1].id + 1 : 1;
            product.setId(id);
                
            await fs.promises.writeFile(this.path, JSON.stringify([...products, product]));

            return 'Producto añadido correctamente';

        }
        catch(error) {
            return `Error al añadir el producto: ${error}`;
        }    
    };


    async getProducts() {
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            return `Error al leer el archivo: ${error}"`;
        }
    }

    async updateProduct(id,updatedProduct) {
        try {
            const products = await this.getProducts();

            const product = products.find(p => p.id === Number(id));
            if (!product) return 'El producto que intenta actualizar no existe';

            if (product.code !== updatedProduct.getCode()) return 'No se puede modificar el código del producto';
            product.title = updatedProduct.getTitle();
            product.description = updatedProduct.getDescription();
            product.price = updatedProduct.getPrice();
            product.thumbnail = updatedProduct.getThumbnail();
            product.stock = updatedProduct.getStock();

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
            return 'Producto actualizado correctamente'	;

        } catch (error) {
            return `Error al leer el archivo: ${error}"`;
        }
    }


    async getProductById(id) {
        try {    
            const products = await this.getProducts();
            const product = products.find(p => p.id == id);
            return product || 'El producto no existe'
        } catch(error) {
            return `Error al obtener producto: ${error}`;
        }    
    }


    
    async deleteProduct(id) {
        try {
            let products = await this.getProducts();
            if (!products) return 'No Hay productos cargados';

            products = products.filter(p => p.id !== id);

            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return 'Producto eliminado correctamente';
        } catch (error) {
            return `Error al eliminar el producto: ${error}`;
        }
    }

}


module.exports = ProductManager;
