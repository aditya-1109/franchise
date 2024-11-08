import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import campaignRoutes from './routes/campaignRoutes';
import leadRoutes from './routes/leadRoutes';
import userRoutes from './routes/userRoutes';
import sequelize from './config/config';
import { setupSwagger } from './swagger';

dotenv.config();

const app: Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Swagger setup for API documentation
setupSwagger(app);

// Test the database connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    return sequelize.sync(); // Sync all defined models to the DB
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

// Define routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Catch-all route for undefined endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
