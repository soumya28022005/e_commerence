import {z} from "zod";

export const productSchema = z.object({
    name: z.string().trim().min(2).max(100),
    quantity: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    description: z.string().trim().min(1).max(200),
    category: z.string().trim().min(2).max(100),
    status: z.enum(["available", "out of stock", "discontinued"]).default("available"),
    rating: z.coerce.number().min(0).max(5).default(0),
    reviews: z.coerce.number().default(0)
});