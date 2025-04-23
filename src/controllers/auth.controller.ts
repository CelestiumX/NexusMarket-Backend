import { Request, Response, NextFunction } from 'express';
import { LoginDto } from '../dto/auth/login.dto';
import { RegisterDto } from '../dto/auth/register.dto';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto = req.body as RegisterDto;
      const result = await this.authService.register(registerDto);
      
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto = req.body as LoginDto;
      const result = await this.authService.login(loginDto);
      
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Método para obtener el perfil del usuario autenticado
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // El middleware de autenticación ya adjuntó el usuario a la solicitud
      res.status(200).json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  }
}