import fastify, { FastifyInstance } from 'fastify';
import fastifyCors from 'fastify-cors';
import process from 'process';
import * as dotenv from 'dotenv';
import path from 'path';
import log from './routes/log';
import getCountries from './routes/getCountries';
import getUsers from './routes/getUsers';

const createFastifyInstance = async (): Promise<FastifyInstance> => {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  const app = fastify();

  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      reply.status(422).send(error.validation);
    }
  });

  app.register(fastifyCors, {
    origin: process.env.VITE_APP_URL,
    methods: '*',
    allowedHeaders: '*',
  });

  log(app);
  getCountries(app);
  getUsers(app);

  return app;
};

export default createFastifyInstance;
