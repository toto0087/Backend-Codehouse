import {cartsModel} from '../models/carts.model.js';
import BaseManager from './baseManager.js';
import { productsManager } from './productsManager.js';

class CartsManager extends BaseManager{
    constructor() {
        super(cartsModel);
    }


    addProdCart = async (carritoId,productoId) => {
        const carritos = await this.findAll();
        const carrito = carritos.find(carrito => carrito.id == carritoId);
        
        if (!carrito) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
        }
    
        // Verifica si existe el producto que queremos agregar
        const productExist = await productsManager.findById(productId);

        if (!productExist) {
            return 'El producto que desea agregar no existe' 
        } 
        
        // Verifica si el producto ya está en el carrito
        const existingProduct = carrito.products.find(product => product.id == productoId);

      
        if (existingProduct) {
          // Si el producto ya existe, incrementa la cantidad
          existingProduct.quantity+=1;
        } else {
          // Si el producto no existe, agregamos al carrito
          carrito.products.push({
            id: productoId,
            quantity: 1
          });
        }
        
        await carrito.save();

        return carrito;
    }
}

export const cartsManager = new CartsManager();
