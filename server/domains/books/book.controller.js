// Importing winston logger
import log from '../../config/winston';

// Importando el modelo
import bookModel from './book.model';

// Importando Httperrors

// Actions methods
// GET "/project"
const showDashboard = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /book/showDashboard ⚠️');
};

// GET "/project/add"
const add = (req, res) => {
  res.render('book/addbook');
};

// POST "/project/add"
const addPost = async (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add book');
    // Se desestructuran los datos de validación
    const { value: book } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('book/addbook', { book, errorModel });
  }
  // En caso de que pase la validación
  // Se desestructura la información
  // de la peticion
  const { validData: book } = req;
  try {
    // Creando la instancia de un documento
    // con los valores de 'project'
    const savedbook = await bookModel.create(book);
    // Se informa al cliente que se guardo el proyecto
    log.info(`Se carga proyecto ${savedbook}`);
    // Se registra en el log el redireccionamiento
    log.info('Se redirecciona el sistema a /book');
    // Se redirecciona el sistema a la ruta '/project'
    return res.redirect('/book/showDashboard');
  } catch (error) {
    log.error(
      'ln 53 project.controller: Error al guardar proyecto en la base de datos',
    );
    return res.status(500).json(error);
  }
};

// Controlador user
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
};
