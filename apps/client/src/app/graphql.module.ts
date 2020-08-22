import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { InMemoryCache } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink, Options } from 'apollo-angular/http';

export class GraphQLApiOptions {
  getGraphQLApiOptions(): Options {
    return {
      uri: '/graphql'
    };
  }
}

@NgModule({
  exports: [
    HttpClientModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create(new GraphQLApiOptions().getGraphQLApiOptions()),
      cache: new InMemoryCache()
    });
  }
}
