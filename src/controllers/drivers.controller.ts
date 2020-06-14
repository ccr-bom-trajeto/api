import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Drivers} from '../models';
import {DriversRepository} from '../repositories';

export class DriversController {
  constructor(
    @repository(DriversRepository)
    public driversRepository : DriversRepository,
  ) {}

  @post('/drivers', {
    responses: {
      '200': {
        description: 'Drivers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Drivers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drivers, {
            title: 'NewDrivers',
            exclude: ['_id'],
          }),
        },
      },
    })
    drivers: Omit<Drivers, '_id'>,
  ): Promise<Drivers> {
    return this.driversRepository.create(drivers);
  }

  @get('/drivers/count', {
    responses: {
      '200': {
        description: 'Drivers model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Drivers) where?: Where<Drivers>,
  ): Promise<Count> {
    return this.driversRepository.count(where);
  }

  @get('/drivers', {
    responses: {
      '200': {
        description: 'Array of Drivers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Drivers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Drivers) filter?: Filter<Drivers>,
  ): Promise<Drivers[]> {
    return this.driversRepository.find(filter);
  }

  @patch('/drivers', {
    responses: {
      '200': {
        description: 'Drivers PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drivers, {partial: true}),
        },
      },
    })
    drivers: Drivers,
    @param.where(Drivers) where?: Where<Drivers>,
  ): Promise<Count> {
    return this.driversRepository.updateAll(drivers, where);
  }

  @get('/drivers/{id}', {
    responses: {
      '200': {
        description: 'Drivers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Drivers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Drivers, {exclude: 'where'}) filter?: FilterExcludingWhere<Drivers>
  ): Promise<Drivers> {
    return this.driversRepository.findById(id, filter);
  }

  @patch('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Drivers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Drivers, {partial: true}),
        },
      },
    })
    drivers: Drivers,
  ): Promise<void> {
    await this.driversRepository.updateById(id, drivers);
  }

  @put('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Drivers PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() drivers: Drivers,
  ): Promise<void> {
    await this.driversRepository.replaceById(id, drivers);
  }

  @del('/drivers/{id}', {
    responses: {
      '204': {
        description: 'Drivers DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.driversRepository.deleteById(id);
  }
}
