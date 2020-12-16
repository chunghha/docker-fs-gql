import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  VERSION,
  ViewChild
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Logger } from '@nsalaun/ng-logger';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { CountryService } from './country.service';

const { version: appVersion } = require('../../../../package.json');
interface Country {
  name: string;
  capital?: string;
  cioc?: string;
  flag?: string;
  isG7: boolean;
  isG20: boolean;
  subregion?: string;
  timezones?: string[];
}

interface Response {
  countries: Country[];
}

@Component({
  // animations: [fadeInUpBigOnEnterAnimation(), fadeOutOnLeaveAnimation()],
  selector: 'docker-fs-gql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnDestroy, OnInit {
  response: Response;
  loading = true;

  displayedColumns = ['name', 'capital', 'subregion', 'population', 'cioc'];
  dataSource: MatTableDataSource<Country>;
  length = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private logger: Logger, private countryService: CountryService) {}

  ngOnInit() {
    this.logger.log(`App(NG) Version: ${appVersion}(${VERSION.full})`);

    this.countryService
      .getQueryRef()
      .valueChanges.pipe(untilDestroyed(this))
      .subscribe(res => {
        this.response = <Response>res.data;
        this.dataSource = new MatTableDataSource<Country>(
          this.response.countries
        );
        this.setG7and20(this.dataSource);
        this.length = this.response.countries.length;
        this.loading = false;
      });
  }

  ngAfterViewChecked() {
    if (this.dataSource && this.dataSource.paginator === undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private setG7and20(dataSource: MatTableDataSource<Country>) {
    dataSource.data.forEach(country => {
      country.isG7 = this.countryService.isG7(country.cioc);
      country.isG20 = this.countryService.isG20(country.cioc);
    });
  }
}
