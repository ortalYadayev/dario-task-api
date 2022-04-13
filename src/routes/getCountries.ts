import { FastifyInstance } from 'fastify';
import { Country } from "../entities/country.entity";

const getCountries = (app: FastifyInstance): void => {
  app.route({
    url: '/api/countries',
    method: 'GET',
    handler: async (request, reply) => {
      const countries = await Country.find();
      return reply.code(200).send(countries);
    },
  });
};

export default getCountries;
