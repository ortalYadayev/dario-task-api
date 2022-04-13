import { FastifyInstance } from 'fastify';
import { User } from "../entities/user.entity";

const getUsers = (app: FastifyInstance): void => {
  app.route({
    url: '/api/users',
    method: 'GET',
    handler: async (request, reply) => {
      const users = await User.find();
      return reply.code(200).send(users);
    },
  });
};

export default getUsers;
