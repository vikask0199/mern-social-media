import otpGenerator from 'otp-generator'
import UserModel from "../models/userModel.js"
import { sendEmail } from "../services/mailer.js"
import {otp} from "../templates/otp.js"

export const sendOtp = async (req, res, next) => {
    const { userId } = req;

    try {
        const newOtp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000);

        // Find and update the user document, ensuring it returns the modified document
        const user = await UserModel.findByIdAndUpdate(userId, {
            otpExpiryTime: otpExpiryTime,
        });

        user.otp = newOtp.toString();
        await user.save({ new: true, validateModifiedOnly: true });

        const sendEmailResult = await sendEmail({
            recepient: user.email,
            subject: "OTP verification to activate your account on our chat application",
            html: otp(user.firstName, newOtp),
            // text: `This otp for ${newOtp} testing purposes`,
            attachments: [],
        })

        if (sendEmailResult === true) {
            return res.status(200).json({ status: 'success', message: 'OTP sent successfully' })
        } else {
            return res.status(500).json({
                status: 'error', message: 'Account creation faild'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }
}
