import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
import crypto from 'crypto'



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    passwordChangeAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpiresIn: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiryTime: {
        type: Date
    },
    socket_id: {
        type: String
    },
    friends: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "UserModel"
        }
    ],
    
})


// it will encrypt the otp before saving into the db
// validation hook
userSchema.pre("save", async function (next) {
    if (!this.isModified("otp") || !this.otp) {
        return next();
    } else {
        this.otp = await bcrypt.hash(this.otp.toString(), 12);
        next();
    }
});

// encrypt the password after saving into the db
userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
        return next();
    } else {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
});


userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew || !this.password) {
        return next();
    }
    else {
        this.passwordChangedAt = Date.now() - 1000;
        next();
    }
});


// Generate reset password token
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpiresIn = Date.now() + 10 * 60 * 1000;
    return resetToken;
}


// status of password reset and token generation (jwt iat)
userSchema.methods.changedPasswordAfter = function (timestamp) {
    return timestamp < this.passwordChangeAt
}


const User = new mongoose.model("UserModel", userSchema);
export default User;