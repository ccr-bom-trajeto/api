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
  Drivers,
  Business,
} from '../models';
import {DriversRepository} from '../repositories';

export class DriversBusinessController {
  constructor(
    @repository(DriversRepository) protected driversRepository: DriversRepository,
  ) { }

  @get('/drivers/{id}/business', {
    responses: {
      '200': {
        description: 'Drivers has one Business',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Business),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Business>,
  ): Promise<Business> {
    return this.driversRepository.business(id).get(filter);
  }

  @post('/drivers/{id}/business', {
    responses: {
      '200': {
        description: 'Drivers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Business)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Drivers.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Business, {
            title: 'NewBusinessInDrivers',
            exclude: ['_id'],
            optional: ['_id']
          }),
        },
      },
    }) business: Omit<Business, '_id'>,
  ): Promise<Business> {
    return this.driversRepository.business(id).create(business);
  }

  @patch('/drivers/{id}/business', {
    responses: {
      '200': {
        description: 'Drivers.Business PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Business, {partial: true}),
        },
      },
    })
    business: Partial<Business>,
    @param.query.object('where', getWhereSchemaFor(Business)) where?: Where<Business>,
  ): Promise<Count> {
    return this.driversRepository.business(id).patch(business, where);
  }

  @del('/drivers/{id}/business', {
    responses: {
      '200': {
        description: 'Drivers.Business DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Business)) where?: Where<Business>,
  ): Promise<Count> {
    return this.driversRepository.business(id).delete(where);
  }
}
