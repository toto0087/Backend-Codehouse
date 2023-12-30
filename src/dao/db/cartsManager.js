import { generateUniqueCode } from '../../utils.js';
import {cartsModel} from '../models/carts.model.js';
import BaseManager from './baseManager.js';
import { productsManager } from './productsManager.js';
import { ticketsManager } from './ticketsManager.js';
import {transporter} from '../../mailing/nodemailer.js'

class CartsManager extends BaseManager{
    constructor() {
        super(cartsModel);
    }


    addProdCart = async (carritoId,productoId) => {
      console.log("ENTRO EN MANAGER");
        console.log("carrito id: ",carritoId);
        console.log("producto id: ",productoId);
        const carritos = await this.findAll();

        const carrito = carritos.find(c => c._id == carritoId);

        console.log(carrito);
        
        if (!carrito) {
          console.log("error");
          return 'El carrito no existe'
        }
    
        // Verifica si existe el producto que queremos agregar
        const productExist = await productsManager.findById(productoId);

        if (!productExist) {
          console.log("error2");
          return 'El producto que desea agregar no existe' 
        } 
        
        // Verifica si el producto ya está en el carrito
        const existingProduct = carrito.products.find(product => product.id == productoId);

        console.log(existingProduct);
        
        if (existingProduct) {
          // Si el producto ya existe, incrementa la cantidad
          existingProduct.quantity+=1;
          console.log("se sumo AQUI");
        } else {
          console.log("aqui ENTRO");
          // Si el producto no existe, agregamos al carrito
          carrito.products.push({
            id: productoId,
            quantity: 1
          });
        }
        
        await carrito.save();

        return carrito;
    }

    addCartPurchase = async (carritoId, user ) => {

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
        code: generateUniqueCode(), 
        purchase_datetime: new Date(),
        amount: await carrito.products.reduce(async (totalPromise, product) => {
          const total = await totalPromise;
          const productExist = await productsManager.findById(product.id);
          const productAmount = productExist ? productExist.price * product.quantity : 0;
          return total + productAmount;
        }, Promise.resolve(0)),
        purchaser: user.email,
      };
  
      // Guardamos el ticket en la base de datos
      const ticket = await ticketsManager.create(ticketData);

      console.log(ticket);

      // Enviamos el ticket por email
      const options =  {
          from: "tobisape5@gmail.com",
          to: "tobiasocchi03@hotmail.com",
          subject: "Primer mail",
          text: "test"
      }
      await transporter.sendMail(options);
  
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
