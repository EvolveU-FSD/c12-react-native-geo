import { compare, hash } from "bcrypt"
import mongoose, { Schema } from "./db.js"

const UserSchema = new Schema({
    userName: String,
    passwordHash: { type: String, select: false},
})

export const User = mongoose.model("user", UserSchema)

export async function getAllUsers(){
    return await User.find()
}

export async function getUserById(id){
    return await User.findById(id) 
}

export async function deleteUser(id){
    await User.findByIdAndDelete(id)     
}

export async function createUser(newUserData) {
    return await User.create(newUserData)
}

export async function changePassword(userName, oldPassword, newPassword) {
    const user = await checkPasswordAndReturnUserOrDie(userName, oldPassword)
    return await setPassword(user._id, newPassword)
}

export async function setPassword(userId, password) {
    let user = await User.findById(userId).select('+passwordHash') 
    user.passwordHash = await hash(password, 3)
    await user.save()
    return await User.findById(user._id)
}

export async function checkPasswordAndReturnUserOrDie(userName, password){
    if (!password) throw new Error('No password supplied')

    let user = await User.findOne({userName}).select('+passwordHash')
    if (!user) throw new Error('User not found "' + userName +'"') 
    if (!user.passwordHash) throw new Error('User does not have a password set') 

    const match = await compare(password, user.passwordHash)
    if (!match) throw new Error('Password match failed')
    return await User.findById(user._id)
}   
