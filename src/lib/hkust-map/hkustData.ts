// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 宋夏天Dazzle / Based on three-scope-map-skill
// 作者全平台ID：宋夏天Dazzle；公众号：送你整个夏天
// Source: https://github.com/songsummer920-dazzle/three-scope-map-skill
// Adapted for HKUST campus map — all coordinates normalized to 0-1000 x 0-600

import type { GeoFeatureCollection } from './hkustGeo';

// Campus bounding box: lon 114.207–114.222, lat 22.248–22.258
// Map dimensions: 1000 x 600 (mapWidth=1000, mapHeight=600)

const hkustData: GeoFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ── ACADEMIC ──────────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'library',
        name: 'The Library',
        nameZh: '李兆基图书馆',
        fullname: 'The Library · 李兆基图书馆',
        center: [580, 250],
        height: 3.2,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [530, 230], [630, 230], [630, 270], [530, 270], [530, 230],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'academic_building',
        name: 'Academic Building',
        nameZh: '学术楼',
        fullname: 'Academic Building · 学术楼',
        center: [320, 310],
        height: 3.8,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [260, 270], [380, 270], [380, 350], [260, 350], [260, 270],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'ias',
        name: 'Jockey Club IAS',
        nameZh: '赛马会大气研究中心',
        fullname: 'Jockey Club IAS · 赛马会大气研究中心',
        center: [130, 330],
        height: 2.8,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [80, 300], [180, 300], [180, 360], [80, 360], [80, 300],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'cse_building',
        name: 'CSE Building',
        nameZh: '计算机科学与工程大楼',
        fullname: 'CSE Building · 计算机科学与工程大楼',
        center: [720, 200],
        height: 4.0,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [660, 160], [780, 160], [780, 240], [660, 240], [660, 160],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'school_of_engineering',
        name: 'School of Engineering',
        nameZh: '工程学院',
        fullname: 'School of Engineering · 工程学院',
        center: [830, 290],
        height: 4.2,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [770, 250], [890, 250], [890, 330], [770, 330], [770, 250],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'school_of_business',
        name: 'School of Business',
        nameZh: '商学院',
        fullname: 'School of Business · 商学院',
        center: [220, 440],
        height: 3.5,
        category: 'academic',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [160, 400], [280, 400], [280, 480], [160, 480], [160, 400],
        ]],
      },
    },
    // ── LIFE ─────────────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'student_centre',
        name: 'Student Centre',
        nameZh: '学生中心',
        fullname: 'Student Centre · 学生中心',
        center: [480, 420],
        height: 3.0,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [410, 380], [550, 380], [550, 460], [410, 460], [410, 380],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'shaw_auditorium',
        name: 'Shaw Auditorium',
        nameZh: '邵逸夫堂',
        fullname: 'Shaw Auditorium · 邵逸夫堂',
        center: [630, 370],
        height: 2.5,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [570, 340], [690, 340], [690, 400], [570, 400], [570, 340],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 's_h_ho_college',
        name: 'S.H. Ho College',
        nameZh: '何善衡书院',
        fullname: 'S.H. Ho College · 何善衡书院',
        center: [160, 510],
        height: 3.4,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [100, 470], [220, 470], [220, 550], [100, 550], [100, 470],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'gym',
        name: 'University Sports Hall',
        nameZh: '大学体育馆',
        fullname: 'University Sports Hall · 大学体育馆',
        center: [380, 520],
        height: 2.2,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [330, 490], [430, 490], [430, 550], [330, 550], [330, 490],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'swimming_pool',
        name: 'Swimming Pool',
        nameZh: '游泳池',
        fullname: 'Swimming Pool · 游泳池',
        center: [480, 550],
        height: 0.8,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [440, 530], [520, 530], [520, 570], [440, 570], [440, 530],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'parking',
        name: 'Car Park',
        nameZh: '停车场',
        fullname: 'Car Park · 停车场',
        center: [870, 410],
        height: 1.2,
        category: 'life',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [830, 380], [910, 380], [910, 440], [830, 440], [830, 380],
        ]],
      },
    },
    // ── LANDSCAPE / GREEN SPACE ──────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'piazza',
        name: 'The Piazza',
        nameZh: '中央广场',
        fullname: 'The Piazza · 中央广场',
        center: [500, 320],
        height: 0.2,
        category: 'landscape',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [430, 300], [570, 300], [570, 340], [430, 340], [430, 300],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'waterfront',
        name: 'Waterfront Promenade',
        nameZh: '海滨长廊',
        fullname: 'Waterfront Promenade · 海滨长廊',
        center: [500, 150],
        height: 0.1,
        category: 'landscape',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [200, 130], [800, 130], [800, 170], [200, 170], [200, 130],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'north_playing_field',
        name: 'North Playing Field',
        nameZh: '北区运动场',
        fullname: 'North Playing Field · 北区运动场',
        center: [750, 490],
        height: 0.1,
        category: 'landscape',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [680, 460], [820, 460], [820, 520], [680, 520], [680, 460],
        ]],
      },
    },
  ],
};

export default hkustData;
