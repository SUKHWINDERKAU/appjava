const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// List all items
router.get('/', async (req, res) => {
  const items = await Item.find().lean();
  res.render('list', { items });
});

// Show add item form
router.get('/add', (req, res) => {
  res.render('add');
});

// Handle add item
router.post('/add', async (req, res) => {
  const { name, description } = req.body;
  await new Item({ name, description }).save();
  res.redirect('/items');
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  const item = await Item.findById(req.params.id).lean();
  if (!item) return res.redirect('/items');
  res.render('edit', { item });
});

// Handle edit item
router.post('/edit/:id', async (req, res) => {
  const { name, description } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { name, description });
  res.redirect('/items');
});

// Handle delete item
router.post('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/items');
});

module.exports = router;
