"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controllers/auth.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const login_dto_1 = require("../../dto/auth/login.dto");
const register_dto_1 = require("../../dto/auth/register.dto");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
router.post('/register', (0, validation_middleware_1.validationMiddleware)(register_dto_1.RegisterDto), authController.register.bind(authController));
router.post('/login', (0, validation_middleware_1.validationMiddleware)(login_dto_1.LoginDto), authController.login.bind(authController));
router.get('/profile', auth_middleware_1.authMiddleware, authController.getProfile.bind(authController));
exports.default = router;
//# sourceMappingURL=auth.routes.js.map