import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.get('/health-check', (req, res) => {
  res.send('Ok');
});

export { app };
