import { RESTDataSource } from 'apollo-datasource-rest';

export class CountryAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://restcountries.eu/';
  }

  protected async getCountries() {
    return this.get('rest/v2/all', {
      // 12hours = 60 * 60 * 12
      cacheOptions: { ttl: 43200 }
    });
  }

  protected async getCountriesByName(name: string) {
    return this.get(`rest/v2/name/${name}`);
  }
}
