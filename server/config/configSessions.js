// Importando manejo de sesiones
import ExpressSesion from 'express-session';
// Importando soporte para mensajes flash
import ConnectFlash from 'connect-flash';
// importando soporte para almacenamiento de sesiones
import MongoStore from 'connect-mongo';
// Importando la URL de la base de datos del sistema
import configKeys from './configKeys';

// Creando objeto de opcioness para el manejo de sesiones
const options = {
  secret: 'awesome',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: configKeys.MONGO_URL,
    // salva la sesion por 1 día
    ttl: 1 * 24 * 60 * 60,
  }),
};

// Exportando función registradora
export default (app) => {
  // Creando middleware
  const sessionMiddleware = ExpressSesion(options);
  // Registrando middlware
  app.use(sessionMiddleware);
  // registramos middleware de mensajes flash
  app.use(ConnectFlash);
  app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    res.locals.infoMessage = req.flash('infoMessage');
    // Esta servira para passport
    res.locals.passportError = req.flash('passportError');
    next();
  });
  // Retornando la app
  return app;
};
