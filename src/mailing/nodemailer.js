import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: "tobisape5@gmail.com",
        pass: "cayeoefidnihpvga"
    },
    port: 465,
    secure: true,
    host: 'smtp.gmail.com'
});
