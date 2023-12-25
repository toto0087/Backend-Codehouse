import { userManager } from "../dao/db/userManager";

export const findAll = () => {
    return userManager.findAll();
}

export const findById = (id) => {
    return userManager.findById(id);
}

export const findByEmail = (email) => {
    return userManager.findByEmail(email);
}

export const create = (user) => {
    return userManager.create(user);
}

export const update = (id, user) => {
    return userManager.update(id, user);
}

export const deleteById = (id) => {
    return userManager.deleteById(id);
}