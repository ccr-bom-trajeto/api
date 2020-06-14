import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef,
  HttpErrors, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {Restaurants} from '../models';
import {RestaurantsRepository} from '../repositories';
import {Geocoder} from '../services';

export class RestaurantsController {
  constructor(
    @repository(RestaurantsRepository)
    public restaurantsRepository: RestaurantsRepository,
    @inject('services.Geocoder') protected geoService: Geocoder
  ) {}

  @post('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurants model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurants)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurants, {
            title: 'NewRestaurants',
            exclude: ['_id'],
          }),
        },
      },
    })
    restaurants: Omit<Restaurants, '_id'>,
  ): Promise<Restaurants> {
    if (restaurants.address) {
      const geo = await this.geoService.geocode(restaurants.address);
      if (!geo[0]) {
        // address not found
        throw new HttpErrors.BadRequest(
          `Address not found: ${restaurants.location}`,
        );
      }
      restaurants.location = `${geo[0].lat},${geo[0].lng}`;
    }
    return this.restaurantsRepository.create(restaurants);
  }

  @get('/restaurants/count', {
    responses: {
      '200': {
        description: 'Restaurants model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Restaurants) where?: Where<Restaurants>,
  ): Promise<Count> {
    return this.restaurantsRepository.count(where);
  }

  @get('/restaurants', {
    responses: {
      '200': {
        description: 'Array of Restaurants model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Restaurants, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Restaurants) filter?: Filter<Restaurants>,
  ): Promise<Restaurants[]> {
    return this.restaurantsRepository.find(filter);
  }

  @patch('/restaurants', {
    responses: {
      '200': {
        description: 'Restaurants PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurants, {partial: true}),
        },
      },
    })
    restaurants: Restaurants,
    @param.where(Restaurants) where?: Where<Restaurants>,
  ): Promise<Count> {
    return this.restaurantsRepository.updateAll(restaurants, where);
  }

  @get('/restaurants/{id}', {
    responses: {
      '200': {
        description: 'Restaurants model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restaurants, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Restaurants, {exclude: 'where'}) filter?: FilterExcludingWhere<Restaurants>
  ): Promise<Restaurants> {
    return this.restaurantsRepository.findById(id, filter);
  }

  @patch('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurants PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurants, {partial: true}),
        },
      },
    })
    restaurants: Restaurants,
  ): Promise<void> {
    await this.restaurantsRepository.updateById(id, restaurants);
  }

  @put('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurants PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() restaurants: Restaurants,
  ): Promise<void> {
    await this.restaurantsRepository.replaceById(id, restaurants);
  }

  @del('/restaurants/{id}', {
    responses: {
      '204': {
        description: 'Restaurants DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.restaurantsRepository.deleteById(id);
  }
}
