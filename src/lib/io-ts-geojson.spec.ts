/* tslint:disable */
import test from 'ava';
import { isRight } from 'fp-ts/lib/Either';
import * as L from './io-ts-geojson';

test('Positions (2d) are properly validated', t => {
  const goodPosition = [1, 1];
  const badPosition = [1];
  const decode = L.position2dCodec.decode;
  t.true(isRight(decode(goodPosition)));
  t.false(isRight(decode(badPosition)));
});

test('Positions (3d) are properly validated', t => {
  const goodPosition = [1, 1, 1];
  const badPosition = [1, 1];
  const decode = L.position3dCodec.decode;
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
  const decode = L.lineString2dCodec.decode;
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
  const decode = L.linearRing2dCodec.decode;
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
  const decode = L.lineString3dCodec.decode;
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
  const decode = L.linearRing3dCodec.decode;
  t.true(isRight(decode(good)));
  t.false(isRight(decode(bad)));
});
