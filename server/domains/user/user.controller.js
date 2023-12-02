// importing Logs
import log from '../../config/winston';
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
const registerPost = (req, res) => {
  const { validData, errorData } = req;
  log.info('Se procesa formulario de registro');
  res.json({
    validData,
    errorData,
  });
};

export default {
  login,
  logout,
  register,
  registerPost,
};
