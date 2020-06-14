import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Restaurants, RestaurantsRelations, ParkingLots} from '../models';
import {AzureDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ParkingLotsRepository} from './parking-lots.repository';

export class RestaurantsRepository extends DefaultCrudRepository<
  Restaurants,
  typeof Restaurants.prototype._id,
  RestaurantsRelations
> {

  public readonly parkingLots: HasOneRepositoryFactory<ParkingLots, typeof Restaurants.prototype._id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('ParkingLotsRepository') protected parkingLotsRepositoryGetter: Getter<ParkingLotsRepository>,
  ) {
    super(Restaurants, dataSource);
    this.parkingLots = this.createHasOneRepositoryFactoryFor('parkingLots', parkingLotsRepositoryGetter);
    this.registerInclusionResolver('parkingLots', this.parkingLots.inclusionResolver);
  }
}
