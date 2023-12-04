// importing Logs
import log from '../../config/winston';
// importing modelimport userModel from './user.model';
import userModel from './user.model';
// Action Methods
// GET "/user"
const showDashboard = async (req, res) => {
  // Consultado todos los proyectos
  const user = await userModel.find({}).lean().exec();
  // Enviando los proyectos al cliente en JSON
  log.info('Se entrega dashboard de user');
  res.render('user/userViews', { user, title: 'Biblos | user' });
};
const addForm = (req, res) => {
  res.render('user/searchuser');
};
// Get '/user/login'
const login = (req, res) => {
  // Sirve el formulario de login
  log.info('Se entrega el formulario login');
  res.render('user/login', { title: 'Biblos | Login' });
};

// Get '/user/logout'
const logout = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION GET '/user/logout'🚧");
};

// Get '/user/register'
const register = (req, res) => {
  log.info('Se entrega formulario de registro');
  res.render('user/register', { title: 'Biblos | Register' });
};

// POST '/user/register'
const registerPost = async (req, res) => {
  const { validData: userFormData, errorData } = req;
  log.info('Se procesa formulario de registro');
  // Verificando si hay errores
  if (errorData) {
    return res.json(errorData);
  }
  // En caso de no haber errores, se crea al usuario
  try {
    // 1. Se crea una instancia del modelo User
    // mediante la función create del modelo
    const user = await userModel.create(userFormData);
    log.info(`Usuario creado: ${JSON.stringify(user)}`);
    req.flash('successMessage', ' Se ha creado su perfil');
    // 3. Se contesta al cliente con el usuario creado
    return res.status(200).json(user.toJSON());
  } catch (error) {
    log.error(error);
    req.flash('errorMessage', 'UPS, algo ha fallado');
    return res.json({
      message: error.message,
      name: error.name,
      errors: error.errors,
    });
  }
};

// GET "/user/search"
const search = async (req, res) => {
  res.render('user/searchuser', { title: 'User | Search' });
};

// GET "/user/search"
const resultpost = async (req, res) => {
  try {
    console.log(req.body.name);
    const searchTerm = req.body.name;
    const user = await userModel
      .find({
        $or: [
          { firstName: new RegExp(searchTerm, 'i') },
          { code: new RegExp(searchTerm, 'i') },
        ],
      })
      .lean()
      .exec();
    // res.json(user);
    res.render('user/searchuser', {
      title: 'user | Found',
      value: searchTerm,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda de usuarios');
  }
};

// GET "/user/edit/:id"
const edit = async (req, res) => {
  // Extrayendo el id por medio de los parametros de url
  const { id } = req.params;
  // Buscando en la base de datos
  try {
    log.info(`Se inicia la busqueda del usuario con el id: ${id}`);
    const user = await userModel.findOne({ _id: id }).lean().exec();
    if (user === null) {
      log.info(`No se encontro el usuario con el id: ${id}`);
      return res
        .status(404)
        .json({ fail: `No se encontro el usuario con el id: ${id}` });
    }
    // Se manda a renderizar la vista de edición
    // res.render('user/editView', user);
    log.info(`usuario encontrado con el id: ${id}`);
    return res.render('user/edituser', { user, title: 'user | Edit' });
  } catch (error) {
    log.error('Ocurre un error en: metodo "error" de user.controller');
    return res.status(500).json(error);
  }
};

// PUT "/user/edit/:id"
const editPut = async (req, res) => {
  const { id } = req.params;
  // Rescatando la info del formulario
  const { errorData: validationError } = req;
  // En caso de haber error
  // se le informa al cliente
  if (validationError) {
    log.info(`Error de validación del libro con id: ${id}`);
    // Se desestructuran los datos de validación
    const { value: user } = validationError;
    // Se extraen los campos que fallaron en la validación
    const errorModel = validationError.inner.reduce((prev, curr) => {
      // Creando una variable temporal para
      // evitar el error "no-param-reassing"
      const workingPrev = prev;
      workingPrev[`${curr.path}`] = curr.message;
      return workingPrev;
    }, {});
    return res.status(422).render('user/edituser', { user, errorModel });
  }
  // Si no hay error
  const user = await userModel.findOne({ _id: id });
  if (user === null) {
    log.info(`No se encontro el libro para actualizar con id: ${id}`);
    return res
      .status(404)
      .send(`No se encontro el libro para actualizar con id: ${id}`);
  }
  // En caso de encontrarse el documento se actualizan los datos
  const { validData: newuser } = req;
  user.firstName = newuser.firstName;
  user.lastname = newuser.description;
  user.code = newuser.autor;
  user.grade = newuser.grade;
  user.section = newuser.section;
  user.email = newuser.email;
  try {
    // Se salvan los cambios
    log.info(`Actualizando usuario con id: ${id}`);
    await user.save();
    // Generando mensaje flash
    req.flash('successMessage', ' Usuario editado con exito');
    return res.redirect(`/user/edituser/${id}`);
  } catch (error) {
    log.error(`Error al actualizar usuario con id: ${id}`);
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Usando el modelo para borrar el proyecto
  try {
    const result = await userModel.findByIdAndRemove(id);
    // Agregando mensaje flash
    req.flash('successMessage', ' usuario borrado con exito');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  showDashboard,
  login,
  logout,
  register,
  registerPost,
  search,
  resultpost,
  edit,
  editPut,
  deleteUser,
  addForm,
};
