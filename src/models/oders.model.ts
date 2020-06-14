import {Entity, model, property} from '@loopback/repository';

@model()
export class Oders extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
    required: true,
  })
  driverId: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  products: object[];


  constructor(data?: Partial<Oders>) {
    super(data);
  }
}

export interface OdersRelations {
  // describe navigational properties here
}

export type OdersWithRelations = Oders & OdersRelations;
