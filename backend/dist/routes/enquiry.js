import { Router } from "express";
import mongoose from "mongoose";
import { Enquiry } from "../models/Enquiry.js";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-\s()]{7,16}$/;
function validatePayload(payload) {
    const errors = {};
    if (!payload.name?.trim()) {
        errors.name = "Name is required.";
    }
    if (!payload.email?.trim()) {
        errors.email = "Email is required.";
    }
    else if (!emailPattern.test(payload.email.trim())) {
        errors.email = "Enter a valid email address.";
    }
    if (!payload.phone?.trim()) {
        errors.phone = "Phone number is required.";
    }
    else if (!phonePattern.test(payload.phone.trim())) {
        errors.phone = "Enter a valid phone number.";
    }
    if (!payload.workshopId?.trim()) {
        errors.workshopId = "Workshop ID is required.";
    }
    return errors;
}
export const enquiryRouter = Router();
enquiryRouter.post("/", async (request, response, next) => {
    try {
        const payload = request.body;
        const errors = validatePayload(payload);
        if (Object.keys(errors).length > 0) {
            return response.status(400).json({
                success: false,
                message: "Validation failed.",
                errors
            });
        }
        const enquiry = {
            name: payload.name.trim(),
            email: payload.email.trim().toLowerCase(),
            phone: payload.phone.trim(),
            workshopId: payload.workshopId.trim()
        };
        if (mongoose.connection.readyState === 1) {
            await Enquiry.create(enquiry);
        }
        else {
            console.log("New workshop enquiry:", enquiry);
        }
        return response.status(201).json({
            success: true,
            message: "Enquiry received successfully."
        });
    }
    catch (error) {
        return next(error);
    }
});
