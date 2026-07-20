'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation/Navigation';
import AIClubBanner from '@/components/AIClubBanner/AIClubBanner';
import ClubCard from '@/components/ClubCard/ClubCard';
import { useI18n } from '@/lib/i18n';
import { Users, Search, X } from 'lucide-react';

type ClubCategoryKey =
  | 'core'
  | 'culture'
  | 'sports'
  | 'residential'
  | 'academic'
  | 'independent'
  | 'dag';

interface Club {
  id: string;
  name: string;
  nameEn: string;
  nameZh: string;
  description: string;
  descriptionEn: string;
  descriptionZh: string;
  category: ClubCategoryKey;
  highlight?: boolean;
}

interface CategoryMeta {
  key: ClubCategoryKey;
  label: string;
  labelZh: string;
  color: string;
  bgColor: string;
}

const CATEGORIES: CategoryMeta[] = [
  { key: 'core', label: 'Student Union', labelZh: '学生会核心', color: '#d4a84b', bgColor: 'rgba(212,168,75,0.15)' },
  { key: 'culture', label: 'Art & Culture', labelZh: '艺术文化', color: '#818CF8', bgColor: 'rgba(129,140,248,0.15)' },
  { key: 'sports', label: 'Sports', labelZh: '体育运动', color: '#34D399', bgColor: 'rgba(52,211,153,0.15)' },
  { key: 'residential', label: 'Residential Halls', labelZh: '书院', color: '#60A5FA', bgColor: 'rgba(96,165,250,0.15)' },
  { key: 'academic', label: 'Academic & Professional', labelZh: '学术专业', color: '#F59E0B', bgColor: 'rgba(245,158,11,0.15)' },
  { key: 'independent', label: 'Interest & Service', labelZh: '兴趣服务', color: '#F472B6', bgColor: 'rgba(244,114,182,0.15)' },
  { key: 'dag', label: 'Department Teams', labelZh: '学院代表队', color: '#A78BFA', bgColor: 'rgba(167,139,250,0.15)' },
];

// ─── ALL HKUST STUDENT ORGANIZATIONS ───────────────────────────────────────────
const ALL_CLUBS: Club[] = [
  // ════════════════════════ STUDENT UNION CORE ════════════════════════════════
  {
    id: 'su-exec',
    name: "Students' Union Executive Committee",
    nameEn: "Students' Union Executive Committee",
    nameZh: '学生会常务委员会',
    description: '学生会执行委员会 — 组织全校性活动,代表学生权益',
    descriptionEn: "The main elected cabinet; organizes university-wide events and represents student interests.",
    descriptionZh: '学生会执行委员会 — 组织全校性活动,代表学生权益。',
    category: 'core',
  },
  {
    id: 'su-council',
    name: 'Students Union Council',
    nameEn: 'Students Union Council',
    nameZh: '学生会评议会',
    description: '学生会立法机构,监督各项学生活动与财务',
    descriptionEn: 'The legislative body of the Students Union; oversees all student activities and finances.',
    descriptionZh: '学生会评议会 — 立法机构,监督学生活动与财务。',
    category: 'core',
  },
  {
    id: 'su-editorial',
    name: 'Editorial Board',
    nameEn: 'Editorial Board',
    nameZh: '编辑委员会',
    description: '出版学生报刊,记录校园生活与观点',
    descriptionEn: 'Publishes the student newspaper and editorial content across campus.',
    descriptionZh: '编辑委员会 — 出版学生报刊,记录校园生活与观点。',
    category: 'core',
  },

  // ════════════════════════ ART & CULTURE ════════════════════════════════════
  {
    id: 'art-club',
    name: 'Art Club',
    nameEn: 'Art Club',
    nameZh: '艺术学会',
    description: '绘画、设计、手工艺术创作与展览',
    descriptionEn: 'Visual arts, painting, drawing, design and craft exhibitions.',
    descriptionZh: '视觉艺术、绘画、设计与手工创作。',
    category: 'culture',
  },
  {
    id: 'drama-society',
    name: 'Drama Society',
    nameEn: 'Drama Society',
    nameZh: '戏剧学会',
    description: '年度剧场制作,表演与戏剧创作',
    descriptionEn: 'Theatrical productions, performances and dramatic writing.',
    descriptionZh: '戏剧学会 — 年度剧场制作,表演与戏剧创作。',
    category: 'culture',
  },
  {
    id: 'film-society',
    name: 'Film Society',
    nameEn: 'Film Society',
    nameZh: '电影学会',
    description: '电影放映、影评、拍摄工作坊与电影节',
    descriptionEn: 'Film screenings, reviews, production workshops and film festivals.',
    descriptionZh: '电影学会 — 放映、影评、拍摄与电影节。',
    category: 'culture',
  },
  {
    id: 'photo-society',
    name: 'Photographic Society',
    nameEn: 'Photographic Society',
    nameZh: '摄影学会',
    description: '摄影技巧学习、外拍与摄影展',
    descriptionEn: 'Photography technique workshops, photo excursions and exhibitions.',
    descriptionZh: '摄影学会 — 技巧学习、外拍与摄影展。',
    category: 'culture',
  },
  {
    id: 'university-choir',
    name: 'University Choir',
    nameEn: 'University Choir',
    nameZh: '大学合唱团',
    description: '合唱演出、校园节庆与慈善音乐会',
    descriptionEn: 'Choral performances, campus festivals and charity concerts.',
    descriptionZh: '合唱演出、校园节庆与慈善音乐会。',
    category: 'culture',
  },
  {
    id: 'band-society',
    name: 'The Band Society',
    nameEn: 'The Band Society',
    nameZh: '乐队学会',
    description: '流行与摇滚乐队、排练与现场演出',
    descriptionEn: 'Pop and rock bands, rehearsals and live performances.',
    descriptionZh: '流行与摇滚乐队、排练与现场演出。',
    category: 'culture',
  },
  {
    id: 'orchestra',
    name: 'University Philharmonic Orchestra',
    nameEn: 'University Philharmonic Orchestra',
    nameZh: '大学交响乐团',
    description: '西方古典管弦乐演奏与合奏',
    descriptionEn: 'Western classical orchestral music and ensemble performances.',
    descriptionZh: '交响乐团 — 西方古典管弦乐演奏与合奏。',
    category: 'culture',
  },
  {
    id: 'chinese-orchestra',
    name: 'Chinese Orchestra',
    nameEn: 'Chinese Orchestra',
    nameZh: '中乐团',
    description: '传统中乐合奏、民乐演出与文化交流',
    descriptionEn: 'Traditional Chinese instrumental ensemble, folk music performances and cultural exchange.',
    descriptionZh: '传统中乐合奏、民乐演出与文化交流。',
    category: 'culture',
  },
  {
    id: 'dance-society',
    name: 'Dance Society',
    nameEn: 'Dance Society',
    nameZh: '舞蹈学会',
    description: '舞蹈训练、演出与校际比赛',
    descriptionEn: 'Dance training, performances and inter-collegiate competitions.',
    descriptionZh: '舞蹈训练、演出与校际比赛。',
    category: 'culture',
  },
  {
    id: 'comics-anime',
    name: 'Comics and Animation Society',
    nameEn: 'Comics and Animation Society',
    nameZh: '动漫学会',
    description: '动漫、漫画与动画创作文化交流',
    descriptionEn: 'Anime, manga and animation culture, creation and exchange.',
    descriptionZh: '动漫、漫画与动画创作文化交流。',
    category: 'culture',
  },
  {
    id: 'magic-club',
    name: 'Magic Club',
    nameEn: 'Magic Club',
    nameZh: '魔术学会',
    description: '近景魔术、纸牌戏法与表演工作坊',
    descriptionEn: 'Close-up magic, card tricks and performance workshops.',
    descriptionZh: '近景魔术、纸牌戏法与表演工作坊。',
    category: 'culture',
  },
  {
    id: 'korean-association',
    name: 'Korean Students Association',
    nameEn: 'Korean Students Association',
    nameZh: '韩国学生会',
    description: '韩国文化推广与韩国学生社群活动',
    descriptionEn: 'Korean culture promotion and community events for Korean students.',
    descriptionZh: '韩国文化推广与韩国学生社群活动。',
    category: 'culture',
  },
  {
    id: 'indonesian-association',
    name: 'Indonesian Students Association',
    nameEn: 'Indonesian Students Association',
    nameZh: '印尼学生会',
    description: '印尼文化推广与国际学生交流',
    descriptionEn: 'Indonesian culture promotion and international student exchange.',
    descriptionZh: '印尼文化推广与国际学生交流。',
    category: 'culture',
  },
  {
    id: 'taiwanese-association',
    name: 'Taiwanese Students Association',
    nameEn: 'Taiwanese Students Association',
    nameZh: '台湾学生会',
    description: '台湾文化活动与留学生互助社群',
    descriptionEn: 'Taiwanese cultural events and mutual support for overseas students.',
    descriptionZh: '台湾文化活动与留学生互助社群。',
    category: 'culture',
  },
  {
    id: 'sea-association',
    name: 'Southeast Asian Students Association',
    nameEn: 'Southeast Asian Students Association',
    nameZh: '东南亚学生会',
    description: '东南亚文化推广与地区学生社群',
    descriptionEn: 'Southeast Asian culture promotion and regional student community.',
    descriptionZh: '东南亚文化推广与地区学生社群。',
    category: 'culture',
  },
  {
    id: 'south-asian-society',
    name: 'South Asian Students Society',
    nameEn: 'South Asian Students Society',
    nameZh: '南亚学生会',
    description: '南亚文化推广与国际学生互助',
    descriptionEn: 'South Asian culture promotion and international student support.',
    descriptionZh: '南亚文化推广与国际学生互助。',
    category: 'culture',
  },
  {
    id: 'macanese-society',
    name: 'The Macanese Students Society',
    nameEn: 'The Macanese Students Society',
    nameZh: '澳门学生会',
    description: '澳门文化推广与本地学生社群',
    descriptionEn: 'Macanese culture promotion and local student community.',
    descriptionZh: '澳门文化推广与本地学生社群。',
    category: 'culture',
  },
  {
    id: 'muslim-society',
    name: 'Muslim Society',
    nameEn: 'Muslim Society',
    nameZh: '穆斯林学生会',
    description: '伊斯兰文化活动与穆斯林学生支援',
    descriptionEn: 'Islamic cultural activities and support for Muslim students.',
    descriptionZh: '伊斯兰文化活动与穆斯林学生支援。',
    category: 'culture',
  },
  {
    id: 'chinese-folk-art',
    name: 'Chinese Folk Art Society',
    nameEn: 'Chinese Folk Art Society',
    nameZh: '中华民族艺术学会',
    description: '中华传统文化艺术传承与表演',
    descriptionEn: 'Traditional Chinese folk art heritage and performance.',
    descriptionZh: '中华传统文化艺术传承与表演。',
    category: 'culture',
  },
  {
    id: 'culinary-society',
    name: 'Culinary Art and Culture Society',
    nameEn: 'Culinary Art and Culture Society',
    nameZh: '烹饪文化学会',
    description: '烹饪工作坊、美食文化与料理比赛',
    descriptionEn: 'Cooking workshops, food culture and culinary competitions.',
    descriptionZh: '烹饪工作坊、美食文化与料理比赛。',
    category: 'culture',
  },
  {
    id: 'intl-cuisine-society',
    name: 'International Cuisine Society',
    nameEn: 'International Cuisine Society',
    nameZh: '国际美食学会',
    description: '各国美食文化交流与料理分享',
    descriptionEn: 'Cross-cultural culinary exchange and food sharing.',
    descriptionZh: '各国美食文化交流与料理分享。',
    category: 'culture',
  },

  // ════════════════════════ SPORTS ════════════════════════════════════════════
  {
    id: 'dragon-boat',
    name: 'Dragon Boat Club',
    nameEn: 'Dragon Boat Club',
    nameZh: '龙舟会',
    description: '龙舟训练与比赛,校际传统强队',
    descriptionEn: 'Dragon boat training and competitions — one of HKUST most visible teams.',
    descriptionZh: '龙舟训练与比赛,校际传统强队。',
    category: 'sports',
  },
  {
    id: 'volleyball',
    name: 'Volleyball Club',
    nameEn: 'Volleyball Club',
    nameZh: '排球会',
    description: '排球训练、联赛与校际比赛',
    descriptionEn: 'Volleyball training, league play and inter-collegiate competitions.',
    descriptionZh: '排球训练、联赛与校际比赛。',
    category: 'sports',
  },
  {
    id: 'basketball',
    name: 'Basketball Club',
    nameEn: 'Basketball Club',
    nameZh: '篮球会',
    description: '篮球训练、联赛与校际比赛',
    descriptionEn: 'Basketball training, league play and inter-collegiate matches.',
    descriptionZh: '篮球训练、联赛与校际比赛。',
    category: 'sports',
  },
  {
    id: 'swimming',
    name: 'Swimming Club',
    nameEn: 'Swimming Club',
    nameZh: '游泳会',
    description: '游泳训练、比赛与水上安全课程',
    descriptionEn: 'Swimming training, competitions and water safety courses.',
    descriptionZh: '游泳训练、比赛与水上安全课程。',
    category: 'sports',
  },
  {
    id: 'tennis',
    name: 'Tennis Club',
    nameEn: 'Tennis Club',
    nameZh: '网球会',
    description: '网球训练与校际网球联赛',
    descriptionEn: 'Tennis training and inter-collegiate tennis league.',
    descriptionZh: '网球训练与校际网球联赛。',
    category: 'sports',
  },
  {
    id: 'badminton',
    name: 'Badminton Club',
    nameEn: 'Badminton Club',
    nameZh: '羽毛球会',
    description: '羽毛球训练与联赛',
    descriptionEn: 'Badminton training and league play.',
    descriptionZh: '羽毛球训练与联赛。',
    category: 'sports',
  },
  {
    id: 'football',
    name: 'Football Club',
    nameEn: 'Football Club',
    nameZh: '足球会',
    description: '足球训练与校际足球比赛',
    descriptionEn: 'Football training and inter-collegiate matches.',
    descriptionZh: '足球训练与校际足球比赛。',
    category: 'sports',
  },
  {
    id: 'rowing',
    name: 'Rowing Club',
    nameEn: 'Rowing Club',
    nameZh: '赛艇会',
    description: '赛艇训练与比赛',
    descriptionEn: 'Rowing training and regatta competitions.',
    descriptionZh: '赛艇训练与比赛。',
    category: 'sports',
  },
  {
    id: 'fencing',
    name: 'Fencing Club',
    nameEn: 'Fencing Club',
    nameZh: '击剑会',
    description: '击剑训练与比赛',
    descriptionEn: 'Competitive fencing training and tournaments.',
    descriptionZh: '击剑训练与比赛。',
    category: 'sports',
  },
  {
    id: 'sport-climbing',
    name: 'Sport Climbing Students Society',
    nameEn: 'Sport Climbing Students Society',
    nameZh: '攀岩学会',
    description: '室内攀岩训练与户外攀登',
    descriptionEn: 'Indoor climbing training and outdoor rock climbing.',
    descriptionZh: '室内攀岩训练与户外攀登。',
    category: 'sports',
  },
  {
    id: 'judo',
    name: 'Judo Club',
    nameEn: 'Judo Club',
    nameZh: '柔道会',
    description: '柔道训练与段位考取',
    descriptionEn: 'Judo training and belt grading.',
    descriptionZh: '柔道训练与段位考取。',
    category: 'sports',
  },
  {
    id: 'karate',
    name: 'Karate Club',
    nameEn: 'Karate Club',
    nameZh: '空手道会',
    description: '空手道训练与段位考取',
    descriptionEn: 'Karate training and belt grading.',
    descriptionZh: '空手道训练与段位考取。',
    category: 'sports',
  },
  {
    id: 'taekwondo',
    name: 'Tae Kwon Do Club',
    nameEn: 'Tae Kwon Do Club',
    nameZh: '跆拳道会',
    description: '跆拳道训练与段位考取',
    descriptionEn: 'Taekwondo training and belt grading.',
    descriptionZh: '跆拳道训练与段位考取。',
    category: 'sports',
  },
  {
    id: 'kendo',
    name: 'Kendo Club',
    nameEn: 'Kendo Club',
    nameZh: '剑道会',
    description: '日本剑道训练与比赛',
    descriptionEn: 'Japanese sword fencing (kendo) training and competitions.',
    descriptionZh: '日本剑道训练与比赛。',
    category: 'sports',
  },
  {
    id: 'shaolin-martial',
    name: 'Shaolin Martial Arts Society',
    nameEn: 'Shaolin Martial Arts Society',
    nameZh: '少林武术学会',
    description: '中国武术、功夫与体能训练',
    descriptionEn: 'Chinese martial arts, kung fu and physical training.',
    descriptionZh: '中国武术、功夫与体能训练。',
    category: 'sports',
  },
  {
    id: 'wing-chun',
    name: 'Wing Chun Martial Arts Society',
    nameEn: 'Wing Chun Martial Arts Society',
    nameZh: '咏春学会',
    description: '咏春拳法训练与内家功夫',
    descriptionEn: 'Wing Chun martial arts training and internal kung fu.',
    descriptionZh: '咏春拳法训练与内家功夫。',
    category: 'sports',
  },
  {
    id: 'tai-chi',
    name: 'Tai Chi Society',
    nameEn: 'Tai Chi Society',
    nameZh: '太极拳学会',
    description: '太极拳养生与内功训练',
    descriptionEn: 'Tai chi wellness and internal energy cultivation.',
    descriptionZh: '太极拳养生与内功训练。',
    category: 'sports',
  },
  {
    id: 'rugby',
    name: 'Rugby Club',
    nameEn: 'Rugby Club',
    nameZh: '橄榄球会',
    description: '橄榄球训练与校际联赛',
    descriptionEn: 'Rugby training and inter-collegiate league.',
    descriptionZh: '橄榄球训练与校际联赛。',
    category: 'sports',
  },
  {
    id: 'handball',
    name: 'Handball Club',
    nameEn: 'Handball Club',
    nameZh: '手球会',
    description: '手球训练与比赛',
    descriptionEn: 'Handball training and competitions.',
    descriptionZh: '手球训练与比赛。',
    category: 'sports',
  },
  {
    id: 'futsal',
    name: 'Futsal Club',
    nameEn: 'Futsal Club',
    nameZh: '五人足球会',
    description: '室内五人足球训练与比赛',
    descriptionEn: 'Indoor futsal training and matches.',
    descriptionZh: '室内五人足球训练与比赛。',
    category: 'sports',
  },
  {
    id: 'gym-fitness',
    name: 'Gym and Fitness Society',
    nameEn: 'Gym and Fitness Society',
    nameZh: '健身学会',
    description: '健身房训练指导与健身课程',
    descriptionEn: 'Gym training guidance and fitness classes.',
    descriptionZh: '健身房训练指导与健身课程。',
    category: 'sports',
  },
  {
    id: 'archery',
    name: 'Archery Club',
    nameEn: 'Archery Club',
    nameZh: '射箭会',
    description: '射箭训练与靶场练习',
    descriptionEn: 'Target archery training and range practice.',
    descriptionZh: '射箭训练与靶场练习。',
    category: 'sports',
  },
  {
    id: 'squash',
    name: 'Squash Club',
    nameEn: 'Squash Club',
    nameZh: '壁球会',
    description: '壁球训练与比赛',
    descriptionEn: 'Squash training and competitions.',
    descriptionZh: '壁球训练与比赛。',
    category: 'sports',
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis Club',
    nameEn: 'Table Tennis Club',
    nameZh: '乒乓球会',
    description: '乒乓球训练与联赛',
    descriptionEn: 'Table tennis training and league play.',
    descriptionZh: '乒乓球训练与联赛。',
    category: 'sports',
  },
  {
    id: 'netball',
    name: 'Netball Club',
    nameEn: 'Netball Club',
    nameZh: '篮网球会',
    description: '篮网球训练与比赛',
    descriptionEn: 'Netball training and matches.',
    descriptionZh: '篮网球训练与比赛。',
    category: 'sports',
  },
  {
    id: 'track-field',
    name: 'Track and Field Club',
    nameEn: 'Track and Field Club',
    nameZh: '田径会',
    description: '田径训练与校际运动会',
    descriptionEn: 'Athletics training and inter-collegiate games.',
    descriptionZh: '田径训练与校际运动会。',
    category: 'sports',
  },
  {
    id: 'cricket',
    name: 'Cricket Club',
    nameEn: 'Cricket Club',
    nameZh: '板球会',
    description: '板球训练与校际联赛',
    descriptionEn: 'Cricket training and inter-collegiate league.',
    descriptionZh: '板球训练与校际联赛。',
    category: 'sports',
  },
  {
    id: 'dodgeball',
    name: 'Dodgeball Club',
    nameEn: 'Dodgeball Club',
    nameZh: '躲避球会',
    description: '躲避球训练与趣味联赛',
    descriptionEn: 'Dodgeball training and fun league.',
    descriptionZh: '躲避球训练与趣味联赛。',
    category: 'sports',
  },
  {
    id: 'woodball',
    name: 'Woodball Club',
    nameEn: 'Woodball Club',
    nameZh: '木球会',
    description: '木球运动训练与比赛',
    descriptionEn: 'Woodball training and competitions.',
    descriptionZh: '木球运动训练与比赛。',
    category: 'sports',
  },
  {
    id: 'rope-skipping',
    name: 'Rope Skipping Club',
    nameEn: 'Rope Skipping Club',
    nameZh: '跳绳会',
    description: '花式跳绳训练与比赛',
    descriptionEn: 'Jump rope training and rope skipping competitions.',
    descriptionZh: '花式跳绳训练与比赛。',
    category: 'sports',
  },
  {
    id: 'korfball',
    name: 'Korfball Club',
    nameEn: 'Korfball Club',
    nameZh: '合球会',
    description: '混合组别合球训练与比赛',
    descriptionEn: 'Mixed-gender korfball training and competitions.',
    descriptionZh: '混合组别合球训练与比赛。',
    category: 'sports',
  },
  {
    id: ' Tchoukball',
    name: 'Tchoukball Club',
    nameEn: 'Tchoukball Club',
    nameZh: '巧固球会',
    description: '巧固球训练与比赛',
    descriptionEn: 'Tchoukball training and competitions.',
    descriptionZh: '巧固球训练与比赛。',
    category: 'sports',
  },
  {
    id: 'cheerleading',
    name: 'Competitive Cheerleading Club',
    nameEn: 'Competitive Cheerleading Club',
    nameZh: '啦啦队',
    description: '竞技啦啦队训练与比赛',
    descriptionEn: 'Competitive cheerleading routines and performances.',
    descriptionZh: '竞技啦啦队训练与比赛。',
    category: 'sports',
  },
  {
    id: 'distance-running',
    name: "Distance Runner's Club",
    nameEn: "Distance Runner's Club",
    nameZh: '长跑会',
    description: '长跑训练与马拉松赛事',
    descriptionEn: 'Long-distance running training and marathon events.',
    descriptionZh: '长跑训练与马拉松赛事。',
    category: 'sports',
  },

  // ════════════════════════ RESIDENTIAL HALLS ════════════════════════════════
  {
    id: 'house1',
    name: 'House I Students Association',
    nameEn: 'House I Students Association',
    nameZh: '第一书院学生会',
    description: 'House I — 科大第一书院,约600名本科生,跨学科社群',
    descriptionEn: 'House I — the first residential college, ~600 undergraduates from all schools.',
    descriptionZh: '科大第一书院,约600名本科生,跨学科社群。',
    category: 'residential',
  },
  {
    id: 'vertex',
    name: 'VERTEX · House II',
    nameEn: 'VERTEX · House II',
    nameZh: 'VERTEX · 第二书院',
    description: 'VERTEX — 以创意与社区精神著称的第二书院',
    descriptionEn: 'VERTEX — House II, known for creativity and strong community spirit.',
    descriptionZh: '以创意与社区精神著称的第二书院。',
    category: 'residential',
  },
  {
    id: 'glacier',
    name: 'Glacier · House III',
    nameEn: 'Glacier · House III',
    nameZh: 'Glacier · 第三书院',
    description: 'Glacier — 环山面海的第三书院,户外氛围浓厚',
    descriptionEn: 'Glacier — House III surrounded by hills and sea, strong outdoor culture.',
    descriptionZh: '环山面海的第三书院,户外氛围浓厚。',
    category: 'residential',
  },
  {
    id: 'vista',
    name: 'Vista · House IV',
    nameEn: 'Vista · House IV',
    nameZh: 'Vista · 第四书院',
    description: 'Vista — 视野开阔的第四书院,海景尽收眼底',
    descriptionEn: 'Vista — House IV with panoramic sea views and open culture.',
    descriptionZh: '视野开阔的第四书院,海景尽收眼底。',
    category: 'residential',
  },
  {
    id: 'endeavour',
    name: 'Endeavour · House V',
    nameEn: 'Endeavour · House V',
    nameZh: 'Endeavour · 第五书院',
    description: 'Endeavour — 最新落成的第五书院,创新与传统并重',
    descriptionEn: "Endeavour — House V, the newest hall balancing innovation and tradition.",
    descriptionZh: '最新落成的第五书院,创新与传统并重。',
    category: 'residential',
  },

  // ════════════════════════ ACADEMIC & PROFESSIONAL ══════════════════════════
  {
    id: 'eng-su',
    name: 'Engineering Students Union',
    nameEn: 'Engineering Students Union',
    nameZh: '工学院学生会',
    description: '工程学院全体学生的代表机构,最大规模学院学生会',
    descriptionEn: 'The largest school union; represents all engineering students.',
    descriptionZh: '工程学院全体学生的代表机构,最大规模学院学生会。',
    category: 'academic',
  },
  {
    id: 'bus-su',
    name: 'Business Students Union',
    nameEn: 'Business Students Union',
    nameZh: '商学院学生会',
    description: '商学院学生会,首个学院学生会,职业发展资源丰富',
    descriptionEn: 'The first school union at HKUST; rich career development resources.',
    descriptionZh: '首个学院学生会,职业发展资源丰富。',
    category: 'academic',
  },
  {
    id: 'sci-su',
    name: 'Science Students Union',
    nameEn: 'Science Students Union',
    nameZh: '理学院学生会',
    description: '理学院全体学生的代表机构',
    descriptionEn: 'Represents all students in the School of Science.',
    descriptionZh: '理学院全体学生的代表机构。',
    category: 'academic',
  },
  {
    id: 'csess',
    name: 'Computer Science and Engineering Students Society',
    nameEn: 'Computer Science and Engineering Students Society',
    nameZh: '计算机科学与工程学会',
    description: 'CSESS — 最大最活跃的学术学会,编程竞赛与技术分享',
    descriptionEn: 'CSESS — the largest and most active academic society; coding contests and tech sharing.',
    descriptionZh: 'CSESS — 最大最活跃的学术学会,编程竞赛与技术分享。',
    category: 'academic',
  },
  {
    id: 'ieda',
    name: 'IEDA Students Society',
    nameEn: 'IEDA Students Society',
    nameZh: '工业工程与决策分析学会',
    description: '运筹学、数据分析与决策科学学术社群',
    descriptionEn: 'Operations research, data analytics and decision science academic community.',
    descriptionZh: '运筹学、数据分析与决策科学学术社群。',
    category: 'academic',
  },
  {
    id: 'rmbi',
    name: 'RMBI Students Association',
    nameEn: 'RMBI Students Association',
    nameZh: '风险管理学会',
    description: '风险管理与商业智能学术社群',
    descriptionEn: 'Risk management and business intelligence academic community.',
    descriptionZh: '风险管理与商业智能学术社群。',
    category: 'academic',
  },
  {
    id: 'cbe-society',
    name: 'Chemical and Biological Engineering Society',
    nameEn: 'Chemical and Biological Engineering Society',
    nameZh: '化学与生物工程学会',
    description: '化工与生物工程专业学术社群',
    descriptionEn: 'Academic society for chemical and biological engineering students.',
    descriptionZh: '化工与生物工程专业学术社群。',
    category: 'academic',
  },
  {
    id: 'cee-society',
    name: 'Civil and Environmental Engineering Society',
    nameEn: 'Civil and Environmental Engineering Society',
    nameZh: '土木与环境工程学会',
    description: '土木与环境工程专业学术社群',
    descriptionEn: 'Academic society for civil and environmental engineering students.',
    descriptionZh: '土木与环境工程专业学术社群。',
    category: 'academic',
  },
  {
    id: 'mae-society',
    name: 'Mechanical and Aerospace Engineering Society',
    nameEn: 'Mechanical and Aerospace Engineering Society',
    nameZh: '机械与航空航天工程学会',
    description: '机械与航空航天工程专业学术社群',
    descriptionEn: 'Academic society for mechanical and aerospace engineering students.',
    descriptionZh: '机械与航空航天工程专业学术社群。',
    category: 'academic',
  },
  {
    id: 'ece-society',
    name: 'Electronic and Computer Engineering Society',
    nameEn: 'Electronic and Computer Engineering Society',
    nameZh: '电子与计算机工程学会',
    description: '电子与计算机工程专业学术社群',
    descriptionEn: 'Academic society for electronic and computer engineering students.',
    descriptionZh: '电子与计算机工程专业学术社群。',
    category: 'academic',
  },
  {
    id: 'isd-society',
    name: 'Integrative Systems and Design Society',
    nameEn: 'Integrative Systems and Design Society',
    nameZh: '综合系统与设计学会',
    description: '综合系统设计、创新与跨学科项目学术社群',
    descriptionEn: 'Academic society for integrative systems design and interdisciplinary projects.',
    descriptionZh: '综合系统设计、创新与跨学科项目学术社群。',
    category: 'academic',
  },
  {
    id: 'finance-society',
    name: 'Finance Students Society',
    nameEn: 'Finance Students Society',
    nameZh: '金融学会',
    description: '金融专业学术社群,投资比赛与职业发展',
    descriptionEn: 'Finance academic society; investment competitions and career development.',
    descriptionZh: '金融专业学术社群,投资比赛与职业发展。',
    category: 'academic',
  },
  {
    id: 'economics-society',
    name: 'Economics Students Society',
    nameEn: 'Economics Students Society',
    nameZh: '经济学会',
    description: '经济学学术社群,研讨会与经济分析比赛',
    descriptionEn: 'Economics academic society; seminars and economics analysis competitions.',
    descriptionZh: '经济学学术社群,研讨会与经济分析比赛。',
    category: 'academic',
  },
  {
    id: 'accounting-society',
    name: 'Accounting Students Society',
    nameEn: 'Accounting Students Society',
    nameZh: '会计学会',
    description: '会计专业学术社群,CPA备考与职业规划',
    descriptionEn: 'Accounting academic society; CPA preparation and career planning.',
    descriptionZh: '会计专业学术社群,CPA备考与职业规划。',
    category: 'academic',
  },
  {
    id: 'marketing-society',
    name: 'Marketing Students Society',
    nameEn: 'Marketing Students Society',
    nameZh: '市场学会',
    description: '市场营销学术社群,案例比赛与品牌活动',
    descriptionEn: 'Marketing academic society; case competitions and brand activities.',
    descriptionZh: '市场营销学术社群,案例比赛与品牌活动。',
    category: 'academic',
  },

  // ════════════════════════ INDEPENDENT CLUBS ════════════════════════════════
  {
    id: 'aiesec',
    name: 'AIESEC-LC-HKUST',
    nameEn: 'AIESEC-LC-HKUST',
    nameZh: 'AIESEC 科大分会',
    description: '全球青年领导力组织,海外实习与文化交流项目',
    descriptionEn: 'Global youth leadership organization; overseas internships and cultural exchange.',
    descriptionZh: '全球青年领导力组织,海外实习与文化交流项目。',
    category: 'independent',
  },
  {
    id: 'model-un',
    name: 'Model United Nations Club',
    nameEn: 'Model United Nations Club',
    nameZh: '模拟联合国学会',
    description: '模拟联合国辩论、会议与国际视野培养',
    descriptionEn: 'Model UN debates, conferences and international perspective building.',
    descriptionZh: '模拟联合国辩论、会议与国际视野培养。',
    category: 'independent',
  },
  {
    id: 'debating-society',
    name: 'Debating Society',
    nameEn: 'Debating Society',
    nameZh: '辩论学会',
    description: '辩论技巧训练、辩论赛与公共演讲',
    descriptionEn: 'Debating skills, tournaments and public speaking development.',
    descriptionZh: '辩论技巧训练、辩论赛与公共演讲。',
    category: 'independent',
  },
  {
    id: 'esports-club',
    name: 'Esports Club',
    nameEn: 'Esports Club',
    nameZh: '电竞学会',
    description: '电竞训练、比赛与游戏社群活动',
    descriptionEn: 'Esports training, tournaments and gaming community events.',
    descriptionZh: '电竞训练、比赛与游戏社群活动。',
    category: 'independent',
  },
  {
    id: 'nature-club',
    name: 'Nature Club',
    nameEn: 'Nature Club',
    nameZh: '自然学会',
    description: '自然探索、户外远足与生态保护',
    descriptionEn: 'Nature exploration, hiking and ecological conservation.',
    descriptionZh: '自然探索、户外远足与生态保护。',
    category: 'independent',
  },
  {
    id: 'games-society',
    name: 'Games Society',
    nameEn: 'Games Society',
    nameZh: '桌游学会',
    description: '桌游聚会、策略游戏与社交活动',
    descriptionEn: 'Board game meetups, strategy games and social events.',
    descriptionZh: '桌游聚会、策略游戏与社交活动。',
    category: 'independent',
  },
  {
    id: 'christian-fellowship',
    name: 'Christian Fellowship',
    nameEn: 'Christian Fellowship',
    nameZh: '基督徒团契',
    description: '基督教信仰活动、团契聚会与社区服务',
    descriptionEn: 'Christian faith activities, fellowship gatherings and community service.',
    descriptionZh: '基督教信仰活动、团契聚会与社区服务。',
    category: 'independent',
  },
  {
    id: 'catholic-society',
    name: 'Catholic Society',
    nameEn: 'Catholic Society',
    nameZh: '天主教学生会',
    description: '天主教信仰活动、灵修与慈善服务',
    descriptionEn: 'Catholic faith activities, spiritual development and charitable service.',
    descriptionZh: '天主教信仰活动、灵修与慈善服务。',
    category: 'independent',
  },
  {
    id: 'bible-society',
    name: 'Bible Education and Exploration Society',
    nameEn: 'Bible Education and Exploration Society',
    nameZh: '圣经研读学会',
    description: '圣经学习、查经班与信仰探索',
    descriptionEn: 'Bible study, scripture exploration and faith discovery.',
    descriptionZh: '圣经学习、查经班与信仰探索。',
    category: 'independent',
  },
  {
    id: 'rotaract',
    name: 'Rotaract Club of HKUST',
    nameEn: 'Rotaract Club of HKUST',
    nameZh: '扶轮社青年团',
    description: '社区服务、国际项目与领导力培养',
    descriptionEn: 'Community service, international projects and leadership development.',
    descriptionZh: '社区服务、国际项目与领导力培养。',
    category: 'independent',
  },
  {
    id: 'student-social-service',
    name: 'Student Social Service Society',
    nameEn: 'Student Social Service Society',
    nameZh: '社会服务学会',
    description: '志愿服务、社区帮扶与社会创新项目',
    descriptionEn: 'Volunteering, community outreach and social innovation projects.',
    descriptionZh: '志愿服务、社区帮扶与社会创新项目。',
    category: 'independent',
  },
  {
    id: 'astronomy-club',
    name: 'Student Astronomy Club',
    nameEn: 'Student Astronomy Club',
    nameZh: '天文学会',
    description: '天文观测、星空拍摄与科普活动',
    descriptionEn: 'Astronomy observation, star photography and science outreach.',
    descriptionZh: '天文观测、星空拍摄与科普活动。',
    category: 'independent',
  },
  {
    id: 'yohoo-club',
    name: 'Yo-hoo Club',
    nameEn: 'Yo-hoo Club',
    nameZh: '远足学会',
    description: '徒步远足、露营与户外探险活动',
    descriptionEn: 'Hiking, camping and outdoor adventure activities.',
    descriptionZh: '徒步远足、露营与户外探险活动。',
    category: 'independent',
  },
  {
    id: 'china-entrepreneur',
    name: 'China Entrepreneur Network',
    nameEn: 'China Entrepreneur Network',
    nameZh: '中国创业网络',
    description: '创业社群、商业计划比赛与投资人脉',
    descriptionEn: 'Entrepreneurship community; business plan competitions and investor networking.',
    descriptionZh: '创业社群、商业计划比赛与投资人脉。',
    category: 'independent',
  },
  {
    id: 'mahjong-research',
    name: 'Mahjong Research Society',
    nameEn: 'Mahjong Research Society',
    nameZh: '麻雀研究学会',
    description: '麻将文化研究、比赛与社交活动',
    descriptionEn: 'Mahjong culture, tournaments and social gatherings.',
    descriptionZh: '麻将文化研究、比赛与社交活动。',
    category: 'independent',
  },
  {
    id: 'contract-bridge',
    name: 'Contract Bridge Club',
    nameEn: 'Contract Bridge Club',
    nameZh: '桥牌学会',
    description: '桥牌技巧训练与比赛',
    descriptionEn: 'Contract bridge training and competitions.',
    descriptionZh: '桥牌技巧训练与比赛。',
    category: 'independent',
  },
  {
    id: 'campus-radio',
    name: "People's Campus Radio",
    nameEn: "People's Campus Radio",
    nameZh: '校园电台',
    description: '校园广播节目、播客制作与声音艺术',
    descriptionEn: 'Campus radio programs, podcast production and audio arts.',
    descriptionZh: '校园广播节目、播客制作与声音艺术。',
    category: 'independent',
  },
  {
    id: 'oikos',
    name: 'oikos HKUST',
    nameEn: 'oikos HKUST',
    nameZh: 'oikos 可持续发展学会',
    description: '可持续发展与商业伦理倡导',
    descriptionEn: 'Sustainability and ethics in business advocacy.',
    descriptionZh: '可持续发展与商业伦理倡导。',
    category: 'independent',
  },

  // ════════════════════════ DEPARTMENT TEAMS (DAGs) ═══════════════════════════
  {
    id: 'igem',
    name: 'iGEM HKUST',
    nameEn: 'iGEM HKUST',
    nameZh: 'iGEM 科大团队',
    description: '国际基因工程机器竞赛,金牌/银牌得奖团队',
    descriptionEn: 'International Genetically Engineered Machine competition — gold/silver medal winners.',
    descriptionZh: '国际基因工程机器竞赛,金牌/银牌得奖团队。',
    category: 'dag',
  },
  {
    id: 'robomaster',
    name: 'RoboMaster ENTERPRIZE',
    nameEn: 'RoboMaster ENTERPRIZE',
    nameZh: ' RoboMaster ENTERPRIZE',
    description: 'DJI RoboMaster机甲大师赛,机器人工程竞赛',
    descriptionEn: 'DJI RoboMaster robotics competition team.',
    descriptionZh: 'DJI RoboMaster机甲大师赛,机器人工程竞赛。',
    category: 'dag',
  },
  {
    id: 'red-bird',
    name: 'Red Bird Racing (EVRT)',
    nameEn: 'Red Bird Racing (EVRT)',
    nameZh: '红雀车队 (EVRT)',
    description: '电动方程式赛车工程竞赛',
    descriptionEn: 'Electric vehicle engineering competition team.',
    descriptionZh: '电动方程式赛车工程竞赛。',
    category: 'dag',
  },
  {
    id: 'aero-team',
    name: 'Aero Team',
    nameEn: 'Aero Team',
    nameZh: '航空工程团队',
    description: '航空航天工程竞赛与无人机研发',
    descriptionEn: 'Aerospace engineering competition and UAV research.',
    descriptionZh: '航空航天工程竞赛与无人机研发。',
    category: 'dag',
  },
  {
    id: 'wise',
    name: 'Women in Science and Engineering (WISE)',
    nameEn: 'Women in Science and Engineering (WISE)',
    nameZh: '理工女性学会 (WISE)',
    description: '理工女性社群、导师计划与职业发展',
    descriptionEn: 'Women in STEM community, mentorship and career development.',
    descriptionZh: '理工女性社群、导师计划与职业发展。',
    category: 'dag',
  },
  {
    id: 'astro-simplex',
    name: '180 Degree Consulting',
    nameEn: '180 Degree Consulting',
    nameZh: '180度咨询学会',
    description: '商业咨询项目与非营利组织战略支持',
    descriptionEn: 'Business consulting projects and non-profit strategy support.',
    descriptionZh: '商业咨询项目与非营利组织战略支持。',
    category: 'dag',
  },
  {
    id: 'mafm-quant',
    name: 'MAFM Quant Trading Society',
    nameEn: 'MAFM Quant Trading Society',
    nameZh: '金融数学量化交易学会',
    description: '量化交易策略、算法与金融市场研究',
    descriptionEn: 'Quantitative trading strategies, algorithms and financial market research.',
    descriptionZh: '量化交易策略、算法与金融市场研究。',
    category: 'dag',
  },
  {
    id: 'enactus',
    name: 'Enactus HKUST',
    nameEn: 'Enactus HKUST',
    nameZh: 'Enactus 科大',
    description: '社会创业项目与可持续发展实践',
    descriptionEn: 'Social entrepreneurship projects and sustainable development practice.',
    descriptionZh: '社会创业项目与可持续发展实践。',
    category: 'dag',
  },
  {
    id: 'traders-ust',
    name: 'Traders@UST',
    nameEn: 'Traders@UST',
    nameZh: 'Traders@UST 交易学会',
    description: '投资交易训练、模拟盘比赛与金融社群',
    descriptionEn: 'Investment trading training, sim trading competitions and financial community.',
    descriptionZh: '投资交易训练、模拟盘比赛与金融社群。',
    category: 'dag',
  },
  {
    id: 'aiche',
    name: 'AIChE HKUST Student Chapter',
    nameEn: 'AIChE HKUST Student Chapter',
    nameZh: '美国化工学会科大分会',
    description: '美国化工学会学生分会,行业网络与技术交流',
    descriptionEn: 'American Institute of Chemical Engineers student chapter; industry networking.',
    descriptionZh: '美国化工学会学生分会,行业网络与技术交流。',
    category: 'dag',
  },
  {
    id: 'asce',
    name: 'ASCE HKUST Student Chapter',
    nameEn: 'ASCE HKUST Student Chapter',
    nameZh: '美国土木工程师学会科大分会',
    description: '美国土木工程师学会学生分会,行业交流',
    descriptionEn: 'American Society of Civil Engineers student chapter; industry exchange.',
    descriptionZh: '美国土木工程师学会学生分会,行业交流。',
    category: 'dag',
  },
  {
    id: 'ultimate-frisbee',
    name: 'Ultimate Frisbee Club',
    nameEn: 'Ultimate Frisbee Club',
    nameZh: '极限飞盘会',
    description: '极限飞盘训练与比赛',
    descriptionEn: 'Ultimate frisbee training and competitions.',
    descriptionZh: '极限飞盘训练与比赛。',
    category: 'dag',
  },
  {
    id: 'water-sports',
    name: 'Water Sports Club',
    nameEn: 'Water Sports Club',
    nameZh: '水上运动学会',
    description: '帆船、皮划艇等水上运动训练',
    descriptionEn: 'Sailing, kayaking and other water sports training.',
    descriptionZh: '帆船、皮划艇等水上运动训练。',
    category: 'dag',
  },
  {
    id: 'particles',
    name: 'Particles — Science Student Music Band',
    nameEn: 'Particles — Science Student Music Band',
    nameZh: 'Particles 科学音乐乐队',
    description: '理学院学生组成的跨学科音乐乐队',
    descriptionEn: 'Music band formed by science school students.',
    descriptionZh: '理学院学生组成的跨学科音乐乐队。',
    category: 'dag',
  },
  {
    id: 'tunatics',
    name: 'Tunatics A Cappella',
    nameEn: 'Tunatics A Cappella',
    nameZh: 'Tunatics 无伴奏合唱团',
    description: '无伴奏人声合唱团,演出遍布校园',
    descriptionEn: 'A cappella choir performing across campus.',
    descriptionZh: '无伴奏人声合唱团,演出遍布校园。',
    category: 'dag',
  },
];

// AI X SCI-FI CLUB — featured highlight (prepended separately)
const AI_CLUB: Club = {
  id: 'ai-scifi',
  name: 'AI X SCI-FI CLUB',
  nameEn: 'AI X SCI-FI CLUB',
  nameZh: 'AI X 科幻学会',
  description: '探索AI与科幻的交汇点,技术分享与创意碰撞',
  descriptionEn: 'Where AI meets Science Fiction — flagship student tech society for AI exploration and sci-fi creativity.',
  descriptionZh: '探索AI与科幻的交汇点,技术分享与创意碰撞。',
  category: 'core',
  highlight: true,
};

export default function ClubsPage() {
  const { t, locale } = useI18n();
  const isZh = locale === 'zh';
  const [activeCategory, setActiveCategory] = useState<ClubCategoryKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryMeta = (key: ClubCategoryKey) =>
    CATEGORIES.find((c) => c.key === key)!;

  const filteredClubs = ALL_CLUBS.filter((club) => {
    const matchesCategory = activeCategory === 'all' || club.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      club.nameEn.toLowerCase().includes(q) ||
      club.nameZh.includes(q) ||
      club.descriptionEn.toLowerCase().includes(q) ||
      club.descriptionZh.includes(q);
    return matchesCategory && matchesSearch;
  });

  const aiClubCard = (
    <ClubCard
      club={{
        name: AI_CLUB.name,
        nameEn: AI_CLUB.nameEn,
        description: isZh ? AI_CLUB.descriptionZh : AI_CLUB.descriptionEn,
        highlight: true,
      }}
      index={0}
    />
  );

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navigation showBackButton title={isZh ? '社团' : 'Clubs'} />

      <div className="relative z-10 pt-24 md:pt-32 pb-20 px-4 md:px-6">
        <div className="container-hkust mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#003366] to-[#1a4d7c] rounded-full flex items-center justify-center border-4 border-[#996600]/30 shadow-2xl">
                <Users className="w-12 h-12 text-[#996600]" />
              </div>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-gradient-gold">{isZh ? '社团' : 'Clubs'}</span>
            </h1>
            <p className="text-xl text-[#C0C0C0] max-w-2xl mx-auto">
              {isZh
                ? '超过100个学生组织,从体育竞技到艺术文化,从学术学会到社区服务'
                : '100+ student organizations — from sports and arts to academics and community service'}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#996600]/15 border border-[#996600]/30 text-[#d4a84b] text-xs">
              <span>{ALL_CLUBS.length + 1}</span>
              <span>{isZh ? '个社团' : 'societies registered'}</span>
            </div>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-transparent via-[#996600] to-transparent mx-auto" />
          </motion.div>

          {/* AI X SCI-FI CLUB — Featured hero card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#996600] mb-3 text-center">
              {isZh ? '特别推荐' : 'Featured Society'}
            </p>
            {aiClubCard}
          </motion.div>

          {/* Search + Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isZh ? '搜索社团名称或关键词...' : 'Search societies...'}
                className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#996600]/50 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#996600] text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {isZh ? '全部' : 'All'}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                  }`}
                  style={activeCategory === cat.key ? { background: cat.color } : {}}
                >
                  {isZh ? cat.labelZh : cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results count */}
          <div className="mb-4 text-xs text-white/40 text-center">
            {filteredClubs.length === 0
              ? isZh ? '没有找到匹配的社团' : 'No matching societies found'
              : isZh
              ? `显示 ${filteredClubs.length} 个社团`
              : `Showing ${filteredClubs.length} societies`}
          </div>

          {/* Club grid */}
          {filteredClubs.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredClubs.map((club, index) => {
                const meta = getCategoryMeta(club.category);
                return (
                  <motion.div
                    key={club.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                  >
                    <div
                      className="relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      style={{
                        background: 'rgba(0,18,50,0.6)',
                        borderColor: 'rgba(153,102,0,0.2)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = meta.color + '60';
                        (e.currentTarget as HTMLElement).style.background = meta.bgColor;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(153,102,0,0.2)';
                        (e.currentTarget as HTMLElement).style.background = 'rgba(0,18,50,0.6)';
                      }}
                    >
                      {/* Category badge */}
                      <div
                        className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold mb-2"
                        style={{ background: meta.color + '25', color: meta.color }}
                      >
                        {isZh ? meta.labelZh : meta.label}
                      </div>

                      {/* Name */}
                      <h4 className="text-base font-bold text-white mb-0.5 group-hover:text-[#996600] transition-colors leading-tight">
                        {isZh ? club.nameZh : club.nameEn}
                      </h4>
                      <p className="text-[10px] text-white/40 font-medium mb-2">
                        {club.nameEn}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-white/70 leading-relaxed">
                        {isZh ? club.descriptionZh : club.descriptionEn}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <Search className="w-8 h-8 text-white/30" />
              </div>
              <p className="text-white/50 text-sm">
                {isZh ? '没有找到匹配的社团,试试其他关键词' : 'No matching societies. Try a different search term.'}
              </p>
            </motion.div>
          )}

          {/* HKUSTSU link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="glass rounded-2xl p-8 border border-[#996600]/30">
              <h3 className="text-xl font-bold text-white mb-2">
                {isZh ? '更多社团信息' : 'Explore All Societies'}
              </h3>
              <p className="text-white/60 text-sm mb-5">
                {isZh
                  ? 'HKUSTSU 官方网站收录全部学生社团'
                  : 'Official HKUST Students Union directory of all student organizations'}
              </p>
              <a
                href="https://su.hkust.edu.hk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#996600] to-[#d4a84b] text-white font-semibold hover:shadow-lg transition-all"
              >
                {isZh ? '访问 HKUSTSU 官网' : 'Visit HKUSTSU Official'}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <AIClubBanner />
    </main>
  );
}
