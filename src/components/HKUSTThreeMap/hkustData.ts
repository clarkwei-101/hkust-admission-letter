// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 宋夏天Dazzle / Based on three-scope-map-skill
// 作者全平台ID：宋夏天Dazzle；公众号：送你整个夏天
// Source: https://github.com/songsummer920-dazzle/three-scope-map-skill
// Adapted for HKUST campus map — realistic building footprints & multi-level towers

import type { GeoFeatureCollection } from './hkustGeo';

// HKUST real-world reference (relative positions, normalised to 1000 × 600):
// - North (top): south China sea coast
// - South (bottom): hill / Clear Water Bay Road
// - West (left): S.H. Ho College area
// - East (right): Lo Ka Chung Building / Engineering area

const hkustData: GeoFeatureCollection = {
  type: 'FeatureCollection',
  features: [
    // ──────────────────────── ACADEMIC ─────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'academic_building',
        name: 'Academic Building',
        nameZh: '学术楼',
        fullname: 'Academic Building · 学术楼',
        center: [310, 320],
        height: 4.5,
        category: 'academic',
        silhouette: 'podium-tower',
        story: '教学核心。LG-1 至 LG-7 平台，14 条自动扶梯串联的海景阶梯。',
      },
      // L-shape: long rectangular block + stepped podium footprint
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [250, 270], [380, 268], [382, 290],
          [395, 290], [395, 350], [340, 352],
          [340, 360], [285, 360], [283, 350],
          [240, 350], [240, 285], [248, 282], [250, 270],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'library',
        name: 'The Library',
        nameZh: '李兆基图书馆',
        fullname: 'Library · 李兆基图书馆',
        center: [520, 220],
        height: 5.2,
        category: 'academic',
        silhouette: 'tower-stack',
        story: '7 层书库 · 600+ 数据库 · 24/7 开放的海景学习空间。',
      },
      // Cube-like tall tower with recessed base
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [475, 195], [565, 195], [568, 200],
          [568, 255], [560, 258], [480, 258],
          [472, 255], [472, 200], [475, 195],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'cse_building',
        name: 'CSE Building',
        nameZh: '计算机科学大楼',
        fullname: 'CSE Building · 计算机科学大楼',
        center: [710, 200],
        height: 4.8,
        category: 'academic',
        silhouette: 'tower-stack',
        story: '11 层 · 计算机科学与工程学系所在地。',
      },
      // Slim tower with terrace / service shaft
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [668, 165], [750, 165], [752, 170],
          [752, 235], [745, 240], [672, 240],
          [665, 235], [665, 170], [668, 165],
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
        center: [115, 320],
        height: 3.4,
        category: 'academic',
        silhouette: 'podium',
        story: '悬崖边缘的世界级大气科学研究设施。',
      },
      // Wide podium with central atrium cutout simulated as two-block shape
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [70, 295], [165, 295], [168, 300],
          [168, 355], [160, 360], [75, 360],
          [68, 355], [68, 300], [70, 295],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'school_of_engineering',
        name: 'School of Engineering',
        nameZh: '工程学院',
        fullname: 'Engineering · 工程学院',
        center: [835, 290],
        height: 5.0,
        category: 'academic',
        silhouette: 'H-shape',
        story: '工学院主楼，H 形平面，分两侧实验室。',
      },
      // H-shape: two parallel wings + connector
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [775, 245], [835, 245], [835, 270],
          [890, 270], [890, 245], [895, 245],
          [895, 335], [890, 335], [890, 312],
          [835, 312], [835, 335], [775, 335],
          [775, 245],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lo_ka_chung',
        name: 'Lo Ka Chung Building',
        nameZh: '卢家聪大楼',
        fullname: 'Lo Ka Chung · 卢家聪大楼',
        center: [905, 380],
        height: 3.6,
        category: 'academic',
        silhouette: 'tower',
        story: '学务长办公 + 多功能演讲厅所在。',
      },
      // Curved-corner tower footprint
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [875, 360], [935, 360], [940, 365],
          [940, 395], [875, 395], [870, 392], [870, 365], [875, 360],
        ]],
      },
    },

    // ──────────────────────── LIFE ─────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'student_centre',
        name: 'Student Centre',
        nameZh: '学生中心',
        fullname: 'Student Centre · 学生中心',
        center: [470, 420],
        height: 3.6,
        category: 'life',
        silhouette: 'C-shape',
        story: '学生食堂 + 学生会办公室，海景咖啡厅。',
      },
      // C-shape opening to the south
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [410, 380], [535, 380], [538, 385],
          [538, 405], [520, 405], [520, 415],
          [430, 415], [430, 405], [410, 405],
          [408, 400], [408, 385], [410, 380],
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
        center: [625, 380],
        height: 3.0,
        category: 'life',
        silhouette: 'dome-podium',
        story: '1,300+ 座位，毕业典礼与大型演出场地。',
      },
      // Dome rectangular footprint
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [580, 355], [675, 355], [678, 360],
          [678, 405], [580, 405], [577, 400], [577, 360], [580, 355],
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
        center: [165, 510],
        height: 4.0,
        category: 'life',
        silhouette: 'courtyard-block',
        story: '四间书院之一，约 600 名本科生。',
      },
      // Donut-ish block (residential block with internal courtyard)
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [105, 478], [225, 478], [228, 482],
          [228, 545], [105, 545], [102, 542], [102, 482], [105, 478],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'university_centre',
        name: 'University Centre',
        nameZh: '大学中心',
        fullname: 'University Centre · 大学中心',
        center: [340, 430],
        height: 2.4,
        category: 'life',
        silhouette: 'podium',
        story: '中央平台上的学生餐厅与咖啡厅。',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [310, 405], [370, 405], [372, 410], [372, 450], [310, 450], [308, 445], [308, 410], [310, 405],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'gym',
        name: 'University Sports Hall',
        nameZh: '大学体育馆',
        fullname: 'Sports Hall · 大学体育馆',
        center: [610, 510],
        height: 1.8,
        category: 'life',
        silhouette: 'arch',
        story: '室内体育馆 + 攀岩墙 + 多功能球场。',
      },
      // Low long block (gym)
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [540, 478], [685, 478], [688, 482],
          [688, 540], [540, 540], [537, 535], [537, 482], [540, 478],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'swimming_pool',
        name: 'Swimming Pool Complex',
        nameZh: '游泳池综合体',
        fullname: 'Swimming Pool · 游泳池综合体',
        center: [435, 555],
        height: 0.6,
        category: 'life',
        silhouette: 'flat',
        story: '室外标准池 + 室内恒温池。',
      },
      // Wide flat pool deck
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [395, 535], [475, 535], [478, 540],
          [478, 572], [395, 572], [392, 568], [392, 540], [395, 535],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'east_gate',
        name: 'East Gate & Car Park',
        nameZh: '东闸停车场',
        fullname: 'East Gate · 东闸停车场',
        center: [870, 460],
        height: 0.8,
        category: 'life',
        silhouette: 'flat',
        story: '东闸入口多层停车场。',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [840, 440], [900, 440], [903, 445],
          [903, 482], [840, 482], [837, 478], [837, 445], [840, 440],
        ]],
      },
    },

    // ──────────────────────── LANDSCAPE ────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'piazza',
        name: 'The Piazza',
        nameZh: '中央广场',
        fullname: 'The Piazza · 中央广场',
        center: [445, 350],
        height: 0.15,
        category: 'landscape',
        silhouette: 'flat',
        story: '中庭下沉式广场，全校园最热门拍照地点。',
      },
      // Open plaza footprint
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [395, 325], [495, 325], [498, 330], [498, 375], [395, 375], [392, 370], [392, 330], [395, 325],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'waterfront',
        name: 'Waterfront Promenade',
        nameZh: '海滨长廊',
        fullname: 'Waterfront · 海滨长廊',
        center: [500, 110],
        height: 0.05,
        category: 'landscape',
        silhouette: 'flat',
        story: '直对清水湾南中国海，全长步行道。',
      },
      // Long thin promenade along north edge
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [180, 95], [820, 95], [823, 100],
          [823, 130], [180, 130], [177, 125], [177, 100], [180, 95],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sundial',
        name: 'The Sundial',
        nameZh: '日晷广场',
        fullname: 'The Sundial · 日晷广场',
        center: [820, 175],
        height: 0.4,
        category: 'landscape',
        silhouette: 'flat',
        story: '科大地标 — 日晷，1988 年创校至今。',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [800, 155], [845, 155], [848, 160],
          [848, 195], [800, 195], [797, 190], [797, 160], [800, 155],
        ]],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 'north_playing_field',
        name: 'North Sports Field',
        nameZh: '北区运动场',
        fullname: 'Sports Field · 北区运动场',
        center: [430, 470],
        height: 0.05,
        category: 'landscape',
        silhouette: 'flat',
        story: '田径场 + 足球场。',
      },
      // Oval-ish field, approximated as ellipse polygon
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [350, 460], [510, 460], [513, 465],
          [513, 488], [350, 488], [347, 483], [347, 465], [350, 460],
        ]],
      },
    },
  ],
};

export default hkustData;
