// Actions methods
// GET "/"
// GET "/index"
const home = (req, res) => {
    const iconSet = ['⭐', '🧮', '📚'];
    const icon = iconSet[Math.floor(Math.random() * 3)];
    res.render('index', { title: 'Proyecto Biblioteca', icon });
  };
  
  // Controlador Home
  export default {
    home,
  };