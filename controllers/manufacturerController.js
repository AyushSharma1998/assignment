// controllers/manufacturerController.js
const { validationResult } = require('express-validator');
const Manufacturer = require('../models/Manufacturer');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

const manufacturerController = {
    getAllManufacturers: async (req, res) => {
        try {
            const manufacturers = await Manufacturer.findAll();
            return sendSuccessResponse(res, 200, 'Manufacturers retrieved successfully', manufacturers);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    getManufacturerById: async (req, res) => {
        try {
            const manufacturer = await Manufacturer.findByPk(req.params.id);
            if (!manufacturer) {
                return sendErrorResponse(res, 404, 'Manufacturer not found');
            }
            return sendSuccessResponse(res, 200, 'Manufacturer retrieved successfully', manufacturer);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    addManufacturer: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorResponse(res, 400, errors.array());
        }

        try {
            const manufacturer = await Manufacturer.create({
                name: req.body.name
            });
            return sendSuccessResponse(res, 201, 'Manufacturer added successfully', manufacturer);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    updateManufacturer: async (req, res) => {
        try {
            const manufacturer = await Manufacturer.findByPk(req.params.id);
            if (!manufacturer) {
                return sendErrorResponse(res, 404, 'Manufacturer not found');
            }
            await manufacturer.update(req.body);
            return sendSuccessResponse(res, 200, 'Manufacturer updated successfully', manufacturer);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    deleteManufacturer: async (req, res) => {
        try {
            const manufacturer = await Manufacturer.findByPk(req.params.id);
            if (!manufacturer) {
                return sendErrorResponse(res, 404, 'Manufacturer not found');
            }
            await manufacturer.destroy();
            return sendSuccessResponse(res, 200, 'Manufacturer deleted successfully');
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    }
};

module.exports = manufacturerController;
