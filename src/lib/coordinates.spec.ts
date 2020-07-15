/* tslint:disable */
import test from 'ava';
import { isRight } from 'fp-ts/lib/Either';
import * as C from './coordinates';

test('Positions (2d) are properly validated', t => {
  const goodPosition = [1, 1];
  const badPosition = [1];
  const decode = C.positionCoordinates2dCodec.decode;
  t.true(isRight(decode(goodPosition)));
  t.false(isRight(decode(badPosition)));
});

test('MultiPoints (2d) are properly validated', t => {
  const goodPositions = [
    [1, 1],
    [1, 2]
  ];
  const badPositions = [[1], [1, 2]];
  const decode = C.multiPointCoordinates2dCodec.decode;
  t.true(isRight(decode(goodPositions)));
  t.false(isRight(decode(badPositions)));
});

test('LineStrings (2d) are properly validated', t => {
  const good = [
    [1, 1],
    [2, 1],
    [2, 2]
  ];
  const bad = [[1, 1]];
  const decode = C.lineStringCoordinates2dCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});

test('LinearRings (2d) are properly validated', t => {
  const good = [
    [1, 1],
    [2, 1],
    [2, 2],
    [1, 1]
  ];
  const bad = [
    [1, 1],
    [2, 1],
    [2, 2],
    [2, 3]
  ];
  const decode = C.linearRingCoordinates2dCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});

test('Positions (3d) are properly validated', t => {
  const goodPosition = [1, 1, 1];
  const badPosition = [1, 1];
  const decode = C.positionCoordinates3dCodec.decode;
  t.true(isRight(decode(goodPosition)));
  t.false(isRight(decode(badPosition)));
});

test('MultiPoints (3d) are properly validated', t => {
  const goodPositions = [
    [1, 1, 2],
    [1, 2, 1]
  ];
  const badPositions = [[1], [1, 1], [1, 2]];
  const decode = C.multipointCoordinates3dCodec.decode;
  t.true(isRight(decode(goodPositions)));
  t.false(isRight(decode(badPositions)));
});

test('LineStrings (3d) are properly validated', t => {
  const good = [
    [1, 1, 1],
    [2, 1, 1],
    [2, 2, 2]
  ];
  const bad = [[1, 1, 1]];
  const decode = C.lineStringCoordinates3dCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});

test('LinearRings (3d) are properly validated', t => {
  const good = [
    [1, 1, 1],
    [2, 1, 1],
    [2, 2, 1],
    [1, 1, 1]
  ];
  const bad = [
    [1, 1, 1],
    [2, 1, 1],
    [2, 2, 2],
    [2, 3, 1]
  ];
  const decode = C.linearRing3dCoordinatesCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});
