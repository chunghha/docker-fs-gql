import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { untilDestroyed } from 'ngx-take-until-destroy';

interface Country {
  name: string;
  capital?: string;
  flag?: string;
  subregion?: string;
  timezones?: string[];
}

interface Response {
  countries: Country[]
}

@Component({
  selector: 'docker-fs-gql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked, OnDestroy, OnInit {

  response: Response;
  loading = true;

  displayedColumns = ['name', 'capital', 'subregion'];
  dataSource: MatTableDataSource<Country>;
  length = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            countries {
              name
              capital
              flag
              subregion
              timezones
            }
          }
        `,
      })
      .valueChanges.pipe(untilDestroyed(this)).subscribe(res => {
        this.response = <Response>res.data;
        this.dataSource = new MatTableDataSource<Country>(this.response.countries);
        this.length = this.response.countries.length;
        this.loading = false;
      });
  }

  ngAfterViewChecked() {
    if (this.dataSource && this.dataSource.paginator === undefined) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy() {}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
