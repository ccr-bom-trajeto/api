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
import {Oders} from '../models';
import {OdersRepository} from '../repositories';

export class OrdersController {
  constructor(
    @repository(OdersRepository)
    public odersRepository : OdersRepository,
  ) {}

  @post('/oders', {
    responses: {
      '200': {
        description: 'Oders model instance',
        content: {'application/json': {schema: getModelSchemaRef(Oders)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oders, {
            title: 'NewOders',
            exclude: ['_id'],
          }),
        },
      },
    })
    oders: Omit<Oders, '_id'>,
  ): Promise<Oders> {
    return this.odersRepository.create(oders);
  }

  @get('/oders/count', {
    responses: {
      '200': {
        description: 'Oders model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Oders) where?: Where<Oders>,
  ): Promise<Count> {
    return this.odersRepository.count(where);
  }

  @get('/oders', {
    responses: {
      '200': {
        description: 'Array of Oders model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Oders, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Oders) filter?: Filter<Oders>,
  ): Promise<Oders[]> {
    return this.odersRepository.find(filter);
  }

  @patch('/oders', {
    responses: {
      '200': {
        description: 'Oders PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oders, {partial: true}),
        },
      },
    })
    oders: Oders,
    @param.where(Oders) where?: Where<Oders>,
  ): Promise<Count> {
    return this.odersRepository.updateAll(oders, where);
  }

  @get('/oders/{id}', {
    responses: {
      '200': {
        description: 'Oders model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Oders, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Oders, {exclude: 'where'}) filter?: FilterExcludingWhere<Oders>
  ): Promise<Oders> {
    return this.odersRepository.findById(id, filter);
  }

  @patch('/oders/{id}', {
    responses: {
      '204': {
        description: 'Oders PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Oders, {partial: true}),
        },
      },
    })
    oders: Oders,
  ): Promise<void> {
    await this.odersRepository.updateById(id, oders);
  }

  @put('/oders/{id}', {
    responses: {
      '204': {
        description: 'Oders PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() oders: Oders,
  ): Promise<void> {
    await this.odersRepository.replaceById(id, oders);
  }

  @del('/oders/{id}', {
    responses: {
      '204': {
        description: 'Oders DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.odersRepository.deleteById(id);
  }
}
