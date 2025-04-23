"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma_1 = require("../config/prisma");
const apiError_1 = require("../utils/apiError");
const env_1 = require("../config/env");
class AuthService {
    prisma;
    constructor() {
        this.prisma = new prisma_1.PrismaService();
    }
    async register(registerDto) {
        const existingEmail = await this.prisma.client.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existingEmail) {
            throw apiError_1.ApiError.conflict('Este email ya está registrado');
        }
        const existingUsername = await this.prisma.client.user.findUnique({
            where: { username: registerDto.username },
        });
        if (existingUsername) {
            throw apiError_1.ApiError.conflict('Este nombre de usuario ya está en uso');
        }
        if (registerDto.walletAddress) {
            const existingWallet = await this.prisma.client.user.findUnique({
                where: { walletAddress: registerDto.walletAddress },
            });
            if (existingWallet) {
                throw apiError_1.ApiError.conflict('Esta dirección de wallet ya está vinculada a otra cuenta');
            }
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.client.user.create({
            data: {
                username: registerDto.username,
                email: registerDto.email,
                password: hashedPassword,
                walletAddress: registerDto.walletAddress,
            },
            select: {
                id: true,
                username: true,
                email: true,
                walletAddress: true,
                role: true,
            },
        });
        const token = this.generateToken(user);
        return { user, token };
    }
    async login(loginDto) {
        const user = await this.prisma.client.user.findUnique({
            where: { email: loginDto.email },
            include: {
                seller: {
                    select: {
                        id: true,
                        storeName: true,
                        verified: true,
                        reputationScore: true,
                    },
                },
            },
        });
        if (!user) {
            throw apiError_1.ApiError.unauthorized('Credenciales inválidas');
        }
        if (user.status !== 'ACTIVE') {
            throw apiError_1.ApiError.forbidden('Esta cuenta ha sido suspendida');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw apiError_1.ApiError.unauthorized('Credenciales inválidas');
        }
        const { password, ...userWithoutPassword } = user;
        const token = this.generateToken(userWithoutPassword);
        return { user: userWithoutPassword, token };
    }
    generateToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
        const secret = env_1.default.JWT_SECRET;
        const options = {
            expiresIn: parseInt(env_1.default.JWT_EXPIRES_IN, 10),
        };
        return jwt.sign(payload, secret, options);
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map