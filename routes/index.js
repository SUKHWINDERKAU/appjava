const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', { title: 'Home Page' }));
router.get('/features', (req, res) => res.render('features'));

module.exports = router;
