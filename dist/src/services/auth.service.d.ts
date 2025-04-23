import { LoginDto } from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';
export declare class AuthService {
    private prisma;
    constructor();
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            username: string;
            walletAddress: string | null;
            role: import(".prisma/client").$Enums.Role;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            seller: {
                id: string;
                storeName: string;
                verified: boolean;
                reputationScore: number;
            } | null;
            id: string;
            email: string;
            username: string;
            walletAddress: string | null;
            profileImageUrl: string | null;
            bio: string | null;
            role: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    private generateToken;
}
