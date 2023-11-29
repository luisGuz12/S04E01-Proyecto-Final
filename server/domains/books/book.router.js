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
    schema: bookValidator.bookSchema,
    getObject: bookValidator.getbook,
  }),
  bookController.addPost,
);

// GET "/project/edit/:id"
router.get('/edit/:id', bookController.edit);

// PUT "/book/edit/:id"
router.put(
  '/edit/:id',
  ValidateFactory({
    schema: bookValidator.bookSchema,
    getObject: bookValidator.getbook,
  }),
  bookController.editPut,
);

// Exporto este tramo de ruta
export default router;
