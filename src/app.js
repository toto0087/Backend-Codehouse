import productsRouter from "./router/products.router.js" 
import cartsRotuer from "./router/carts.router.js"
import viewsRouter from "./router/viewsRouter.js"
import chatRouter from "./router/chatRouter.js"
import __dirname from "./utils.js";
import "./db/config.js"
import FileStore from "session-file-store";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";

import express from "express";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import { productsManager } from "./dao/db/productsManager.js";
import { URI } from "./db/config.js";
const app = express();
const port = 3000; 

//routes
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRotuer)
app.use('/', viewsRouter)
app.use('/api/chat', chatRouter)

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
app.use(cookieParser('123456'));
app.use(session({ store: MongoStore.create({mongoUrl:URI})}))

// Inicia el servidor en el puerto especificado
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

// Websocket
export const socketServer = new Server(httpServer);


const messages = []


socketServer.on("connection",(socket)=>{
  console.log(`cliente conectado ${socket.id}`);

  socket.on("newUser", (user) => {
    socket.broadcast.emit("NewUserBroadcast", user);
  });

  socket.on("message", info => {
    messages.push(info)
    socketServer.emit("chat",messages)
    
  });

  socket.on("createProduct", async (prod) => {
    const newProduct = await productsManager.create(prod);
    socket.emit('productCreated', newProduct);
  });


  socket.on("disconnect", ()=> console.log(`Se desconecto el cliente ${socket.id}`))
})