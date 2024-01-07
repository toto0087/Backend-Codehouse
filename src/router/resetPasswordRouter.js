import express from 'express';
import { renderResetPasswordForm, handleResetPassword} from '../controllers/resetPassword.controller.js';

const router = express.Router();

// Renderizar el formulario de restablecimiento de contraseña
router.get('/:token',renderResetPasswordForm);

// Manejar la solicitud de restablecimiento de contraseña
router.post('/:token', handleResetPassword);


export default router;