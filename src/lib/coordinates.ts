import * as t from 'io-ts';

/**
 * Represents a 2d position
 * https://tools.ietf.org/html/rfc7946#section-3.1.1
 */
export const position2dCoordinatesCodec = t.tuple([t.number, t.number]);
export type Position2dCoordinates = t.TypeOf<typeof position2dCoordinatesCodec>;

/**
 * Represents a 3d position
 * https://tools.ietf.org/html/rfc7946#section-3.1.1
 */
export const position3dCoordinatesCodec = t.tuple([
  t.number,
  t.number,
  t.number
]);
export type Position3dCoordinates = t.TypeOf<typeof position3dCoordinatesCodec>;

/**
 * Represents a set of 2d positions
 * https://tools.ietf.org/html/rfc7946#section-3.1.3
 */
export const multipoint2dCoordinatesCodec = t.array(position2dCoordinatesCodec);
export type MultiPoint2dCoordinates = t.TypeOf<
  typeof multipoint2dCoordinatesCodec
>;

/**
 * Represents a set of 3d positions
 * https://tools.ietf.org/html/rfc7946#section-3.1.3
 */
export const multipoint3dCoordinatesCodec = t.array(position3dCoordinatesCodec);
export type MultiPoint3dCoordinates = t.TypeOf<
  typeof multipoint3dCoordinatesCodec
>;

/**
 * Represents a 2d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1.4
 *
 * This codec validates that there are at least 2 positions in the
 * coordinates array
 */
interface LineString2dCoordinatesBrand {
  readonly LineString2d: unique symbol;
}
export const lineString2dCoordinatesCodec = t.brand(
  multipoint2dCoordinatesCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number]>,
    LineString2dCoordinatesBrand
  > => lineString.length >= 2,
  'LineString2d'
);
export type LineString2dCoordinates = t.TypeOf<
  typeof lineString2dCoordinatesCodec
>;

/**
 * Represents a 3d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1.4
 *
 * This codec validates that within the coordinates array there are at least 2 positions
 */
interface LineString3dCoordinatesBrand {
  readonly LineString3d: unique symbol;
}
export const lineString3dCoordinatesCodec = t.brand(
  multipoint3dCoordinatesCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number, number]>,
    LineString3dCoordinatesBrand
  > => lineString.length >= 2,
  'LineString3d'
);
export type LineString3dCoordinates = t.TypeOf<
  typeof lineString3dCoordinatesCodec
>;

/**
 * Represents a set of 2d LineString
 * https://tools.ietf.org/html/rfc7946#section-3.1.5
 *
 * This codec validates that within each LineString are at least 2 positions
 */
export const multiLineString2dCoordinatesCodec = t.array(
  lineString2dCoordinatesCodec
);
export type MultiLineString2dCoordinates = t.TypeOf<
  typeof multiLineString2dCoordinatesCodec
>;

/**
 * Represents a set of 3d LineStrings
 * https://tools.ietf.org/html/rfc7946#section-3.1.5
 *
 * This codec validates that within each LineString are at least 2 positions
 */
export const multiLineString3dCoordinatesCodec = t.array(
  lineString3dCoordinatesCodec
);
export type MultiLineString3dCoordinates = t.TypeOf<
  typeof multiLineString3dCoordinatesCodec
>;

/**
 * Represents a 2d linear ring
 * https://tools.ietf.org/html/rfc7946#section-3.1.6
 *
 * This codec validates that the there are at least 4 positions and that the
 * first and last positions are numerically the same
 */
interface LinearRing2dCoordinatesBrand {
  readonly LinearRing2d: unique symbol;
}
export const linearRing2dCoordinatesCodec = t.brand(
  multipoint2dCoordinatesCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number]>,
    LinearRing2dCoordinatesBrand
  > =>
    lineString.length >= 4 &&
    lineString[0][0] === lineString[lineString.length - 1][0] &&
    lineString[0][1] === lineString[lineString.length - 1][1],
  'LinearRing2d'
);
export type LinearRing2dCoordinates = t.TypeOf<
  typeof linearRing2dCoordinatesCodec
>;

/**
 * Represents a 3d linear ring
 * https://tools.ietf.org/html/rfc7946#section-3.1.6
 *
 * This codec validates that the there are at least 4 positions and that the
 * first and last positions are numerically equal
 */
interface LinearRing3dCoordinatesBrand {
  readonly LinearRing3d: unique symbol;
}
export const linearRing3dCoordinatesCodec = t.brand(
  multipoint3dCoordinatesCodec,
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
export type LinearRing3dCoordinates = t.TypeOf<
  typeof linearRing3dCoordinatesCodec
>;

/**
 * Represents a 2d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of the Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const polygon2dCoordinatesCodec = t.array(linearRing2dCoordinatesCodec);
export type Polygon2dCoordinates = t.TypeOf<typeof polygon2dCoordinatesCodec>;

/**
 * Represents a 3d Polygon
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 * This codec validates that within each ring of the Polygon there at at least 4
 * positions and that the first and last positions are numerically equal
 */
export const polygon3dCoordinatesCodec = t.array(linearRing3dCoordinatesCodec);
export type Polygon3dCoordinates = t.TypeOf<typeof polygon3dCoordinatesCodec>;

/**
 * Represents a set of 2d Polygons
 * https://tools.ietf.org/html/rfc7946#section-3.1.7
 *
 *
 */
