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
import {Business} from '../models';
import {BusinessRepository} from '../repositories';

export class BusinessController {
  constructor(
    @repository(BusinessRepository)
    public businessRepository : BusinessRepository,
  ) {}

  @post('/businesses', {
    responses: {
      '200': {
        description: 'Business model instance',
        content: {'application/json': {schema: getModelSchemaRef(Business)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Business, {
            title: 'NewBusiness',
            exclude: ['_id'],
          }),
        },
      },
    })
    business: Omit<Business, '_id'>,
  ): Promise<Business> {
    return this.businessRepository.create(business);
  }

  @get('/businesses/count', {
    responses: {
      '200': {
        description: 'Business model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Business) where?: Where<Business>,
  ): Promise<Count> {
    return this.businessRepository.count(where);
  }

  @get('/businesses', {
    responses: {
      '200': {
        description: 'Array of Business model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Business, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Business) filter?: Filter<Business>,
  ): Promise<Business[]> {
    return this.businessRepository.find(filter);
  }

  @patch('/businesses', {
    responses: {
      '200': {
        description: 'Business PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Business, {partial: true}),
        },
      },
    })
    business: Business,
    @param.where(Business) where?: Where<Business>,
  ): Promise<Count> {
    return this.businessRepository.updateAll(business, where);
  }

  @get('/businesses/{id}', {
    responses: {
      '200': {
        description: 'Business model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Business, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Business, {exclude: 'where'}) filter?: FilterExcludingWhere<Business>
  ): Promise<Business> {
    return this.businessRepository.findById(id, filter);
  }

  @patch('/businesses/{id}', {
    responses: {
      '204': {
        description: 'Business PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Business, {partial: true}),
        },
      },
    })
    business: Business,
  ): Promise<void> {
    await this.businessRepository.updateById(id, business);
  }

  @put('/businesses/{id}', {
    responses: {
      '204': {
        description: 'Business PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() business: Business,
  ): Promise<void> {
    await this.businessRepository.replaceById(id, business);
  }

  @del('/businesses/{id}', {
    responses: {
      '204': {
        description: 'Business DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.businessRepository.deleteById(id);
  }
}
