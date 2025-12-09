import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './infrastructure/db/data-source-cli.js';

dotenv.config();

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected!');
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch((err) => console.error('❌ Error during Data Source initialization:', err));

app.get('/health-check', (req, res) => {
  res.send('Ok');
});
