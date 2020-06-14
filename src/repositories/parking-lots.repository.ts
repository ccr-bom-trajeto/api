import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ParkingLots, ParkingLotsRelations, Restaurants} from '../models';
import {AzureDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RestaurantsRepository} from './restaurants.repository';

export class ParkingLotsRepository extends DefaultCrudRepository<
  ParkingLots,
  typeof ParkingLots.prototype._id,
  ParkingLotsRelations
> {

  public readonly restaurant: BelongsToAccessor<Restaurants, typeof ParkingLots.prototype._id>;

  constructor(
    @inject('datasources.Azure') dataSource: AzureDataSource, @repository.getter('RestaurantsRepository') protected restaurantsRepositoryGetter: Getter<RestaurantsRepository>,
  ) {
    super(ParkingLots, dataSource);
    this.restaurant = this.createBelongsToAccessorFor('restaurant', restaurantsRepositoryGetter,);
    this.registerInclusionResolver('restaurant', this.restaurant.inclusionResolver);
  }
}
