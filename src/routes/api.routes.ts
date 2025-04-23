import { Router } from 'express';
import authRoutes from './api/auth.routes';
// Importa otras rutas aquí cuando las crees

const router = Router();

// Rutas de autenticación
router.use('/auth', authRoutes);

// Agrega otras rutas aquí cuando las crees
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);
// router.use('/sellers', sellerRoutes);
// router.use('/orders', orderRoutes);

export default router;