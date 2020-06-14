import {Entity, model, property, hasOne} from '@loopback/repository';
import {Business} from './business.model';

@model()
export class Drivers extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  cpf: string;

  @property({
    type: 'string',
    required: true,
  })
  picture_url: string;

  @property({
    type: 'number',
    default: 0,
  })
  points?: number;

  @property({
    type: 'string',
    required: true,
  })
  businessId: string;

  @hasOne(() => Business, {keyTo: '_id'})
  business: Business;

  constructor(data?: Partial<Drivers>) {
    super(data);
  }
}

export interface DriversRelations {
  // describe navigational properties here
}

export type DriversWithRelations = Drivers & DriversRelations;
