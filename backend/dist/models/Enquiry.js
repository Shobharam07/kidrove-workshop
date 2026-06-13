import mongoose, { Schema } from "mongoose";
const enquirySchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false
});
export const Enquiry = mongoose.models.Enquiry || mongoose.model("Enquiry", enquirySchema);
