import { userManager } from "../dao/db/userManager.js";
import { transporter } from "../mailing/nodemailer.js";
import { generateResetToken } from "../utils.js";

export const sendEmailfunc = async (email,host) => {
    try {
        const userExist = await userManager.findByEmail(email);
  
        console.log("userExist",userExist);

        if (!userExist) {
          return { error: 'El usuario no existe' };
        }
  
        // Generar token y configurar fecha de expiración
        const token = generateResetToken();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        // Actualizar usuario con el token y la fecha de expiración
        userExist.resetPasswordToken = token;
        userExist.resetPasswordExpires = expiryDate;
        await userExist.save();

        const resetLink = `http://${host}/reset-password/${token}`;

        const options = {
          from: 'tobisape5@gmail.com',
          to: email,
          subject: 'Reset de contraseña',
          text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
        };
  
        await transporter.sendMail(options);
  
        return { success: true };
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error; // Propagar el error para manejarlo en el controlador
    }
}
