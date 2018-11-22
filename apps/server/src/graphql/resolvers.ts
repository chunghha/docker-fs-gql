import { IResolvers } from 'graphql-tools';

export const resolvers: IResolvers = {
  Query: {
    // passing _ and __  is silly to make this code work
    countries: async (_, __, { dataSources: { countryAPI } }) => {
      return countryAPI.getCountries();
    }
  }
};
