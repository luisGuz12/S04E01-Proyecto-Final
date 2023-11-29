// Action Methods

// Get '/book/book'
const book = (req, res) => {
  res.render('book/addbook');
};

// Get '/project/projects'
const addform = (req, res) => {
  res.render('book/addbook');
};

export default {
  book,
  addform,
};
