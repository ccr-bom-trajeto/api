import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Business, BusinessRelations, Drivers} from '../models';
import {AzureDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {DriversRepository} from './drivers.repository';

export class BusinessRepository extends DefaultCrudRepository<
  Business,
  typeof Business.prototype._id,
  BusinessRelations
> {

  public readonly drivers: HasManyRepositoryFactory<Drivers, typeof Business.prototype._id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('DriversRepository') protected driversRepositoryGetter: Getter<DriversRepository>,
  ) {
    super(Business, dataSource);
    this.drivers = this.createHasManyRepositoryFactoryFor('drivers', driversRepositoryGetter,);
    this.registerInclusionResolver('drivers', this.drivers.inclusionResolver);
  }
}
