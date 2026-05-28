import nodemailer from "nodemailer";

const tranporter= nodemailer.createTransport({
    service: "gmail",
    auth : {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

async function sendMail (option ){
    try {
        await tranporter.sendMail({
            from: `Soumya <${process.env.EMAIL_USER}>`,
            ...option,
        })
    } catch (error) {
        throw new Error("Email sending failed");
    }
}

export default sendMail