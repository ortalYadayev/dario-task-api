import { FastifyInstance } from 'fastify';
import {Static, Type} from '@sinclair/typebox';
import { User } from '../entities/user.entity';
import { SendLog } from "../entities/sendLog.entity";
import { Number } from "../entities/number.entity";

const PayloadSchema = Type.Object({
  userId: Type.Number(),
  numberId: Type.Number(),
  message: Type.String({ minLength: 2, maxLength: 255 }),
});

type PayloadType = Static<typeof PayloadSchema>;

const storeLog = (app: FastifyInstance): void => {
  app.route<{ Body: PayloadType }>({
    url: '/logs',
    method: 'POST',
    schema: { body: PayloadSchema },
    handler: async (request, reply) => {
      const payload = request.body;

      try {
        const user = await User.findOne({
          where: {
            id: payload.userId
          },
        }) as User;

        const number = await Number.findOne({
          where: {
            id: payload.numberId
          },
        }) as Number;

        const log = new SendLog();
        log.user = user;
        log.num = number;
        log.log_message = payload.message;
        log.log_success = true;

        await log.save();

        return reply.code(201).send();
      } catch (error) {

        const log = new SendLog();
        log.log_message = payload.message;
        log.log_success = false;

        await log.save();

        return reply.code(422).send();
      }
    }
  });
};

export default storeLog;
