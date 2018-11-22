import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const schema: GraphQLSchema = makeExecutableSchema({
  resolvers,
  typeDefs
});

export default schema;
