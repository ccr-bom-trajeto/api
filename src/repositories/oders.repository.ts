import {DefaultCrudRepository} from '@loopback/repository';
import {Oders, OdersRelations} from '../models';
import {AzureDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OdersRepository extends DefaultCrudRepository<
  Oders,
  typeof Oders.prototype._id,
  OdersRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Oders, dataSource);
  }
}
