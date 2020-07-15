import * as t from 'io-ts';
import {
  lineStringCoordinates2dCodec,
  lineStringCoordinates3dCodec,
  multiLineStringCoordinates2dCodec,
  multiLineStringCoordinates3dCodec,
  multiPointCoordinates2dCodec,
  multipointCoordinates3dCodec,
  multiPolygonCoordinates2dCodec,
  multiPolygonCoordinates3dCodec,
  polygonCoordinates2dCodec,
  polygonCoordinates3dCodec,
  positionCoordinates2dCodec,
  positionCoordinates3dCodec
} from './coordinates';

/**
 * A GeoJSON geometry object representing a 2d point
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const pointGeometry2dCodec = t.type({
  type: t.literal('Point'),
  coordinates: positionCoordinates2dCodec
});
export type PointGeometry2d = t.TypeOf<typeof pointGeometry2dCodec>;

/**
 * A GeoJSON geometry object representing a 3d point
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const pointGeometry3dCodec = t.type({
  type: t.literal('Point'),
  coordinates: positionCoordinates3dCodec
});
export type PointGeometry3d = t.TypeOf<typeof pointGeometry3dCodec>;

/**
 * A GeoJSON geometry object representing a set of 2d points
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiPointGeometry2dCodec = t.type({
  type: t.literal('MultiPoint'),
  coordinates: multiPointCoordinates2dCodec
});
export type MultiPointGeometry2d = t.TypeOf<typeof multiPointGeometry2dCodec>;

/**
 * A GeoJSON geometry object representing a set of 3d points
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiPointGeometry3dCodec = t.type({
  type: t.literal('MultiPoint'),
  coordinates: multipointCoordinates3dCodec
});
export type MultiPointGeometry3d = t.TypeOf<typeof multiPointGeometry3dCodec>;

/**
 * A GeoJSON geometry object representing a 2d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const lineStringGeometry2dCodec = t.type({
  type: t.literal('LineString'),
  coordinates: lineStringCoordinates2dCodec
});
export type LineStringGeometry2d = t.TypeOf<typeof lineStringGeometry2dCodec>;

/**
 * A GeoJSON geometry object representing a 2d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const lineStringGeometry3dCodec = t.type({
  type: t.literal('LineString'),
  coordinates: lineStringCoordinates3dCodec
});
export type LineStringGeometry3d = t.TypeOf<typeof lineStringGeometry3dCodec>;

/**
 * A GeoJSON geometry object representing a set of 2d LineStrings
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiLineStringGeometry2dCodec = t.type({
  type: t.literal('MultiLineString'),
  coordinates: multiLineStringCoordinates2dCodec
});
export type MultiLineStringGeometry2d = t.TypeOf<
  typeof multiLineStringGeometry2dCodec
>;

/**
 * A GeoJSON geometry object representing a set of 3d LineStrings
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiLineStringGeometry3dCodec = t.type({
  type: t.literal('MultiLineString'),
  coordinates: multiLineStringCoordinates3dCodec
});
export type MultiLineStringGeometry3d = t.TypeOf<
  typeof multiLineStringGeometry3dCodec
>;

/**
 * A GeoJSON geometry object representing a 2d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const polygonGeometry2dCodec = t.type({
  type: t.literal('Polygon'),
  coordinates: polygonCoordinates2dCodec
});
export type PolygonGeometry2d = t.TypeOf<typeof polygonGeometry2dCodec>;

/**
 * A GeoJSON geometry object representing a 3d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const polygonGeometry3dCodec = t.type({
  type: t.literal('Polygon'),
  coordinates: polygonCoordinates3dCodec
});
export type PolygonGeometry3d = t.TypeOf<typeof polygonGeometry3dCodec>;

/**
 * A GeoJSON geometry object representing a set of 2d Polygons
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiPolygonGeometry2dCodec = t.type({
  type: t.literal('MultiPolygon'),
  coordinates: multiPolygonCoordinates2dCodec
});
export type MultiPolygonGeometry2d = t.TypeOf<
  typeof multiPolygonGeometry2dCodec
>;

/**
 * A GeoJSON geometry object representing a set of 2d Polygons
 * https://tools.ietf.org/html/rfc7946#section-3.1
 */
export const multiPolygonGeometry3dCodec = t.type({
  type: t.literal('MultiPolygon'),
  coordinates: multiPolygonCoordinates3dCodec
});
export type MultiPolygonGeometry3d = t.TypeOf<
  typeof multiPolygonGeometry3dCodec
>;

export const geometry2dCodecs = t.union([
  pointGeometry2dCodec,
  multiPointGeometry2dCodec,
  lineStringGeometry2dCodec,
  multiLineStringGeometry2dCodec,
  polygonGeometry2dCodec,
  multiPolygonGeometry2dCodec
]);

export const geometry3dCodecs = t.union([
  pointGeometry3dCodec,
  multiPointGeometry3dCodec,
  lineStringGeometry3dCodec,
  multiLineStringGeometry3dCodec,
  polygonGeometry3dCodec,
  multiPolygonGeometry3dCodec
]);

/**
 * Represents a 2d GeometryCollection
 * https://tools.ietf.org/html/rfc7946#section-3.1.8
 */
export const geometryCollection2dCodec = t.type({
  type: t.literal('GeometryCollection'),
  geometries: t.array(geometry2dCodecs)
});
export type GeometryCollection2d = t.TypeOf<typeof geometryCollection2dCodec>;

/**
 * Represents a 3d GeometryCollection
 * https://tools.ietf.org/html/rfc7946#section-3.1.8
 */
export const geometryCollection3dCodec = t.type({
  type: t.literal('GeometryCollection'),
  geometries: t.array(geometry3dCodecs)
});
export type GeometryCollection3d = t.TypeOf<typeof geometryCollection3dCodec>;
