import mongoose, { Schema } from "mongoose";

export interface EnquiryDocument {
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

const enquirySchema = new Schema<EnquiryDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

export const Enquiry = mongoose.models.Enquiry || mongoose.model<EnquiryDocument>("Enquiry", enquirySchema);
