import {Entity, model, property, hasMany} from '@loopback/repository';
import {Drivers} from './drivers.model';

@model()
export class Business extends Entity {
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
  })
  phone?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'number',
    default: 0,
  })
  points?: number;

  @hasMany(() => Drivers)
  drivers: Drivers[];

  constructor(data?: Partial<Business>) {
    super(data);
  }
}

export interface BusinessRelations {
  // describe navigational properties here
}

export type BusinessWithRelations = Business & BusinessRelations;
