import productsRouter from "./router/products.router.js" 
import cartsRotuer from "./router/carts.router.js"

import express from "express";
const app = express();
const port = 3000; 

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRotuer)



