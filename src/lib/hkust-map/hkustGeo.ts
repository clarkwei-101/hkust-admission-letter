// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 宋夏天Dazzle / Based on three-scope-map-skill
// 作者全平台ID：宋夏天Dazzle；公众号：送你整个夏天
// Source: https://github.com/songsummer920-dazzle/three-scope-map-skill
// Adapted for HKUST campus map

export type Position = [number, number];

export interface GeoFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    nameZh: string;
    fullname: string;
    center?: Position;
    height: number;
    category: 'academic' | 'life' | 'landscape';
    [key: string]: unknown;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: Position[][] | Position[][][];
  };
}

export interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}
