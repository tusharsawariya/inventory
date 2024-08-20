import express from 'express';
import dotenv from 'dotenv';
import UserRouter from "./Router/user.router.js";
import bodyParser from 'body-parser';
import Item from './Router/item.router.js';
import sequelize from './DB/dbConfig.js';
// Load environment variables from .env file
// dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/user', UserRouter);
app.use('/item',Item)
// Start server

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });
app.listen(3000, () => {
    console.log(`Server started on port `);
});
