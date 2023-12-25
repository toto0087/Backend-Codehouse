import { messageManager } from "../dao/db/messageManager";

export const findAll = () => {
    return messageManager.findAll();
}

export const findById = (id) => {
    return messageManager.findById(id);
}

export const create = (msg) => {
    return messageManager.create(msg);
}

export const update = (id, msg) => {
    return messageManager.update(id, msg);
}

export const deleteById = (id) => {
    return messageManager.deleteById(id);
}

