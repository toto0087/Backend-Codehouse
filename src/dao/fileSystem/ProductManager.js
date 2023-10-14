import fs from "fs"
import path from "path"
import __dirname from "../../utils.js";
import { Socket } from "socket.io";


class ProductManager {

    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try { 

            if (!product.title) return 'El producto debe tener un título';
            if (!product.description) return 'El producto debe tener una descripción';
            if (!product.price) return 'El producto debe tener un precio';
            if (!product.thumbnails) return 'El producto debe tener un thumbnail';
            if (!product.stock) return 'El producto debe tener un stock';
            if (!product.category) return 'El producto debe tener una categoria';
            if (!product.code) return 'El producto debe tener un código';
            if (product.stock < 0) return 'El stock no puede ser negativo';
            if (product.price < 0) return 'El precio no puede ser negativo';

            const products = await this.getProducts();

            const productCodeExist = products && products.find(p => p.code === product.getCode());

            if (productCodeExist) return 'El Producto que intenta añadir tiene un código que ya existe';

            const id = products.length ? products[products.length - 1].id + 1 : 1;
            product.setId(id);
                
            await fs.promises.writeFile(this.path, JSON.stringify([...products, product]));

            return product;
            

        }
        catch(error) {
            return `Error al añadir el producto: ${error}`;
        }    
    };


    async getProducts() {
        try {
            console.log(this.path);
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

            if (product.title) product.title = updatedProduct.title; 
            if (product.description) product.description = updatedProduct.description;
            if (product.price) product.price = updatedProduct.price;
            if (product.thumbnail) product.thumbnail = updatedProduct.thumbnail;
            if (product.stock) product.stock = updatedProduct.stock;
            if (product.category) product.category = updatedProduct.category;
            if (product.status) product.status = updatedProduct.status;

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
            return product
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


export default new ProductManager(path.resolve(__dirname,"./db/productos.json"))
