import {z} from "zod";

export const signUpSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(6, "Password must be at least 6 characters long"),
    phoneNumber: z.string().trim().min(10, "Phone number must be at least 10 digits long"). max(10, "Phone number must be at most 10 digits long"),
    role: z.enum(["user", "admin", "seller"]).default("user"),
})