import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { User } from '../entities/user.entity';

const PayloadSchema = Type.Object({
  email: Type.String({ format: 'email', maxLength: 255 }),
  password: Type.String({ minLength: 8, maxLength: 255 }),
});
type PayloadType = Static<typeof PayloadSchema>;

const login = (app: FastifyInstance): void => {
  app.route<{ Body: PayloadType }>({
    url: '/login',
    method: 'POST',
    schema: { body: PayloadSchema },
    handler: async (request, reply) => {
      const payload = request.body;

      const user = await User.findOne({
        where: { email: payload.email },
      });

      return reply.code(200).send({
        user,
      });
    },
  });
};

export default login;
