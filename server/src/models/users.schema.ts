import { Schema, model } from "mongoose";
import { IUser } from "../types/users.type";

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String},
    role: String,
    educational_background: String,
    major: String,
    funding_need: String,
    preference: String,
    created_at: Date,
    updated_at: Date,
    onboardingCompleted: { type: Boolean, default: false }, // New field
 });
 
 // create collection
 export const Users = model<IUser>("Users", UserSchema);