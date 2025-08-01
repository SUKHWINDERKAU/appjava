const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// List all items (with optional search)
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } // case-insensitive match
      : {};

    const items = await Item.find(filter).lean();
    res.render('list', { items, searchQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching items');
  }
});

// Show add item form
router.get('/add', (req, res) => {
  res.render('add');
});

// Handle add item
router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    await new Item({ name, description }).save();
    res.redirect('/items');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding item');
  }
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    if (!item) return res.redirect('/items');
    res.render('edit', { item });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching item');
  }
});

// Handle edit item
router.post('/edit/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    await Item.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect('/items');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating item');
  }
});

// Handle delete item
router.post('/delete/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
