import { Server } from "socket.io";
import { productsManager } from "../dao/db/productsManager.js";
import { messageManager } from "../dao/db/messageManager.js";

const Websocket = (httpserver) => {

    const messages = []

    const socketServer = new Server(httpserver)

    socketServer.on("connection",(socket)=>{
      console.log(`cliente conectado ${socket.id}`);
    
      socket.on("newUser", (user) => {
        socket.broadcast.emit("NewUserBroadcast", user);
      });
    
      socket.on("message", info => {
        messageManager.create(info)
        messages.push(info)
        socketServer.emit("chat",messages)
        
      });
    
      socket.on("createProduct", async (prod) => {
        const newProduct = await productsManager.create(prod);
        socket.emit('productCreated', newProduct);
      });
    
    
      socket.on("disconnect", ()=> console.log(`Se desconecto el cliente ${socket.id}`))
    })
}

export default Websocket;