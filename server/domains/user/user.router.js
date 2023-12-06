// Importando el Router de Express
import { Router } from 'express';

// Importando el controlador
import userController from './user.controller';

// Importando el validaacion usuario
import userValidator from './user.validator';

// Importando middlware de autenticacion passport
// de estrategia local

import { authLocal } from '../../services/auth.services';

// Importando el factory de validación
import ValidateFactory from '../../services/validateFactory';

// Creando una instancia del enrutador
const router = new Router();

// Enrutamos
// GET '/user/Dashboard
router.get(['/', '/dashboard'], userController.showDashboard);
// GET '/user/login
router.get('/login', userController.login);

// GET '/user/logout
router.get('/logout', userController.logout);

// GET '/user/register
router.get('/register', userController.register);

// POST '/user/register'
router.post(
  '/register',
  ValidateFactory(userValidator.signUp),
  userController.registerPost,
);

// GET "/user/search"
router.get('/search', userController.search);

// POST "/user/search"
router.post('/search', userController.resultpost);

// GET "/project/edit/:id"
router.get('/edit/:id', userController.edit);

// PUT "/user/edit/:id"
router.put(
  '/edit/:id',
  ValidateFactory({
    schema: userValidator.signUp.schema,
    getObject: userValidator.signUp.getObject,
  }),
  userController.editPut,
);

// DELETE "/user/:id"
router.delete('/:id', userController.deleteUser);

// GET 'user/confirm/<token>'
router.get(
  '/confirm/:token',
  ValidateFactory(userValidator.token),
  userController.confirm,
);

// POST user/login
router.post('/login', authLocal);

// Exporto este tramo de ruta
export default router;
