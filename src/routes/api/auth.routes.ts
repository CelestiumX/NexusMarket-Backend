import { Router } from 'express';
import { AuthController } from '../../controllers/auth.controller';
import { validationMiddleware } from '../../middlewares/validation.middleware';
import { LoginDto } from '../../dto/auth/login.dto';
import { RegisterDto } from '../../dto/auth/register.dto';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

/**
 * @route   POST /api/auth/register
 * @desc    Registrar un nuevo usuario
 * @access  Public
 */
router.post(
  '/register',
  validationMiddleware(RegisterDto),
  authController.register.bind(authController)
);

/**
 * @route   POST /api/auth/login
 * @desc    Iniciar sesión
 * @access  Public
 */
router.post(
  '/login',
  validationMiddleware(LoginDto),
  authController.login.bind(authController)
);

/**
 * @route   GET /api/auth/profile
 * @desc    Obtener el perfil del usuario autenticado
 * @access  Private
 */
router.get(
  '/profile',
  authMiddleware,
  authController.getProfile.bind(authController)
);

export default router;