import {sendEmailfunc} from "../services/emailService.js"

async function sendEmailController (req, res) {
    const email = req.body.email;
    console.log("email",email);
    try {
        const emailSent = await sendEmailfunc(email);
        if ('error' in emailSent) {
            return res.status(404).json({ error: emailSent.error });
        }
        return res.status(200).json({ message: "email sent", email: emailSent });
    } catch (error) {
        return res.status(500).json({ error: "Error al enviar el email" });
    }
}

export  { sendEmailController };