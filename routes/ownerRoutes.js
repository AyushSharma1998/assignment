// routes/ownerRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { getAllOwners, getOwnerById, addOwner, updateOwner, deleteOwner, getAllOwnersWithVehicles } = require('../controllers/ownerController');
const Vehicle = require('../models/Vehicle'); // Import Vehicle model

// Validation middleware for adding an owner
const validateOwner = [
    body('name').notEmpty().withMessage('Name is required').trim().escape()
];


// GET all owners with vehicles
router.get('/owners/withVehicles', getAllOwnersWithVehicles);

// GET all owners
router.get('/owners', getAllOwners);

// GET owner by ID
router.get('/owners/:id', getOwnerById);

// POST add new owner with validation
router.post('/owners', validateOwner, addOwner);

// PUT update owner by ID
router.put('/owners/:id', updateOwner);

// DELETE owner by ID
router.delete('/owners/:id', deleteOwner);

module.exports = router;
