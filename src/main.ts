import dotenv from 'dotenv';
import { AppDataSource } from './infrastructure/db/data-source-cli.js';
import { app } from './infrastructure/db/http/server.js';
import { seedRoles } from './infrastructure/db/seeds/role.seed.js';

dotenv.config();

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('📦 Database connected!');
    await seedRoles(dataSource);
    app.listen(3000, () => console.log('🚀 Server running on port 3000'));
  })
  .catch((err) => console.error('❌ Error during Data Source initialization:', err));
