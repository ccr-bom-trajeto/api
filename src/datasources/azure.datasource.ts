import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Azure',
  connector: 'mongodb',
  url: 'mongodb://banco-api-bom-trajeto:sMdqILkSDEXr5rh7HrF6Gc1jtIDyHMwyHC6G6ZRB1CsLE1z1xX4rALRUYuwsKje9hC2JHkwq6aTSQcnCtOFDvw%3D%3D@banco-api-bom-trajeto.documents.azure.com:10255/api?ssl=true',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class AzureDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'Azure';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Azure', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
