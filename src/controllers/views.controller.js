import { productsManager } from "../dao/db/productsManager";

async function renderProducts(req, res) {
    const products = await productsManager.findAll(req.query)
    res.render("products",{style:"products.css",products})
}

async function renderRealtimeProducts(req, res) {
    res.render("realtimeproducts",{style:"realtimeproducts.css"})
}

async function createRealtimeProduct (req, res) {
    const {title,price,thumbnail,stock,code,description} = req.body
    if(!title || !price || !thumbnail || !stock || !code || !description) 
    return res.status(400).json({error:"Faltan datos"})
    try {
        const createdProduct = await productsManager.create(req.body)   
        res.status(200).json({message:"product created" , product:createdProduct})     
    } catch (error) {
        req.status(500).json({error:"Error al crear el producto"})
    }
}

async function renderRealtimeProduct(req, res) {
    const {id} = req.params
    const product = await productsManager.findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    res.status(200).json({message:"product found" , product})
}

async function updateRealtimeProduct(req, res) {
    const {id} = req.params
    const product = await productsManager.findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    const updatedProduct = await productsManager.update(id,req.body)
    res.status(200).json({message:"product updated" , product:updatedProduct})
}

async function deleteRealtimeProduct(req, res) {
    const {id} = req.params
    const product = await productsManager.findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    await productsManager.delete(id)
    res.status(200).json({message:"product deleted" , product})
}

async function renderSignup(req, res) {
    res.render("signup",{style:"signup.css"})
}

async function renderLogin(req, res) {
    res.render("login",{style:"login.css"})
}

export {
    renderProducts,
    renderRealtimeProducts,
    renderRealtimeProduct,
    createRealtimeProduct,
    updateRealtimeProduct,
    deleteRealtimeProduct,
    renderSignup,
    renderLogin
}