// Importing winston logger
import log from '../../config/winston';

// Actions methods
// GET "/book"
const showDashboard = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /book ⚠️');
};

// GET "/book/add"
const add = (req, res) => {
  res.render('book/addbook');
};

const addPost = (req, res) => {
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info('Se entrega al cliente error de validación de add book');
    // Se desestructuran los datos de validación
    const { value: project } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('book/addbook', { project, errorModel });
  }
  // En caso de que pase la validación
  // Se desestructura la información
  // de la peticion
  const { validData: project } = req;
  // Se contesta la información
  // del proyecto al cliente
  log.info('Se entrega al cliente información del proyecto cargado');
  return res.status(200).json(project);
};

// Controlador user
export default {
  // Action Methods
  showDashboard,
  add,
  addPost,
};
