
import { userManager } from "../dao/db/userManager.js";
import { hashData, compareData } from "../utils.js";

function renderResetPasswordForm(req, res) {
  res.render('resetPassword', { style: "resetPassword.css", token: req.params.token });
}

// Manejar la solicitud de restablecimiento de contraseña
async function handleResetPassword(req, res) {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await userManager.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ error: 'El token no es válido o ha expirado' });
    }

    // Verifica si el token ha expirado
    if (user.resetPasswordExpires < new Date()) {
      // Redirige a la vista para generar un nuevo correo de restablecimiento
      return res.redirect(`/reset-password/${token}`);
    }

    // Comparar la contraseña vieja con la nueva
    const isMatch = await compareData(password, user.password);

    if (isMatch) {
      return res.status(400).json({ error: 'La contraseña no puede ser la misma que la anterior' });
    }


    // Restablecer la contraseña y borrar el token y la fecha de expiración
    user.password = await hashData(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña' });
  }
}



export { renderResetPasswordForm, handleResetPassword};