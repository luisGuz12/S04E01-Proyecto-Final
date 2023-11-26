import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'ITGAM',
    author: 'Luis Alfonso & Joshua Barajas',
  });
});

// Pripio

export default router;
