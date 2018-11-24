import * as fs from 'fs';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
export const typeDefs: string = fs.readFileSync(
  './apps/server/src/graphql/schema.gql',
  'utf-8'
);
