import { findAll , create, findById, update, deleteById } from "../services/products.service.js";
import { findAll as findAllUsers } from "../services/user.service.js";
import { usersModel } from "../dao/models/users.model.js";

async function renderProducts(req, res) {
    const products = await findAll(req.query)
    res.render("products",{style:"products.css",products})
}

function renderRealtimeProducts(req, res) {
    res.render("realtimeproducts",{style:"realtimeproducts.css"})
}

function createRealtimeProduct (req, res) {
    try {

        const { title, description, stock, price, code } = req.body;

        let owner;

        console.log("ACA EL ROL QUE TOMA: ",req.user.role);

        // Verifica si el usuario es premium 
        if (req.user.role === 'premium') {
            // Asigna el correo electrónico del usuario como owner
            owner = req.user.email; 
        } else {
            // Si el usuario no es premium ni admin, se asigna por defecto "admin" como owner
            owner = 'admin';
        }

        const product =  create({ title, description, stock, price, code, owner });

        res.status(201).json(product);


    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_ADDED);
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

function renderResetPass(req, res) {
    res.render("passreset",{style:"passreset.css"})
}

async function renderUsers(req, res) {
    usersModel.find({})
        .lean()
        .then((userList) => 
        { res.render("users", 
            {style:"users.css",userList: userList}
        )}
    );
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
    renderChat,
    renderResetPass,
    renderUsers
}