import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { handleValidator } from "../middlewares/handleValidator.js";


const router = Router()

router.post('/register', registerValidator, handleValidator, register)
router.post('/login', loginValidator, login)
router.get('/profile', authRequired, profile)
router.post('/logout', logout)

export default router