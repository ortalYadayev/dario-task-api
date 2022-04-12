import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyAuth from 'fastify-auth';
import fastifyCors from 'fastify-cors';
import fastifyStatic from 'fastify-static';
import process from 'process';
import * as dotenv from 'dotenv';
import path from 'path';
import storeLog from './routes/storeLog';
import login from './routes/login';

const createFastifyInstance = async (): Promise<FastifyInstance> => {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  const app = fastify();

  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      reply.status(422).send(error.validation);
    }
  });

  app.register(fastifyCompress);
  app.register(fastifyAuth);
  app.register(fastifyCors, {
    origin: process.env.USER_APP_URL,
    methods: '*',
    allowedHeaders: '*',
  });
  app.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/storage/',
  });

  storeLog(app);
  login(app);

  return app;
};

export default createFastifyInstance;
