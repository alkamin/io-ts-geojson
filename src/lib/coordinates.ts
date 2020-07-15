import * as t from 'io-ts';

// Position 2d
export const positionCoordinates2dCodec = t.tuple([t.number, t.number]);
/**
 * Represents a 2d position
 * https://tools.ietf.org/html/rfc7946#section-3.1.1
 */
export type PositionCoordinates2d = t.TypeOf<typeof positionCoordinates2dCodec>;

// Position 3d
export const positionCoordinates3dCodec = t.tuple([
  t.number,
  t.number,
  t.number
]);
/**
 * Represents a 3d position
 * https://tools.ietf.org/html/rfc7946#section-3.1.1
 */
export type PositionCoordinates3d = t.TypeOf<typeof positionCoordinates3dCodec>;

// MutliPoint 2d
export const multiPointCoordinates2dCodec = t.array(positionCoordinates2dCodec);
/**
 * Represents a set of 2d positions
 * https://tools.ietf.org/html/rfc7946#section-3.1.3
 */
export type MultiPointCoordinates2d = t.TypeOf<
  typeof multiPointCoordinates2dCodec
>;

// MultiPoint 3d
export const multipointCoordinates3dCodec = t.array(positionCoordinates3dCodec);
/**
 * Represents a set of 3d positions
 * https://tools.ietf.org/html/rfc7946#section-3.1.3
 */
export type MultiPointCoordinates3d = t.TypeOf<
  typeof multipointCoordinates3dCodec
>;

// LineString 2d
export interface LineStringCoordinates3dBrand {
  readonly LineString2d: unique symbol;
}
export const lineStringCoordinates2dCodec = t.brand(
  multiPointCoordinates2dCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number]>,
    LineStringCoordinates3dBrand
  > => lineString.length >= 2,
  'LineString2d'
);
/**
 * Represents a 2d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1.4
 *
 * This codec validates that there are at least 2 positions in the
 * coordinates array
 */
export type LineStringCoordinates2d = t.TypeOf<
  typeof lineStringCoordinates2dCodec
>;

/**
 * Represents a 3d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1.4
 *
 * This codec validates that within the coordinates array there are at least 2 positions
 */
export interface LineStringCoordinates3dBrand {
  readonly LineString3d: unique symbol;
}
export const lineStringCoordinates3dCodec = t.brand(
  multipointCoordinates3dCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number, number]>,
    LineStringCoordinates3dBrand
  > => lineString.length >= 2,
  'LineString3d'
);
export type LineStringCoordinates3d = t.TypeOf<
  typeof lineStringCoordinates3dCodec
>;

/**
 * Represents a set of 2d LineStrings
 * https://tools.ietf.org/html/rfc7946#section-3.1.5
 *
 * This codec validates that within each LineString are at least 2 positions
 */
export const multiLineStringCoordinates2dCodec = t.array(
  lineStringCoordinates2dCodec
);
export type MultiLineStringCoordinates2d = t.TypeOf<
  typeof multiLineStringCoordinates2dCodec
>;

/**
 * Represents a set of 3d LineStrings
 * https://tools.ietf.org/html/rfc7946#section-3.1.5
 *
 * This codec validates that within each LineString are at least 2 positions
 */
export const multiLineStringCoordinates3dCodec = t.array(
  lineStringCoordinates3dCodec
);
export type MultiLineStringCoordinates3d = t.TypeOf<
  typeof multiLineStringCoordinates3dCodec
>;

/**
 * Represents a 2d linear ring
 * https://tools.ietf.org/html/rfc7946#section-3.1.6
 *
 * This codec validates that the there are at least 4 positions and that the
 * first and last positions are numerically the same
 */
export interface LinearRingCoordinates2dBrand {
  readonly LinearRing2d: unique symbol;
}
export const linearRingCoordinates2dCodec = t.brand(
  multiPointCoordinates2dCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number]>,
    LinearRingCoordinates2dBrand
  > =>
    lineString.length >= 4 &&
    lineString[0][0] === lineString[lineString.length - 1][0] &&
    lineString[0][1] === lineString[lineString.length - 1][1],
  'LinearRing2d'
);
export type LinearRingCoordinates2d = t.TypeOf<
  typeof linearRingCoordinates2dCodec
>;

/**
 * Represents a 3d linear ring
 * https://tools.ietf.org/html/rfc7946#section-3.1.6
 *
 * This codec validates that the there are at least 4 positions and that the
 * first and last positions are numerically equal
 */
export interface LinearRing3dCoordinatesBrand {
  readonly LinearRing3d: unique symbol;
}
export const linearRing3dCoordinatesCodec = t.brand(
  multipointCoordinates3dCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number, number]>,
    LinearRing3dCoordinatesBrand
  > =>
    lineString.length >= 4 &&
    lineString[0][0] === lineString[lineString.length - 1][0] &&
    lineString[0][1] === lineString[lineString.length - 1][1] &&
    lineString[0][2] === lineString[lineString.length - 1][2],
  'LinearRing3d'
);
export type LinearRingCoordinates3d = t.TypeOf<
  typeof linearRing3dCoordinatesCodec
>;

/**
 * Represents a 2d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of the Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const polygonCoordinates2dCodec = t.array(linearRingCoordinates2dCodec);
export type PolygonCoordinates2d = t.TypeOf<typeof polygonCoordinates2dCodec>;

/**
 * Represents a 3d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of the Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const polygonCoordinates3dCodec = t.array(linearRing3dCoordinatesCodec);
export type PolygonCoordinates3d = t.TypeOf<typeof polygonCoordinates3dCodec>;

/**
 * Represents a set of 2d Polygons
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of each Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const multiPolygonCoordinates2dCodec = t.array(
  polygonCoordinates2dCodec
);
export type MutliPolygon2dCoordinates = t.TypeOf<
  typeof multiPolygonCoordinates2dCodec
>;

/**
 * Represents a set of 3d Polygons
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of each Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const multiPolygonCoordinates3dCodec = t.array(
  polygonCoordinates3dCodec
);
export type MutliPolygonCoordinates3d = t.TypeOf<
  typeof multiPolygonCoordinates3dCodec
>;
