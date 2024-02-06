import UserModel from "../models/userModel"

export const getUsers = async (req, res, next) => {
    const all_user = await UserModel.find({
        verified: true,
    }).select("firstName lastName _id")

    const this_user = req.user

    const remaining_users = all_user.filter((user) => !this_user.friends.includes(user._id) && user._id.toString() !== req.user._id.toString())

    res.status(200).json({
        status: 'success',
        data: remaining_users,
        message: "Users found successfully"
    })
}