import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Restaurants,
  ParkingLots,
} from '../models';
import {RestaurantsRepository} from '../repositories';

export class RestaurantsParkingLotsController {
  constructor(
    @repository(RestaurantsRepository) protected restaurantsRepository: RestaurantsRepository,
  ) { }

  @get('/restaurants/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Restaurants has one ParkingLots',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingLots),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ParkingLots>,
  ): Promise<ParkingLots> {
    return this.restaurantsRepository.parkingLots(id).get(filter);
  }

  @post('/restaurants/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Restaurants model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkingLots)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Restaurants.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {
            title: 'NewParkingLotsInRestaurants',
            exclude: ['_id'],
            optional: ['restaurantId']
          }),
        },
      },
    }) parkingLots: Omit<ParkingLots, '_id'>,
  ): Promise<ParkingLots> {
    return this.restaurantsRepository.parkingLots(id).create(parkingLots);
  }

  @patch('/restaurants/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Restaurants.ParkingLots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: Partial<ParkingLots>,
    @param.query.object('where', getWhereSchemaFor(ParkingLots)) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.restaurantsRepository.parkingLots(id).patch(parkingLots, where);
  }

  @del('/restaurants/{id}/parking-lots', {
    responses: {
      '200': {
        description: 'Restaurants.ParkingLots DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ParkingLots)) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.restaurantsRepository.parkingLots(id).delete(where);
  }
}
