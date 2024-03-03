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

    async findOne(query) {
        return this.model.findOne(query);
      }


    async updateUser(id, updates) {
        try {
            const user = await this.model.findByIdAndUpdate(id, updates, { new: true });
            return user;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }
    
    async userToPremium(id) {
        return this.updateUser(id, { role: 'premium' });
    }
    
    async userToRegular(id) {
        return this.updateUser(id, { role: 'user' });
    }

    async deleteMany(query) {
        return this.model.deleteMany(query);
      }

    async deleteById(id) {
        try {
            await this.model.findByIdAndDelete(id);
            return { message: 'Usuario eliminado exitosamente.' };
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    }

}



export const userManager = new UserManager();