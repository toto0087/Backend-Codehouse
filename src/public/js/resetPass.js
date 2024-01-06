import {transporter} from "../../mailing/nodemailer.js";
import { findByEmail } from "../../services/user.service.js";

console.log(import.meta.url);
const form = document.getElementById('resetForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("ENTRO EN RESET PASS");

    const email = form['email'].value;

    try {
        // Verifica si el usuario existe en la base de datos
        const userExist = await findByEmail(email);

        if (!userExist) {
            // Si el usuario no existe, muestra un mensaje de error
            const error = document.querySelector('.error');
            error.textContent = "El usuario no existe";
            error.style.display = 'block';
        } else {
            // Si el usuario existe, envía el correo electrónico
            const options = {
                from: "tobisape5@gmail.com",
                to: email,
                subject: "Reset de contraseña",
                text: "Este es un mensaje de prueba para el reseteo de contraseña."
            };

            await transporter.sendMail(options);
            
            // Puedes agregar aquí un mensaje de éxito o redireccionar a otra página si es necesario
            console.log("Correo electrónico enviado con éxito");
        }
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir durante la operación asíncrona
        console.error("Error:", error);
    }
});

    // e.preventDefault();
    // const email = form['email'].value;
    // const password = form['password'].value;
    // const password2 = form['password2'].value;
    // const token = form['token'].value;
    // const response = await fetch('/resetpass', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password, password2, token })
    // });
    // const data = await response.json();
    // if (data.error) {
    //     const error = document.querySelector('.error');
    //     error.textContent = data.error;
    //     error.style.display = 'block';
    // }
    // if (data.message) {
    //     const error = document.querySelector('.error');
    //     error.textContent = data.message;
    //     error.style.display = 'block';
    // }
