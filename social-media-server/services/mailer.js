import dotenv from 'dotenv'
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: "viku135790@gmail.com",
        clientId: "631030033434-te5vcjnhk62io011pm5skfv1j52af07l.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04HFr2hlXtVTnCgYIARAAGAQSNwF-L9IrCtV5tIp8kfx7sgNEm2Uf_v0Vs1VPXT2CP1s6jEOR9-woWWGlCE_kEfOnsZL9Zj8wDGI",
        accessToken: "ya29.a0AfB_byDTAnkV4l7PmrqO6WpdBehw51dH_kTFJCYaVVJWBttYM_OFaNQVhx7O-0U0CyolFG_5yfrdWSCbN06sqVaTdrgKtu4-qKYfT2AbeQqsHGEHsngC5Vdq-N5fVbwpgP8TewR2Siq-nddqmtZPT7xwnKUwknU8_hGgaCgYKAWkSARMSFQHGX2MilzXXkcUz-k-_SP-wOssuwQ0171",
    },
})

export const sendEmail = async ({ recepient, subject, html, attachments }) => {
    try {
        const from = process.env.GMAIL_ACCOUNT;
        const mailOptions = {
            from:from,
            to: recepient,
            subject:subject,
            html:html,
            // text,
            attachments,
        };
        const info = await transporter.sendMail(mailOptions);

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};


