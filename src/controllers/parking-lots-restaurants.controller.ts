import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ParkingLots,
  Restaurants,
} from '../models';
import {ParkingLotsRepository} from '../repositories';

export class ParkingLotsRestaurantsController {
  constructor(
    @repository(ParkingLotsRepository)
    public parkingLotsRepository: ParkingLotsRepository,
  ) { }

  @get('/parking-lots/{id}/restaurants', {
    responses: {
      '200': {
        description: 'Restaurants belonging to ParkingLots',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Restaurants)},
          },
        },
      },
    },
  })
  async getRestaurants(
    @param.path.string('id') id: typeof ParkingLots.prototype._id,
  ): Promise<Restaurants> {
    return this.parkingLotsRepository.restaurant(id);
  }
}
