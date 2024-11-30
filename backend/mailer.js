
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    '518273590235-90hs5mt3gd2jieum6d7gt4nin7j2rc61.apps.googleusercontent.com', // Reemplaza con tu CLIENT_ID
    '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', // Reemplaza con tu CLIENT_SECRET
    'http://localhost:5000' // URL de redireccionamiento
);

oauth2Client.setCredentials({
    refresh_token: '1//04yl9kONL5GbkCgYIARAAGAQSNwF-L9Irw7pXVTOIrY-9OhbmDt5lweFPHzRFnesfV4QboKOxftVNPBs26bR_TDmKku765iz-8vs' // Reemplaza con tu REFRESH_TOKEN
});

async function sendMail(email) {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'nicolascamicha22@gmail.com', // Reemplaza con tu correo
                clientId: 'YOUR_CLIENT_ID',
                clientSecret: 'YOUR_CLIENT_SECRET',
                refreshToken: 'YOUR_REFRESH_TOKEN',
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'nicolascamicha22@gmail.com',
            to: email,
            subject: 'Código de recuperación de contraseña',
            text: `Tu código de recuperación es: ${recoveryCode}`
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (error) {
        console.error('Error al enviar el correo: ', error);
        throw error;
    }
}
