import { usersModel } from '../models/users.model.js'
import BaseManager from './baseManager.js'


class UserManager extends BaseManager {
    constructor() {
        super(usersModel)
    }

    // Metodo abstracto implementado
    async findAll() {
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
            return `Error al obtener los usuarios: ${error}`;
        }
    }

    // Busca un usuario por email
    async findByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (error) {
            return `Error al obtener el usuario: ${error}`;
        }
    }

    // Busca un usuario por cartId
    async findByCartId(cartId) {
        try {
            const user = await this.model.findOne({ cart: cartId });
            return user;
        } catch (error) {
            return `Error al obtener el usuario por cartId: ${error}`;
        }
    }

}



export const userManager = new UserManager();