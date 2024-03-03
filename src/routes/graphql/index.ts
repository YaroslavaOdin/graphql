import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { schema } from './schemas.js'
import depthLimit from 'graphql-depth-limit';
// import { Loaders } from './loaders.js';
// import { Context } from 'vm';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const errors = validate(schema, parse(req.body.query), [
        depthLimit(5),
      ]);

      if (errors.length) {
        return { data: null, errors: errors };
      }

      //const contextValue: Context = { prisma, ...Loaders(prisma) }

      return graphql({
        schema: schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma },
      });
    },
  });
};

export default plugin;
