import dotenv from 'dotenv';
import { AppDataSource } from './infrastructure/db/data-source-cli.js';
import { app } from './infrastructure/db/http/server.js';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database connected!');
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch((err) => console.error('❌ Error during Data Source initialization:', err));
