import { userManager } from "../dao/db/userManager.js";
import { transporter } from "../mailing/nodemailer.js";

export const sendEmailfunc = async (email) => {
    try {
        const userExist = await userManager.findByEmail(email);
  
        console.log("userExist",userExist);

        if (!userExist) {
          return { error: 'El usuario no existe' };
        }
  
        const options = {
          from: 'tobisape5@gmail.com',
          to: email,
          subject: 'Reset de contraseña',
          text: 'Este es un mensaje de prueba para el reseteo de contraseña.',
        };
  
        await transporter.sendMail(options);
  
        return { success: true };
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw error; // Propagar el error para manejarlo en el controlador
    }
}
