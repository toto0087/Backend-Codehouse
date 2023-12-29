import { Server } from "socket.io";
import { create } from "../services/message.service.js";
import passportSocketIo from 'passport.socketio';
import MongoStore from "connect-mongo";
import { URI } from "../db/config.js";

const Websocket = (httpserver) => {

    const messages = []

    const socketServer = new Server(httpserver)

    socketServer.use(
      passportSocketIo.authorize({
        key: 'connect.sid',
        secret: '123456',
        store: MongoStore.create({ mongoUrl: URI }),
      })
    );

    socketServer.on("connection",(socket)=>{
      console.log(`cliente conectado ${socket.id}`);

      // Obtener información del usuario desde req.user
      const user = socket.request.user;
    
      

      socket.on("newUser", (user) => {
        socket.broadcast.emit("NewUserBroadcast", user);
      });
    
      socket.on("message", async (info) => {

        // Verificar si el usuario es "user" antes de procesar el mensaje
        if (user && user.role === 'user') {
          try {
            // Guardar el mensaje en la base de datos usando el servicio
            const createdMessage = await create(info);
            messages.push(createdMessage);
            socketServer.emit("chat", messages);
          } catch (error) {
            console.error("Error al crear el mensaje:", error);
          }
        } else {
          console.log(user);
          console.log("Acceso no autorizado para enviar mensajes");
        }
      });
    
    
      socket.on("disconnect", ()=> console.log(`Se desconecto el cliente ${socket.id}`))
    })
}

export default Websocket;