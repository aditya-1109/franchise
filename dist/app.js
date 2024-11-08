"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const campaignRoutes_1 = __importDefault(require("./routes/campaignRoutes"));
const leadRoutes_1 = __importDefault(require("./routes/leadRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const config_1 = __importDefault(require("./config/config"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Swagger setup for API documentation
(0, swagger_1.setupSwagger)(app);
// Test the database connection and sync models
config_1.default.authenticate()
    .then(() => {
    console.log('Database connected...');
    return config_1.default.sync(); // Sync all defined models to the DB
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
// Define routes
app.use('/api/campaigns', campaignRoutes_1.default);
app.use('/api/leads', leadRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});
exports.default = app;
