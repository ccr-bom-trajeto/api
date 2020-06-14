import {DefaultCrudRepository} from '@loopback/repository';
import {ShoppingCart, ShoppingCartRelations} from '../models';
import {AzureDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ShoppingCartRepository extends DefaultCrudRepository<
  ShoppingCart,
  typeof ShoppingCart.prototype._id,
  ShoppingCartRelations
> {
  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource,
  ) {
    super(ShoppingCart, dataSource);
  }
}
