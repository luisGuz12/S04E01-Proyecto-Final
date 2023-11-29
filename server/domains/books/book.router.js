// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import bookController from './book.controller';

// Importando factory de validación
import ValidateFactory from '../../services/validateFactory';
// Importando el validador de proyectos
import bookValidator from './book.validator';

// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET "/book"
router.get('/', bookController.showDashboard);

// GET "/book/add"
router.get('/add', bookController.add);

// POST "/book/add"
router.post(
  '/add',
  ValidateFactory({
    schema: bookValidator.projectSchema,
    getObject: bookValidator.getProject,
  }),
  bookController.addPost,
);

// Exporto este tramo de ruta
export default router;
