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

// One position - Point
export const position2dCodec = t.tuple([t.number, t.number]);

export interface LineString2dBrand {
  readonly LineString2d: unique symbol;
}

export const lineString2dCodec = t.brand(
  t.array(position2dCodec),
  (
    lineString
  ): lineString is t.Branded<Array<[number, number]>, LineString2dBrand> =>
    lineString.length >= 2,
  'LineString2d'
);

export interface LinearRing2dBrand extends LineString2dBrand {
  readonly LinearRing2d: unique symbol;
}

export const linearRing2dCodec = t.brand(
  lineString2dCodec,
  (
    lineString
  ): lineString is t.Branded<Array<[number, number]>, LinearRing2dBrand> =>
    lineString.length >= 4 &&
    lineString[0][0] === lineString[lineString.length - 1][0] &&
    lineString[0][1] === lineString[lineString.length - 1][1],
  'LinearRing2d'
);

export type LinearRing2d = t.TypeOf<typeof linearRing2dCodec>;

// One position - Point
export const position3dCodec = t.tuple([t.number, t.number, t.number]);

// Array of positions - MultiPoint or LineString
export interface LineString3dBrand {
  readonly LineString3d: unique symbol;
}

export const lineString3dCodec = t.brand(
  t.array(position3dCodec),
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number, number]>,
    LineString3dBrand
  > => lineString.length >= 2,
  'LineString3d'
);

export interface LinearRing3dBrand extends LineString3dBrand {
  readonly LinearRing3d: unique symbol;
}

export const linearRing3dCodec = t.brand(
  lineString3dCodec,
  (
    lineString
  ): lineString is t.Branded<
    Array<[number, number, number]>,
    LinearRing3dBrand
  > =>
    lineString.length >= 4 &&
    lineString[0][0] === lineString[lineString.length - 1][0] &&
    lineString[0][1] === lineString[lineString.length - 1][1] &&
    lineString[0][2] === lineString[lineString.length - 1][2],
  'LinearRing3d'
);

export type LinearRing3d = t.TypeOf<typeof linearRing2dCodec>;

export const positionCodec = t.union([position2dCodec, position3dCodec]);
export const lineStringCodec = t.union([lineString2dCodec, lineString3dCodec]);

export const pointGeometryCodec = t.type({
  type: t.literal('Point'),
  coordinates: positionCodec
});

export const multiPointGeometryCodec = t.type({
  type: t.literal('MultiPoint'),
  coordinates: lineStringCodec
});

export const lineStringGeometryCodec = t.type({
  type: t.literal('LineString'),
  coordinates: lineStringCodec
});

export const multiLineStringGeometryCodec = t.type({
  type: t.literal('MultiLineString'),
  coordinates: t.union([t.array(lineString2dCodec), t.array(lineString3dCodec)])
});

export const polygonGeometryCodec = t.type({
  type: t.literal('Polygon'),
  coordinates: t.union([t.array(linearRing2dCodec), t.array(linearRing3dCodec)])
});

export const multiPolygonGeometryCodec = t.type({
  type: t.literal('MultiPolygon'),
  coordinates: t.union([
    t.array(t.array(linearRing2dCodec)),
    t.array(t.array(linearRing3dCodec))
  ])
});

export const geometryCodec = t.union([
  pointGeometryCodec,
  multiPointGeometryCodec,
  lineStringGeometryCodec,
  multiLineStringGeometryCodec,
  polygonGeometryCodec,
  multiPolygonGeometryCodec
]);

export const geometryCollectionCodec = t.type({
  type: t.literal('GeometryCollection'),
  geometries: t.array(geometryCodec)
});

export type GeometryInstanceType = t.TypeOf<typeof geometryInstanceTypeCodec>;
export type GeometryCollectionType = t.TypeOf<
  typeof geometryCollectionTypeCodec
>;
export type GeometryType = t.TypeOf<typeof geometryTypeCodec>;
export type Position = t.TypeOf<typeof positionCodec>;
export type PointGeometry = t.TypeOf<typeof pointGeometryCodec>;
export type MultiPointGeometry = t.TypeOf<typeof multiPointGeometryCodec>;
export type LineStringGeometry = t.TypeOf<typeof lineStringGeometryCodec>;
export type PolygonGeometry = t.TypeOf<typeof polygonGeometryCodec>;
export type MultiLineStringGeometry = t.TypeOf<
  typeof multiLineStringGeometryCodec
>;
export type MultiPolygonGeometry = t.TypeOf<typeof multiPolygonGeometryCodec>;
export type Geometry = t.TypeOf<typeof geometryCodec>;
export type GeometryCollection = t.TypeOf<typeof geometryCollectionCodec>;
