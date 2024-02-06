import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        ref: "UserModel"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const FriendRequest = new mongoose.model("FriendRequestModel", requestSchema)
export default FriendRequest