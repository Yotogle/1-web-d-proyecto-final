import { body } from "express-validator"

export const registerValidator = [
    // Debe existir y tener al menos 3 caracteres
    body("username")
    .notEmpty().withMessage("Nombre de usuario requerido")
    .isLength({min: 3}).withMessage("Username debe tener como minimo 3 caracteres"),

    //Email debe ser valido
    body("email")
    .notEmpty().withMessage("Email es requerido")
    .isEmail().withMessage("Debe ser un correo valido"),

    //password debe existir y tener al menos 6 caracteres
     body("password")
    .notEmpty().withMessage("Password es requerido")
    .isLength({min: 6}).withMessage("Username debe tener como minimo 6 caracteres"),


]

export const loginValidator = [
    //Email debe ser valido
    body("email")
    .notEmpty().withMessage("Email es requerido")
    .isEmail().withMessage("Debe ser un correo valido"),

    //password debe existir y tener al menos 6 caracteres
     body("password")
    .notEmpty().withMessage("Password es requerido")
    
]