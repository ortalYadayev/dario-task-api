import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { User } from '../entities/user.entity';

const PayloadSchema = Type.Object({
  firstName: Type.String({ minLength: 2, maxLength: 50 }),
  username: Type.RegEx(/^[\w]{2,20}$/),
  lastName: Type.String({ minLength: 2, maxLength: 50 }),
  email: Type.String({ format: 'email', maxLength: 255 }),
  password: Type.String({ minLength: 8, maxLength: 255 }),
});

type PayloadType = Static<typeof PayloadSchema>;

const register = (app: FastifyInstance): void => {
  app.route<{ Body: PayloadType }>({
    url: '/register',
    method: 'POST',
    schema: { body: PayloadSchema },
    handler: async (request, reply) => {
      const payload = request.body;

      const user = new User();
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.email = payload.email;
      user.username = payload.username;
      user.verifiedAt = null;

      await user.save();

      return reply.code(201).send();
    },
  });
};

export default register;
