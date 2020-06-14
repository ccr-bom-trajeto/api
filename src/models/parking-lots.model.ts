import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Restaurants} from './restaurants.model';

@model()
export class ParkingLots extends Entity {
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
  address: string;

  @property({
    type: 'string',
  })
  position?: string;

  @belongsTo(() => Restaurants)
  restaurantId: string;

  constructor(data?: Partial<ParkingLots>) {
    super(data);
  }
}

export interface ParkingLotsRelations {
  // describe navigational properties here
}

export type ParkingLotsWithRelations = ParkingLots & ParkingLotsRelations;
