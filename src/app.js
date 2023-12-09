import productsRouter from "./router/products.router.js" 
import cartsRotuer from "./router/carts.router.js"
import viewsRouter from "./router/viewsRouter.js"
import chatRouter from "./router/chatRouter.js"
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
import './passport.js'
import Websocket from "./config/socketserver.js";
import sessionsRouter from "./router/sessions.router.js";

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

// Passport
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/api/users', usersRouter)
app.use("/api/products",checkSession,productsRouter)
app.use("/api/carts",checkSession,cartsRotuer)
app.use('/api/sessions', sessionsRouter)
app.use('/chat',checkSession,chatRouter)
app.use('/', viewsRouter)

// Inicializacion de motor de plantillas
app.engine("handlebars", handlebars.engine());

// Vistas
app.set("views", __dirname + "/views");

// Indicamos el motor de plantillas a utilizar
app.set("view engine", "handlebars");

  
// Inicia el servidor en el puerto especificado
const httpServer = app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});


// Websocket
export const socketServer = Websocket(httpServer);


