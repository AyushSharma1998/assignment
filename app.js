const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const vehicleRoutes = require('./routes/vehicleRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const sequelize = require('./database/connection');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const startServer = require('./startServer');
const app = express();
app.use(helmet());  // adding helmet for neccessary response headers
app.use(cors({
    origin:'http://localhost:3000'
})); 

// Parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/v1', vehicleRoutes);
app.use('/api/v1', manufacturerRoutes);
app.use('/api/v1', ownerRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Use the middleware


startServer(app, sequelize)





