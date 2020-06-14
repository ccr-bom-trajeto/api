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
  Business,
  Drivers,
} from '../models';
import {BusinessRepository} from '../repositories';

export class BusinessDriversController {
  constructor(
    @repository(BusinessRepository) protected businessRepository: BusinessRepository,
  ) { }

  @get('/businesses/{id}/drivers', {
    responses: {
      '200': {
        description: 'Array of Business has many Drivers',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Drivers)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Drivers>,
  ): Promise<Drivers[]> {
    return this.businessRepository.drivers(id).find(filter);
  }

  @post('/businesses/{id}/drivers', {
    responses: {
      '200': {
        description: 'Business model instance',
        content: {'application/json': {schema: getModelSchemaRef(Drivers)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Business.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drivers, {
            title: 'NewDriversInBusiness',
            exclude: ['_id'],
            optional: ['businessId']
          }),
        },
      },
    }) drivers: Omit<Drivers, '_id'>,
  ): Promise<Drivers> {
    return this.businessRepository.drivers(id).create(drivers);
  }

  @patch('/businesses/{id}/drivers', {
    responses: {
      '200': {
        description: 'Business.Drivers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drivers, {partial: true}),
        },
      },
    })
    drivers: Partial<Drivers>,
    @param.query.object('where', getWhereSchemaFor(Drivers)) where?: Where<Drivers>,
  ): Promise<Count> {
    return this.businessRepository.drivers(id).patch(drivers, where);
  }

  @del('/businesses/{id}/drivers', {
    responses: {
      '200': {
        description: 'Business.Drivers DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Drivers)) where?: Where<Drivers>,
  ): Promise<Count> {
    return this.businessRepository.drivers(id).delete(where);
  }
}
