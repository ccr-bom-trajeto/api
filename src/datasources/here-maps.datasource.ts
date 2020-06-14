import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'HereMaps',
  connector: 'rest',
  baseURL: '',
  crud: false,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://geocode.search.hereapi.com/v1/geocode',
        query: {
          q: '{q}',
          apiKey: process.env.HERE_MAPS_API_KEY
        },
        responsePath: '$.items[*].position',
      },
      functions: {
        geocode: ['q'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class HereMapsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'HereMaps';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.HereMaps', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
