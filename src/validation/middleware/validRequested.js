import { signUpSchema } from "../schema/auth.schema.js";
import { productSchema} from "../schema/auth.schema.js";

export const validateSignUpRequest = (data) => {
    const validationresult = signUpSchema.safeParse(data);
    return validationresult;
}

export const productValidation = (data) => {
    const validationresult = productSchema.safeParse(data);
    return validationresult;
}