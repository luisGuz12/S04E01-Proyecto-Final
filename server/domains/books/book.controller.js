// Action Methods

// Get '/book/book'
const projects = (req, res) => {
  res.render('book/addbook');
};

// Get '/project/dashboard'
const dashboard = (req, res) => {
  res.send("🚧 UNDER CONSTRUCTION GET '/book'🚧");
};

// Get '/book/book'
const addform = (req, res) => {
  res.render('book/addbook');
};

// Get '/book/add'
const add = (req, res) => {
  res.render('book/addbook');
};

export default {
  projects,
  dashboard,
  addform,
  add,
};
