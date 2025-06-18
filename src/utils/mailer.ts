import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendConfirmationEmail = async (to: string, name: string): Promise<void> => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: '¡Bienvenido a MiBanco!',
    html: `
      <h2>Hola ${name},</h2>
      <p>Gracias por registrarte en MiBanco.</p>
      <p>¡Ya puedes comenzar a usar nuestros servicios!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
