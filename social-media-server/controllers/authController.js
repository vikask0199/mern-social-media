import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"
import crypto from 'crypto'


// signup method
export const register = async (req, res, next) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existing_user = await UserModel.findOne({ email: email })
        if (existing_user && existing_user.verified) {
            return res.status(409).json({ status: 'error', message: "Email already is use please login" })
        }
        else if (existing_user) {
            if (password !== confirmPassword) {
                return res.status(400).json({ status: 'error', message: "Password is not correct" })
            }
            else {
                // 12 is salt its difficulive of password after bcrypt is successful 
                // const hashedPassword = await bcrypt.hash(password, 12)
                await UserModel.findOneAndUpdate(
                    { email: email },
                    {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                    },
                    {
                        new: true,
                        validateModifiedOnly: true,
                    }
                )
                req.userId = existing_user._id
                next();
            }
        }
        else {
            if (password !== confirmPassword) {
                return res.status(400).json({ status: 'error', message: "Password is not correct" })
            }
            else {
                // const hashedPassword = await bcrypt.hash(password, 12)
                const newUser = await UserModel.create({
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                })
                req.userId = newUser._id
                next();
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: "Account creation failed !" })
    }
}


// login method
export const signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ status: 'error', message: "User not found" })
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({ status: 'error', message: "Invalid password" })
            }
            else {
                const token = jwt.sign({ email: existingUser.email, id: existingUser._id, }, "test", { expiresIn: "1h" })
                return res.status(200).json({ status: "success", message: 'Logged in successfully', token: token, userId: existingUser._id })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// otp verification
export const otpVerify = async (req, res, next) => {
    const { email, otp } = req.body

    try {
        const user = await UserModel.findOne({
            email,
            otpExpiryTime: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(404).json({ message: 'Email not found or Invalid OTP' })
        }
        else {
            const isOtpVerified = await bcrypt.compare(otp, user.otp)
            if (!isOtpVerified) {
                return res.status(400).json({ message: 'Invalid OTP' })
            }
            else {
                user.verified = true;
                user.otp = undefined;

                await user.save({
                    new: true,
                    validateModifiedOnly: true
                })
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
                return res.status(200).json({ status: 'success', message: 'Account activated successfylly please login', token: token })
            }
        }
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}



// forgot password
export const forgotPassword = async (req, res, next) => {
    const { email } = req.body
    const user = await UserModel.findOne({ email })
    try {
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Email not found' })
        }
        else {
            const resetToken = user.createPasswordResetToken()
            await user.save({ validateBeforeSave: false })

            const resetUrl = `https:talk.com/auth/reset-Password/?resetToken=${resetToken}`

            console.log(resetToken)

            // send email
            return res.status(200).json({ status: 'success', message: `Reset password link sent successfully to ${email}` })
        }
    } catch (error) {
        user.createPasswordResetToken = undefined;
        user.passwordResetExpiresIn = undefined;
        await user.save({ validateBeforeSave: false })
        return res.status(500).json({ status: 'error', message: error.message })
    }
}




// reset password
export const resetPassword = async (req, res, next) => {
    // const token = req.params.token;
    const { password, confirmPassword, token } = req.body
    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpiresIn: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Link expired or something went wrong' });
        }
        else {
            console.log("first")
            user.password = password;
            user.confirmPassword = confirmPassword;
            user.createPasswordResetToken = undefined;
            user.passwordResetExpiresIn = undefined;

            await user.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

            // send an email to user about password password reset

            return res.status(200).json({ status: 'success', message: 'Password reset successfully', token });
        }

    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

