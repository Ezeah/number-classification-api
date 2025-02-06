import express from 'express';
import cors from 'cors';
import numberRoutes from './routes/numberRoutes.mjs';

/**
 * Initialize Express application.
 */
const app = express();

/**
 * Set the port from environment variables or default to 3000.
 */
const PORT = process.env.PORT || 3000;

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Use the number routes as middleware.
 */
app.use('/api', numberRoutes);

/**
 * Start the server and listen on the specified port.
 */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});