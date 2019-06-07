import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { NxModule } from '@nrwl/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    MatBadgeModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NxModule.forRoot(),
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: '/graphql'
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
