import * as t from 'io-ts';

export const geometryInstanceTypeCodec = t.union([
  t.literal('Point'),
  t.literal('MultiPoint'),
  t.literal('LineString'),
  t.literal('MultiLineString'),
  t.literal('Polygon'),
  t.literal('MultiPolygon')
]);

export const geometryCollectionTypeCodec = t.literal('GeometryCollection');

export const geometryTypeCodec = t.union([
  geometryInstanceTypeCodec,
  geometryCollectionTypeCodec
]);

export type GeometryInstanceType = t.TypeOf<typeof geometryInstanceTypeCodec>;
export type GeometryCollectionType = t.TypeOf<
  typeof geometryCollectionTypeCodec
>;
export type GeometryType = t.TypeOf<typeof geometryTypeCodec>;
