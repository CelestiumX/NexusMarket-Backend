"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    authService;
    constructor() {
        this.authService = new auth_service_1.AuthService();
    }
    async register(req, res, next) {
        try {
            const registerDto = req.body;
            const result = await this.authService.register(registerDto);
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const loginDto = req.body;
            const result = await this.authService.login(loginDto);
            res.status(200).json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getProfile(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                data: req.user,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map