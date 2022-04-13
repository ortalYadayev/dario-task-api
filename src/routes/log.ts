import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { SendLog } from '../entities/sendLog.entity';

const ParamsSchema = {
  dateFrom: Type.RegEx(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/),
  dateTo: Type.RegEx(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/),
  countryId: Type.Union([Type.Number(), Type.Null()]),
  userId: Type.Union([Type.Number(), Type.Null()]),
};

type ParamsType = Static<typeof ParamsSchema>;

const log = (app: FastifyInstance): void => {
  app.route<{ Querystring: ParamsType }>({
    url: '/api/logs',
    method: 'GET',
    schema: { querystring: ParamsSchema },
    handler: async (request, reply) => {
      const { dateFrom, dateTo, countryId, userId } = request.query;

      const query = await SendLog.createQueryBuilder('send_log')
          .select('date(createdAt)', 'creationDate')
          .addSelect('sum(log_success)', 'successfullySent')
          .addSelect('sum(CASE WHEN log_success = 0 THEN 1 ELSE 0 END)', 'failed')
          .where('date(createdAt) BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });

      if(countryId) {
        query.andWhere('(select numbers.id from numbers where numbers.id = send_log.numId AND numbers.countryId = :countryId)', { countryId })
      }

      if(userId) {
        query.andWhere('userId = :userId', { userId })
      }

      const results = await  query
          .groupBy('creationDate')
          .execute();

      results.map(result => result.creationDate = result.creationDate.toLocaleDateString())

      return reply.code(200).send(results);
    },
  });
};

export default log;
