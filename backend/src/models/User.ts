import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: Date,
    password: { type: String, required: true },
    preferences: [String],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
