import { ApolloServer } from 'apollo-server-fastify';

import { CountryAPI } from './datasources/country-datasource';
import schema from './graphql';

const app = require('fastify')({ logger: true });

const PORT = process.env.PORT || 3333;

const server = new ApolloServer({
  dataSources: () => ({
    countryAPI: new CountryAPI()
  }),
  schema
});

app.register(server.createHandler({ cors: true }));
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
