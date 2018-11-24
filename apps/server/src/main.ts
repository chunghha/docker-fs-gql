import { ApolloServer } from 'apollo-server-koa';

import Koa from 'koa';

import { CountryAPI } from './datasources/country-datasource';
import schema from './graphql';

const app = new Koa();

const PORT = process.env.PORT || 3333;

const server = new ApolloServer({
  dataSources: () => ({
    countryAPI: new CountryAPI()
  }),
  schema
});
server.applyMiddleware({ app, cors: true });

app.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
