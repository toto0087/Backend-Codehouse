import { toggleUserRole } from '../services/user.service.js';

async function userPremium(req, res) {

    try {
        const { id } = req.params;
        const updatedUser = await toggleUserRole(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
        res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    }
}


export { userPremium };