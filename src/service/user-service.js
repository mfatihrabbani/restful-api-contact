import { registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"

const register = (request) => {
    const user = validate(registerUserValidation, request)

    
}