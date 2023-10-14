import productsRouter from "./router/products.router.js" 
import cartsRotuer from "./router/carts.router.js"
import viewsRouter from "./router/viewsRouter.js"
import __dirname from "./utils.js";

import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
const app = express();
const port = 3000; 

//routes
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRotuer)
app.use('/', viewsRouter)


// Inicializacion de motor de plantillas
app.engine("handlebars", handlebars.engine());

// Vistas
app.set("views", __dirname + "/views");

// Indicamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


// Inicia el servidor en el puerto especificado
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

// Websocket
export const socketServer = new Server(httpServer);

socketServer.on("connection",(socket)=>{
  console.log(`cliente conectado ${socket.id}`);

  socket.on("createProduct", async (prod) => {
    const newProduct = await ProductManager.addProduct(prod);
    socket.emit('productCreated', newProduct);
  });


  socket.on("disconnect", ()=> console.log(`Se desconecto el cliente ${socket.id}`))
})