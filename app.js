import productsRotuer from "./router/products.router"
import productsRotuer from "./users/users.router"

const express = require('express');
const app = express();
const port = 3000; 



// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

app.use("/products",productsRotuer)
app.use("/users",usersRotuer)



