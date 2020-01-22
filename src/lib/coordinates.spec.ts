/* tslint:disable */
import test from 'ava';
import { isRight } from 'fp-ts/lib/Either';
import * as C from './coordinates';

test('Positions (2d) are properly validated', t => {
  const goodPosition = [1, 1];
  const badPosition = [1];
  const decode = C.position2dCoordinatesCodec.decode;
  t.true(isRight(decode(goodPosition)));
  t.false(isRight(decode(badPosition)));
});

test('Positions (3d) are properly validated', t => {
  const goodPosition = [1, 1, 1];
  const badPosition = [1, 1];
  const decode = C.position3dCoordinatesCodec.decode;
  t.true(isRight(decode(goodPosition)));
  t.false(isRight(decode(badPosition)));
});

test('LineStrings (2d) are properly validated', t => {
  const good = [
    [1, 1],
    [2, 1],
    [2, 2]
  ];
  const bad = [[1, 1]];
  const decode = C.lineString2dCoordinatesCodec.decode;
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
  const decode = C.linearRing2dCoordinatesCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});

test('LineStrings (3d) are properly validated', t => {
  const good = [
    [1, 1, 1],
    [2, 1, 1],
    [2, 2, 2]
  ];
  const bad = [[1, 1, 1]];
  const decode = C.lineString3dCoordinatesCodec.decode;
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
