import { cartsManager } from "../dao/db/cartsManager.js";

export const findAll = () => {
    return cartsManager.findAll();
}

export const findById = (id) => {
    return cartsManager.findById(id);
}

export const create = (cart) => {
    return cartsManager.create(cart);
}

export const update = (id, cart) => {
    return cartsManager.update(id, cart);
}

export const deleteById = (id) => {
    return cartsManager.deleteById(id);
}

export const addProdCart = (carritoId,productoId) => {
    console.log("ENTRO EN SERVICE");
    return cartsManager.addProdCart(carritoId,productoId);
}

export const addCartPurchase = (carritoId, user) => {
    return cartsManager.addCartPurchase(carritoId, user);
}