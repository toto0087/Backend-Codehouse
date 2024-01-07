import productsRouter from "./router/productsRouter.js" 
import cartsRotuer from "./router/cartsRouter.js"
import viewsRouter from "./router/viewsRouter.js"
import chatRouter from "./router/chatRouter.js"
import emailRouter from "./router/emailRouter.js"
import __dirname from "./utils.js";
import "./db/config.js"
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import express from "express";
import handlebars from "express-handlebars";
import { URI } from "./db/config.js";
import usersRouter from "./router/user.router.js";
import checkSession from "./middleware/checksession.js";
import passport from "passport";
import './auth/passport.js'
import Websocket from "./config/socketserver.js";
import sessionsRouter from "./router/sessions.router.js";
import passportSocketIo from 'passport.socketio';
import { Server as SocketIo } from 'socket.io';
import generateMockProducts from "./mockTest/mockProducts.js";
import {logger} from "./logs/winston.js"

const app = express();
const port = 3000; 

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieParser('123456'));
app.use(session({ 
   store:  MongoStore.create({mongoUrl:URI}), 
   cookie: {maxAge: 60 * 60 * 1000 }, //1 hora
   secret: '123456'
  }))

  // Inicia el servidor en el puerto especificado
  const httpServer = app.listen(port, () => {
    logger.info(`Servidor Express escuchando en el puerto ${port}`);
  });


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar Socket.IO para trabajar con la autenticación de Passport
const io = new SocketIo(httpServer);
io.use(passportSocketIo.authorize({
  cookieParser: cookieParser('123456'),
  key: 'connect.sid',
  secret: '123456',
  store: MongoStore.create({mongoUrl: URI}),
}));

//routes
app.use('/', viewsRouter)
app.use('/api/users', usersRouter)
app.use("/api/products",checkSession,productsRouter)
app.use("/api/carts",checkSession,cartsRotuer)
app.use('/api/sessions', sessionsRouter)
app.use('/chat',checkSession,chatRouter)
app.use('/api/send-email', emailRouter)
app.get('/mockingproducts', (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});
app.get('/loggertest', (req, res) => {
  logger.fatal("fatal");
  logger.error("error");
  logger.warn("warn");
  logger.info("information");
  logger.http("http");
  logger.debug("debug");
  res.send("log test");
});

// Inicializacion de motor de plantillas
app.engine("handlebars", handlebars.engine());

// Vistas
app.set("views", __dirname + "/views");

// Indicamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

  


// Websocket
export const socketServer = Websocket(httpServer,io);


