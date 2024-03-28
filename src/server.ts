import { app } from './app';
import { env } from './env';

const server = app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running at http://localhost:${env.PORT}`);
  });
