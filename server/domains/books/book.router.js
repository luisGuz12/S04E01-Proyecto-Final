// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './book.controller';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/project/projects
router.get(['/', '/dashboard'], userController.book);

// GET '/project/add-form
router.get(['/add-form', '/add'], userController.addform);

// Exporto este tramo de ruta
export default router;
