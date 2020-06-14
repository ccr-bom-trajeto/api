import {Entity, hasOne, model, property} from '@loopback/repository';
import {ParkingLots} from './parking-lots.model';

@model()
export class Restaurants extends Entity {
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
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
  })
  location: string;

  @hasOne(() => ParkingLots, {keyTo: 'restaurantId'})
  parkingLots: ParkingLots;

  constructor(data?: Partial<Restaurants>) {
    super(data);
  }
}

export interface RestaurantsRelations {
  // describe navigational properties here
}

export type RestaurantsWithRelations = Restaurants & RestaurantsRelations;
