// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './about.controller';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/about
router.get('/', userController.about);

// Exporto este tramo de ruta
export default router;
