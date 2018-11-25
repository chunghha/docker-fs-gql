import { Injectable } from '@angular/core';

import { Apollo, QueryRef } from 'apollo-angular';
import { R } from 'apollo-angular/types';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly G7_MEMBERS = [
    'CAN',
    'GBR',
    'GER',
    'FRA',
    'ITA',
    'JPN',
    'USA'
  ];
  private readonly G20_MEMBERS = [
    'ARG',
    'AUS',
    'BRA',
    'CAN',
    'CHN',
    'FRA',
    'GBR',
    'GER',
    'INA',
    'IND',
    'ITA',
    'JPN',
    'KOR',
    'KSA',
    'MEX',
    'RSA',
    'RUS',
    'TUR',
    'USA'
  ];

  constructor(private apollo: Apollo) {}

  getQueryRef(): QueryRef<{}, R> {
    return this.apollo.watchQuery({
      query: gql`
        {
          countries {
            name
            capital
            cioc
            flag
            population
            subregion
            timezones
          }
        }
      `
    });
  }

  isG7(cioc: string): boolean {
    return this.G7_MEMBERS.indexOf(cioc) > -1 ? true : false;
  }

  isG20(cioc: string): boolean {
    return this.G20_MEMBERS.indexOf(cioc) > -1 ? true : false;
  }
}
