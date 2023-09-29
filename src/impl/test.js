const ProductManager = require("./ProductManager");
const path = require("path")
const productManager = new ProductManager(path.resolve(__dirname,"../db/productos.json"))
const test = async () => await productManager.getProducts()
test().then((res)=> console.log(res))


