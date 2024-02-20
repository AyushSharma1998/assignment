// routes/vehicleRoutes.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET all vehicles with manufacturer details
router.get('/vehicles/withManufacturer', vehicleController.getAllVehiclesWithManufacturer);

// GET all vehicles with manufacturer and owner details
router.get('/vehicles/withManufacturerAndOwner', vehicleController.fetchOwnersWithVehiclesAndManufacturers);

// GET all vehicles
router.get('/vehicles', vehicleController.getAllVehicles);

// GET vehicle by ID
router.get('/vehicles/:id', vehicleController.getVehicleById);

// POST add new vehicle
router.post('/vehicles', [
    body('model').notEmpty().trim().escape(),
    body('year').isInt({ min: 1900, max: new Date().getFullYear() })
], vehicleController.addVehicle);

// PUT update vehicle by ID
router.put('/vehicles/:id', vehicleController.updateVehicle);

// DELETE vehicle by ID
router.delete('/vehicles/:id', vehicleController.deleteVehicle);



module.exports = router;

