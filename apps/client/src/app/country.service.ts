import { Injectable } from '@angular/core';

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

  constructor() {}

  isG7(cioc: string): boolean {
    return this.G7_MEMBERS.indexOf(cioc) > -1 ? true : false;
  }

  isG20(cioc: string): boolean {
    return this.G20_MEMBERS.indexOf(cioc) > -1 ? true : false;
  }
}
