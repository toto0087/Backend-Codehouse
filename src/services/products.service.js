import { productsManager } from "../dao/db/productsManager.js";

export const findAll = (params) => {
    return productsManager.findAll(params);
}

export const findById = (id) => {
    return productsManager.findById(id);
}

export const create = (prod) => {
    return productsManager.create(prod);
}

export const update = (id, prod) => {
    return productsManager.update(id, prod);
}

export const deleteById = (id) => {
    return productsManager.deleteById(id);
}