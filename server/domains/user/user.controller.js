// importing Logs
import log from '../../config/winston';
import userModel from './user.model';
// importing model
import User from './user.model';
// Action Methods

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
    const user = await User.create(userFormData);
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
  res.render('user/searchuser', { title: 'user | Search' });
};

// GET "/user/search"
const resultpost = async (req, res) => {
  try {
    console.log(req.body);
    const searchTerm = req.body.name;
    const user = await userModel
      .find({
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { code: new RegExp(searchTerm, 'i') },
          { grade: new RegExp(searchTerm, 'i') },
          { section: new RegExp(searchTerm, 'i') },
        ],
      })
      .lean()
      .exec();
    res.render('user/searchuser', {
      title: 'user | Found',
      name: searchTerm,
      value: searchTerm,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda de usuarios');
  }
};
export default {
  login,
  logout,
  register,
  registerPost,
  search,
  resultpost,
};
