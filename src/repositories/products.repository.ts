import {DefaultCrudRepository} from '@loopback/repository';
import {Products, ProductsRelations} from '../models';
import {AzureDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype._id,
  ProductsRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(Products, dataSource);
  }
}
