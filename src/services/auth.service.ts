import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../config/prisma';
import { ApiError } from '../utils/apiError';
import { LoginDto } from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';
import env from '../config/env';

export class AuthService {
    private prisma: PrismaService;

    constructor() {
        this.prisma = new PrismaService();
    }

    async register(registerDto: RegisterDto) {
        // Verificar si el email ya está en uso
        const existingEmail = await this.prisma.client.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingEmail) {
            throw ApiError.conflict('Este email ya está registrado');
        }

        // Verificar si el nombre de usuario ya está en uso
        const existingUsername = await this.prisma.client.user.findUnique({
            where: { username: registerDto.username },
        });

        if (existingUsername) {
            throw ApiError.conflict('Este nombre de usuario ya está en uso');
        }

        // Verificar si la wallet ya está en uso (si se proporciona)
        if (registerDto.walletAddress) {
            const existingWallet = await this.prisma.client.user.findUnique({
                where: { walletAddress: registerDto.walletAddress },
            });

            if (existingWallet) {
                throw ApiError.conflict('Esta dirección de wallet ya está vinculada a otra cuenta');
            }
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // Crear el usuario
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

        // Generar token JWT
        const token = this.generateToken(user);

        return { user, token };
    }

    async login(loginDto: LoginDto) {
        // Buscar el usuario por email
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

        // Verificar si el usuario existe
        if (!user) {
            throw ApiError.unauthorized('Credenciales inválidas');
        }

        // Verificar si el usuario está activo
        if (user.status !== 'ACTIVE') {
            throw ApiError.forbidden('Esta cuenta ha sido suspendida');
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw ApiError.unauthorized('Credenciales inválidas');
        }

        // Extraer la contraseña del objeto de usuario antes de devolverlo
        const { password, ...userWithoutPassword } = user;

        // Generar token JWT
        const token = this.generateToken(userWithoutPassword);

        return { user: userWithoutPassword, token };
    }

    // Modifica esta función en auth.service.ts
    private generateToken(user: any): string {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    
        const secret = env.JWT_SECRET as string;
        const options: jwt.SignOptions = {
            expiresIn: parseInt(env.JWT_EXPIRES_IN, 10), // convierte a número
        };
    
        return jwt.sign(payload, secret, options);
    }
    

}