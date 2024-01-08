import { userManager } from "../dao/db/userManager.js";
import UserDTO from "../dao/DTOs/user.dto.js"


export const findAll = () => {
    return userManager.findAll();
}

export const findById = (id) => {
    return userManager.findById(id);
}

export const findByEmail = (email) => {
    return userManager.findByEmail(email);
}

export const findByCartId = (cartId) => {
    return userManager.findByCartId(cartId);
}

export const create = (user) => {
    const userDTO = new UserDTO(user);
    return userManager.create(userDTO);
}

export const update = (id, user) => {
    return userManager.update(id, user);
}

export const deleteById = (id) => {
    return userManager.deleteById(id);
}

export const toggleUserRole = async (id) => {
    try {

        console.log(id);

        const user = await userManager.findById(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Cambia el rol según la lógica deseada
        const updatedUser = user.role === 'user' ? await userManager.userToPremium(id) : await userManager.userToRegular(id);

        return updatedUser;
    } catch (error) {
        throw new Error(`Error al cambiar el rol del usuario: ${error.message}`);
    }
}
