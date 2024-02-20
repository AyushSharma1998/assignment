// controllers/ownerController.js
const { validationResult } = require('express-validator');
const Owner = require('../models/Owner');
const Manufacturer = require("../models/Manufacturer");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');
const Vehicle = require('../models/Vehicle');

const ownerController = {
    getAllOwners: async (req, res) => {
        try {
            const owners = await Owner.findAll();
            return sendSuccessResponse(res, 200, 'Owners retrieved successfully', owners);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    getOwnerById: async (req, res) => {
        try {
            const owner = await Owner.findByPk(req.params.id);
            if (!owner) {
                return sendErrorResponse(res, 404, 'Owner not found');
            }
            return sendSuccessResponse(res, 200, 'Owner retrieved successfully', owner);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    addOwner: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorResponse(res, 400, errors.array());
        }

        try {
            const owner = await Owner.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                vehicleId:req.body.vehicleId
            });
            return sendSuccessResponse(res, 201, 'Owner added successfully', owner);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    updateOwner: async (req, res) => {
        try {
            const owner = await Owner.findByPk(req.params.id);
            if (!owner) {
                return sendErrorResponse(res, 404, 'Owner not found');
            }
            await owner.update(req.body);
            return sendSuccessResponse(res, 200, 'Owner updated successfully', owner);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    deleteOwner: async (req, res) => {
        try {
            const owner = await Owner.findByPk(req.params.id);
            if (!owner) {
                return sendErrorResponse(res, 404, 'Owner not found');
            }
            await owner.destroy();
            return sendSuccessResponse(res, 200, 'Owner deleted successfully');
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },

    getAllOwnersWithVehicles: async (req, res) => {
        try {
            const owners = await Owner.findAll({
                include: [{
                    model: Vehicle,
                    attributes: ['model', 'year']
                }]
            });
            return sendSuccessResponse(res, 200, 'Owners with vehicles retrieved successfully', owners);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    },
    getOwnerWithVehicles: async (req, res) => {
        try {
            const ownerId = req.params.ownerId; 
    
            const owner = await Owner.findByPk(ownerId, {
                include: [Vehicle] 
            });
    
            if (!owner) {
                return sendErrorResponse(res, 404, 'Owner not found');
            }
    
            const response = {
                owner: owner,
                vehicles: owner.Vehicles
            };
    
            return sendSuccessResponse(res, 200, 'Owner and associated vehicles retrieved successfully', response);
        } catch (error) {
            console.error(error);
            return sendErrorResponse(res, 500, 'Internal server error');
        }
    }
};

module.exports = ownerController;
