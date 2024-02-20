// routes/manufacturerRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

// Validation middleware for adding a manufacturer
const validateManufacturer = [
    body('name').notEmpty().withMessage('Name is required').trim().escape()
];

const { getAllManufacturers, getManufacturerById, addManufacturer, updateManufacturer, deleteManufacturer } = require('../controllers/manufacturerController');

// GET all manufacturers
router.get('/manufacturers', getAllManufacturers);

// GET manufacturer by ID
router.get('/manufacturers/:id', getManufacturerById);

// POST add new manufacturer
router.post('/manufacturers',validateManufacturer,  addManufacturer);

// PUT update manufacturer by ID
router.put('/manufacturers/:id', updateManufacturer);

// DELETE manufacturer by ID
router.delete('/manufacturers/:id', deleteManufacturer);

module.exports = router;
