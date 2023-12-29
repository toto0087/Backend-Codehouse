import { findAll , create, findById, update, deleteById } from "../services/products.service.js";

async function renderProducts(req, res) {
    const products = await findAll(req.query)
    res.render("products",{style:"products.css",products})
}

function renderRealtimeProducts(req, res) {
    res.render("realtimeproducts",{style:"realtimeproducts.css"})
}

function createRealtimeProduct (req, res) {
    const {title,price,stock,code,description} = req.body
    if(!title || !price || !description || !code || !stock ) 
    return res.status(400).json({error:"Faltan datos"})
    try {
        const createdProduct = create(req.body)   
        res.status(200).json({message:"product created" , product:createdProduct})     
    } catch (error) {
        req.status(500).json({error:"Error al crear el producto"})
    }
}

function renderRealtimeProduct(req, res) {
    const {id} = req.params
    const product = findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    res.status(200).json({message:"product found" , product})
}

function updateRealtimeProduct(req, res) {
    const {id} = req.params
    const product = findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    const updatedProduct = update(id,req.body)
    res.status(200).json({message:"product updated" , product:updatedProduct})
}

function deleteRealtimeProduct(req, res) {
    const {id} = req.params
    const product = findById(id)
    if(!product) return res.status(404).json({error:"Producto no encontrado"})
    deleteById(id)
    res.status(200).json({message:"product deleted" , product})
}

function renderSignup(req, res) {
    res.render("signup",{style:"signup.css"})
}

function renderLogin(req, res) {
    res.render("login",{style:"login.css"})
}

function renderChat(req, res) {
    res.render("chat",{style:"chat.css"})
}   

export {
    renderProducts,
    renderRealtimeProducts,
    renderRealtimeProduct,
    createRealtimeProduct,
    updateRealtimeProduct,
    deleteRealtimeProduct,
    renderSignup,
    renderLogin,
    renderChat
}