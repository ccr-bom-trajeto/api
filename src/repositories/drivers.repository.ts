import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Drivers, DriversRelations, Business} from '../models';
import {AzureDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BusinessRepository} from './business.repository';

export class DriversRepository extends DefaultCrudRepository<
  Drivers,
  typeof Drivers.prototype._id,
  DriversRelations
> {

  public readonly business: HasOneRepositoryFactory<Business, typeof Drivers.prototype._id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('BusinessRepository') protected businessRepositoryGetter: Getter<BusinessRepository>,
  ) {
    super(Drivers, dataSource);
    this.business = this.createHasOneRepositoryFactoryFor('business', businessRepositoryGetter);
    this.registerInclusionResolver('business', this.business.inclusionResolver);
  }
}
