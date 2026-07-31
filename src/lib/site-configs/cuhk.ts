import type { SiteConfig } from '../site.config';

/**
 * CUHK — The Chinese University of Hong Kong
 * Purple + Gold brand identity
 */
const cuhk: SiteConfig = {
  key: 'cuhk',
  name: '香港中文大学',
  nameEn: 'The Chinese University of Hong Kong',
  shortCode: 'CU',
  foundedYear: 1963,
  city: 'Hong Kong',
  country: 'China',
  websiteUrl: 'https://www.cuhk.edu.hk',
  theme: {
    blue: '#4B2E83',
    gold: '#C8A951',
    gradient: { from: '#4B2E83', to: '#7B5BB5' },
    lightBlue: '#7B5BB5',
    darkBlue: '#2A1A50',
    silver: '#C0C0C0',
    highlightGold: '#E0C078',
  },
  aiClub: {
    title: 'AI SOCIETY',
    subtitle: 'PRESENT',
    description: '探索人工智能与社会科学的交汇 | AI for Social Good',
    tagline: '香港中文大学AI社团',
    websiteUrl: 'https://cyber-foundation-ten.vercel.app',
    foundedYear: 2024,
  },
  tagline: '博文约礼 · Through Learning and Temperance to Virtue',
  navItems: [
    { id: 'welcome', title: '欢迎页', titleEn: 'Welcome', icon: 'Heart', description: '校长欢迎语与重要信息', href: '/content/welcome', color: '#4B2E83' },
    { id: 'academics', title: '学习介绍', titleEn: 'Academics', icon: 'GraduationCap', description: '学院、专业与学制介绍', href: '/content/academics', color: '#5C3FA0' },
    { id: 'history', title: '校史', titleEn: 'History', icon: 'Clock', description: 'CUHK发展历程', href: '/content/history', color: '#6D50BD' },
    { id: 'campus', title: '校园建筑', titleEn: 'Campus', icon: 'Building2', description: '标志性建筑与校园地图', href: '/content/campus', color: '#7E61DA' },
    { id: 'clubs', title: '社团', titleEn: 'Clubs', icon: 'Users', description: '学生社团与招新信息', href: '/content/clubs', color: '#8F72F7' },
    { id: 'guide', title: '新生指南', titleEn: 'Guide', icon: 'BookOpen', description: '行前准备与校园生活', href: '/content/guide', color: '#A083FF' },
    { id: 'apps', title: '常用APP', titleEn: 'Apps', icon: 'Smartphone', description: '校园必备应用推荐', href: '/content/apps', color: '#B194FF' },
    { id: 'resources', title: '资源中心', titleEn: 'Resources', icon: 'Compass', description: '官方资源一站式导航', href: '/content/resources', color: '#C2A5FF' },
    { id: 'checklist', title: '入学清单', titleEn: 'Checklist', icon: 'ClipboardList', description: '入学必办事项追踪器', href: '/content/checklist', color: '#D3B6FF' },
    { id: 'testimonials', title: '学长学姐说', titleEn: 'Student Voices', icon: 'Quote', description: '学长学姐第一手经验分享', href: '/content/testimonials', color: '#E4C7FF' },
    { id: 'virtual-tour', title: '虚拟校园', titleEn: 'Virtual Tour', icon: 'MapPin', description: 'Google Maps互动导览与精选地标', href: '/content/virtual-tour', color: '#F5D8FF' },
    { id: 'campus-live', title: '实时校园', titleEn: 'Live Campus', icon: 'Radio', description: '校巴/小巴实时到站与校园路线', href: '/content/campus-live', color: '#E67E22' },
  ],
  welcome: {
    greeting: 'Welcome to CUHK',
    greetingZh: '欢迎来到香港中文大学',
    subtitle: '博文约礼 · Your Journey Begins',
    subtitleZh: '博文约礼 · 您的学术之旅由此开启',
    academicYear: '2026-2027',
    semesterDates: {
      term1: '2026年9月1日 - 2026年12月5日',
      term2: '2027年1月11日 - 2027年4月30日',
    },
    importantDates: [
      { date: '2026年8月25日', event: '新生Orientation开始', color: '#C8A951' },
      { date: '2026年9月1日', event: '秋季学期正式开学', color: '#4B2E83' },
    ],
  },
  academics: {
    schools: [
      { name: '文学院', nameEn: 'Faculty of Arts', programs: ['中国语言与文学', '英国语文', '文化研究', '历史'] },
      { name: '商学院', nameEn: 'Faculty of Business Administration', programs: ['工商管理', '会计', '金融'] },
      { name: '工程学院', nameEn: 'Faculty of Engineering', programs: ['计算机科学与工程', '电子工程', '信息工程', '系统工程'] },
      { name: '医学院', nameEn: 'Faculty of Medicine', programs: ['内外全科医学士', '护理学', '药剂学', '中医'] },
      { name: '理学院', nameEn: 'Faculty of Science', programs: ['数学', '物理', '化学', '生物'] },
    ],
  },
  history: {
    milestones: [
      { year: 1963, title: '创校', titleEn: 'Founded', description: '香港中文大学由新亚、崇基、联合三所书院合并成立', color: '#4B2E83' },
      { year: 1986, title: '第四书院', titleEn: 'Fourth College', description: '逸夫书院加入', color: '#C8A951' },
      { year: 1997, title: '医学院', titleEn: 'Medical Faculty', description: '医学院正式成立', color: '#4B2E83' },
      { year: 2014, title: 'QS亚洲前10', titleEn: 'QS Asia Top 10', description: '跻身QS亚洲大学排名前十', color: '#C8A951' },
      { year: 2023, title: 'AI时代', titleEn: 'AI Era', description: '正式推出AI for Social Good项目', color: '#4B2E83' },
    ],
  },
  campus: {
    buildings: [
      { name: '大学图书馆', nameEn: 'University Library', description: '依山而建的现代化图书馆', icon: 'Book' },
      { name: '邵逸夫楼', nameEn: 'Run Run Shaw Building', description: '课室与演讲厅集中地', icon: 'Building' },
      { name: '蒙民伟楼', nameEn: 'Mong Man Wai Building', description: '工程与科学实验室', icon: 'FlaskConical' },
      { name: '联合书院', nameEn: 'United College', description: '历史悠久的书院之一', icon: 'Building2' },
    ],
  },
  clubs: {
    categories: [
      { name: '学术科技', clubs: [
        { name: 'AI Society', nameEn: 'AI Society', description: 'AI for Social Good 项目', highlight: true },
        { name: '计算机学会', nameEn: 'Computer Science Society', description: '编程竞赛与技术分享' },
      ] },
      { name: '文化创意', clubs: [
        { name: '国乐会', nameEn: 'Chinese Music Society', description: '国乐演奏与传承' },
        { name: '辩论队', nameEn: 'Debate Society', description: '中英文辩论训练' },
      ] },
      { name: '体育运动', clubs: [
        { name: '龙舟队', nameEn: 'Dragon Boat Team', description: '传统龙舟竞技' },
        { name: '田径会', nameEn: 'Track and Field Society', description: '校队训练与比赛' },
      ] },
    ],
  },
  guide: {
    sections: [
      { title: '行前准备', titleEn: 'Before Arrival', items: [
        '办理学生签证（港澳通行证）',
        '预约宿舍（书院制）并缴纳定金',
        '准备入学文件原件',
        '购买境外意外保险',
        '预订机票与接机服务',
      ] },
      { title: '书院安排', titleEn: 'College Life', items: [
        '书院为住宿与社交核心',
        '书院活动：高桌晚宴、书院赛',
        '公共区域：饭堂、文娱室、研讨室',
      ] },
      { title: '学术准备', titleEn: 'Academic Prep', items: [
        '完成网上选课',
        '了解书院制课程（GE College）',
        '熟悉Blackboard学习系统',
      ] },
      { title: '校园生活', titleEn: 'Campus Life', items: [
        '办理学生证与八达通',
        '开通银行账户（中银香港）',
        '购买手机卡（CMHK/CSL/3）',
        '熟悉校园穿梭校巴',
      ] },
    ],
  },
  apps: {
    essential: [
      { name: 'Blackboard', category: '学习', description: '课程管理、作业提交', platform: ['iOS', 'Android', 'Web'], icon: 'GraduationCap', color: '#4B2E83' },
      { name: 'CUHK Mobile', category: '校园', description: '校园地图、设施预约', platform: ['iOS', 'Android'], icon: 'Building2', color: '#C8A951' },
      { name: 'CUHK Canteen', category: '餐饮', description: '查看食堂菜单与营业时间', platform: ['iOS', 'Android'], icon: 'UtensilsCrossed', color: '#E67E22' },
      { name: 'CUHK Shuttle', category: '交通', description: '校巴时刻表与实时位置', platform: ['iOS', 'Android'], icon: 'Bus', color: '#2E7D32' },
      { name: 'Zoom', category: '会议', description: '线上课程与会议', platform: ['iOS', 'Android', 'Web'], icon: 'Video', color: '#2D8CFF' },
    ],
  },
  assets: { heroVideo: '', campusVideo: '', audioLoop: '', logo: '' },
  socials: { instagram: 'https://instagram.com/cuhk', youtube: 'https://youtube.com/@cuhk' },
};

export default cuhk;
