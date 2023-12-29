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

    addCartWithPurchase = async (carritoId, req) => {

      // Obtener al usuario desde req.user
      const user = req.user;

      // Verificar si el usuario está autenticado
      if (!user) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
      }

      const carritos = await this.findAll();
      const carrito = carritos.find(carrito => carrito.id == carritoId);
  
      if (!carrito) {
          return res.status(404).json({ error: 'Carrito no encontrado' });
      }
  
      const productsNotProcessed = [];
  
      for (const product of carrito.products) {
          const productExist = await productsManager.findById(product.id);
  
          if (!productExist) {
              // Si el producto no existe, lo agregamos a la lista de no procesados
              productsNotProcessed.push(product.id);
              continue;
          }
  
          if (productExist.stock >= product.quantity) {
              // Si hay suficiente stock, restamos del stock y continuamos
              productExist.stock -= product.quantity;
              await productExist.save();
          } else {
              // Si no hay suficiente stock, lo agregamos a la lista de no procesados
              productsNotProcessed.push(product.id);
              continue;
          }
      }
  
      // Creamos un ticket con los datos de la compra
      const ticketData = {
          code: generateUniqueCode(), // Necesitas implementar una función para generar códigos únicos
          purchase_datetime: new Date(),
          amount: carrito.products.reduce((total, product) => {
              const productExist = carrito.products.find(p => p.id == product.id);
              return total + (productExist ? productExist.price * productExist.quantity : 0);
          }, 0),
          purchaser: user.email,
      };
  
      // Guardamos el ticket en la base de datos
      const ticket = await ticketsManager.create(ticketData);
  
      // Limpiar el carrito
      carrito.products = [];

      // Filtramos los productos que no pudieron comprarse
      carrito.products = carrito.products.filter(product => !productsNotProcessed.includes(product.id));
  
      // Guardamos el carrito actualizado
      await carrito.save();
  
      return ticket;
  }

}

export const cartsManager = new CartsManager();
