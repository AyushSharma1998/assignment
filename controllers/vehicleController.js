// controllers/vehicleController.js
const { validationResult } = require("express-validator");
const Vehicle = require("../models/Vehicle");
const Manufacturer = require("../models/Manufacturer");
const Owner = require("../models/Owner");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

const vehicleController = {
  getAllVehicles: async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll();
      return sendSuccessResponse(res, 200, 'Vehicles retrieved successfully', vehicles);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },

  getVehicleById: async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return sendErrorResponse(res, 404, 'Vehicle not found');
      }
      return sendSuccessResponse(res, 200, 'Vehicle retrieved successfully', vehicle);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },

  addVehicle: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return sendErrorResponse(res, 400, errors.array());
    }

    try {
      const vehicle = await Vehicle.create({
        model: req.body.model,
        year: req.body.year,
        name: req.body.name,
        manufacturerId:req.body.manufacturerId
      });
      return sendSuccessResponse(res, 201, 'Vehicle added successfully', vehicle);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },

  updateVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return sendErrorResponse(res, 404, 'Vehicle not found');
      }
      await vehicle.update(req.body);
      return sendSuccessResponse(res, 200, 'Vehicle updated successfully', vehicle);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },

  deleteVehicle: async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) {
        return sendErrorResponse(res, 404, 'Vehicle not found');
      }
      await vehicle.destroy();
      return sendSuccessResponse(res, 200, 'Vehicle deleted successfully');
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },
  getAllVehiclesWithManufacturer: async (req, res) => {
    try {
        // console.log("1");
      const vehicles = await Vehicle.findAll({
        include: [
          {
            model: Manufacturer, // Include the Manufacturer model
            attributes: ["name"], // Specify the attributes you want to include
          },
        ],
      });
    //   console.log("2");
      return sendSuccessResponse(res, 200, 'Vehicles with manufacturer retrieved successfully', vehicles);
    } catch (error) {
      console.error(error);
      return sendErrorResponse(res, 500, 'Internal server error');
    }
  },
  fetchOwnersWithVehiclesAndManufacturers: async (req, res) => {
      try {
          const owners = await Owner.findAll({
              include: [
                  {
                      model: Vehicle,
                      include: [
                          {
                              model: Manufacturer,
                              attributes: ['name'] 
                          }
                      ],
                      attributes: ['name'] 
                  }
              ]
          });
  
          const response = owners.map(owner => {
              return {
                  owner: owner,
                  vehicles: owner.Vehicles 
              };
          });
  
          return sendSuccessResponse(res, 200, 'Owners with vehicles and manufacturers retrieved successfully', response);
      } catch (error) {
          console.error(error);
          return sendErrorResponse(res, 500, 'Internal server error');
      }
  }
  
};

module.exports = vehicleController;
