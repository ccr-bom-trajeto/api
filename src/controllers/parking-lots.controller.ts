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
import {ParkingLots} from '../models';
import {ParkingLotsRepository} from '../repositories';
import {Geocoder} from '../services';

export class ParkingLotsController {
  constructor(
    @repository(ParkingLotsRepository)
    public parkingLotsRepository: ParkingLotsRepository,
    @inject('services.Geocoder') protected geoService: Geocoder
  ) {}

  @post('/parking-lots', {
    responses: {
      '200': {
        description: 'ParkingLots model instance',
        content: {'application/json': {schema: getModelSchemaRef(ParkingLots)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {
            title: 'NewParkingLots',
            exclude: ['_id'],
          }),
        },
      },
    })
    parkingLots: Omit<ParkingLots, '_id'>,
  ): Promise<ParkingLots> {
    if (parkingLots.address) {
      const geo = await this.geoService.geocode(parkingLots.address)
      if (!geo[0]) {
        // address not found
        throw new HttpErrors.BadRequest(
          `Address not found: ${parkingLots.address}`,
        );
      }
      parkingLots.position = `${geo[0].lat},${geo[0].lng}`
    }
    return this.parkingLotsRepository.create(parkingLots);
  }

  @get('/parking-lots/count', {
    responses: {
      '200': {
        description: 'ParkingLots model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(ParkingLots) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.parkingLotsRepository.count(where);
  }

  @get('/parking-lots', {
    responses: {
      '200': {
        description: 'Array of ParkingLots model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParkingLots, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParkingLots) filter?: Filter<ParkingLots>,
  ): Promise<ParkingLots[]> {
    return this.parkingLotsRepository.find(filter);
  }

  @patch('/parking-lots', {
    responses: {
      '200': {
        description: 'ParkingLots PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: ParkingLots,
    @param.where(ParkingLots) where?: Where<ParkingLots>,
  ): Promise<Count> {
    return this.parkingLotsRepository.updateAll(parkingLots, where);
  }

  @get('/parking-lots/{id}', {
    responses: {
      '200': {
        description: 'ParkingLots model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingLots, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ParkingLots, {exclude: 'where'}) filter?: FilterExcludingWhere<ParkingLots>
  ): Promise<ParkingLots> {
    return this.parkingLotsRepository.findById(id, filter);
  }

  @patch('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLots PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingLots, {partial: true}),
        },
      },
    })
    parkingLots: ParkingLots,
  ): Promise<void> {
    await this.parkingLotsRepository.updateById(id, parkingLots);
  }

  @put('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLots PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parkingLots: ParkingLots,
  ): Promise<void> {
    await this.parkingLotsRepository.replaceById(id, parkingLots);
  }

  @del('/parking-lots/{id}', {
    responses: {
      '204': {
        description: 'ParkingLots DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parkingLotsRepository.deleteById(id);
  }
}
