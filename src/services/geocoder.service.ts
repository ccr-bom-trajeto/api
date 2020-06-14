import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {HereMapsDataSource} from '../datasources';

export interface Geocoder {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  geocode(address: string): Promise<GeoPoint[]>;
}

export interface GeoPoint {
  /**
   * latitude
   */
  lat: number;

  /**
   * longitude
   */
  lng: number;
}

export class GeocoderProvider implements Provider<Geocoder> {
  constructor(
    // HereMaps must match the name property in the datasource json file
    @inject('datasources.HereMaps')
    protected dataSource: HereMapsDataSource = new HereMapsDataSource(),
  ) {}

  value(): Promise<Geocoder> {
    return getService(this.dataSource);
  }
}
