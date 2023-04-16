import { config } from 'dotenv';

config();

export default () => ({
  app: {
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    port: parseInt(process.env.APP_PORT),
  },
  db: {
    url: process.env.DATABASE_URL,
  },
});
