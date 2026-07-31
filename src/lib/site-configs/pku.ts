import type { SiteConfig } from '../site.config';

/**
 * PKU — Peking University, mainland China
 * Classic Peking red (故宫红) + ink-dark identity — heritage + scholarship
 */
const pku: SiteConfig = {
  key: 'pku',
  name: '北京大学',
  nameEn: 'Peking University',
  shortCode: 'PKU',
  foundedYear: 1898,
  city: 'Beijing',
  country: 'China',
  websiteUrl: 'https://www.pku.edu.cn',
  theme: {
    blue: '#7B0F1A',
    gold: '#D4A84B',
    gradient: { from: '#7B0F1A', to: '#B52237' },
    lightBlue: '#B52237',
    darkBlue: '#3F0408',
    silver: '#C0C0C0',
    highlightGold: '#E8C078',
  },
  aiClub: {
    title: 'PKU AI CLUB',
    subtitle: 'PRESENT',
    description: '北大人工智能研究社 · 追求技术卓越',
    tagline: '北京大学学生AI组织',
    websiteUrl: 'https://cyber-foundation-ten.vercel.app',
    foundedYear: 2024,
  },
  tagline: '思想自由 · 兼容并包',
  navItems: [
    { id: 'welcome', title: '欢迎页', titleEn: 'Welcome', icon: 'Heart', description: '校长欢迎语', href: '/content/welcome', color: '#7B0F1A' },
    { id: 'academics', title: '院系介绍', titleEn: 'Academics', icon: 'GraduationCap', description: '院系与专业', href: '/content/academics', color: '#931D2A' },
    { id: 'history', title: '校史', titleEn: 'History', icon: 'Clock', description: '百年北大发展史', href: '/content/history', color: '#AB2B3A' },
    { id: 'campus', title: '校园建筑', titleEn: 'Campus', icon: 'Building2', description: '燕园标志性建筑', href: '/content/campus', color: '#B52237' },
    { id: 'clubs', title: '社团', titleEn: 'Clubs', icon: 'Users', description: '百团大战', href: '/content/clubs', color: '#C3292F' },
    { id: 'guide', title: '新生指南', titleEn: 'Guide', icon: 'BookOpen', description: '燕园生活', href: '/content/guide', color: '#D14648' },
    { id: 'apps', title: '常用APP', titleEn: 'Apps', icon: 'Smartphone', description: '校园必备应用', href: '/content/apps', color: '#DF5C61' },
    { id: 'resources', title: '资源中心', titleEn: 'Resources', icon: 'Compass', description: '官方资源导航', href: '/content/resources', color: '#E0737A' },
    { id: 'checklist', title: '入学清单', titleEn: 'Checklist', icon: 'ClipboardList', description: '入学必办事项', href: '/content/checklist', color: '#EE8A93' },
    { id: 'testimonials', title: '学长学姐说', titleEn: 'Student Voices', icon: 'Quote', description: '燕园故事', href: '/content/testimonials', color: '#F4A1AC' },
    { id: 'virtual-tour', title: '虚拟校园', titleEn: 'Virtual Tour', icon: 'MapPin', description: '燕园虚拟游览', href: '/content/virtual-tour', color: '#FAB8C5' },
    { id: 'campus-live', title: '实时校园', titleEn: 'Live Campus', icon: 'Radio', description: '校园巴士实时', href: '/content/campus-live', color: '#FF6B35' },
  ],
  welcome: {
    greeting: 'Welcome to PKU',
    greetingZh: '欢迎来到北京大学',
    subtitle: '思想自由 · 兼容并包',
    subtitleZh: '您的燕园时光由此开启',
    academicYear: '2026-2027',
    semesterDates: {
      term1: '2026年9月14日 - 2027年1月10日',
      term2: '2027年2月22日 - 2027年6月20日',
    },
    importantDates: [
      { date: '2026年9月10日', event: '新生报到', color: '#D4A84B' },
      { date: '2026年9月14日', event: '秋季学期正式开学', color: '#7B0F1A' },
    ],
  },
  academics: {
    schools: [
      { name: '数学科学学院', nameEn: 'School of Mathematical Sciences', programs: ['数学与应用数学', '统计学', '信息与计算科学'] },
      { name: '物理学院', nameEn: 'School of Physics', programs: ['物理学', '大气与海洋科学'] },
      { name: '信息科学技术学院', nameEn: 'School of Electronics Engineering and Computer Science', programs: ['计算机科学与技术', '电子信息科学与技术', '智能科学与技术', '软件工程'] },
      { name: '经济学院', nameEn: 'School of Economics', programs: ['经济学', '金融学'] },
      { name: '光华管理学院', nameEn: 'Guanghua School of Management', programs: ['工商管理', '会计学', '市场营销'] },
      { name: '中文系', nameEn: 'Department of Chinese Language and Literature', programs: ['汉语言文学', '中国古典文献学'] },
    ],
  },
  history: {
    milestones: [
      { year: 1898, title: '戊戌变法', titleEn: 'Hundred Days Reform', description: '京师大学堂创立', color: '#7B0F1A' },
      { year: 1912, title: '更名为北京大学', titleEn: 'Renamed Peking University', description: '中华民国成立更名', color: '#D4A84B' },
      { year: 1919, title: '五四运动', titleEn: 'May Fourth Movement', description: '北大成为新文化运动中心', color: '#7B0F1A' },
      { year: 1952, title: '院系调整', titleEn: 'Reorganization', description: '全国院系调整', color: '#D4A84B' },
      { year: 1998, title: '百年校庆', titleEn: 'Centennial', description: '江泽民主席题词', color: '#7B0F1A' },
      { year: 2017, title: '双一流建设', titleEn: 'Double First-Class', description: '入选世界一流大学建设A类', color: '#D4A84B' },
    ],
  },
  campus: {
    buildings: [
      { name: '西校门', nameEn: 'West Gate', description: '北大标志性入口, 上书毛主席题字', icon: 'Building' },
      { name: '未名湖', nameEn: 'Weiming Lake', description: '未名湖与博雅塔, 燕园灵魂所在', icon: 'Book' },
      { name: '图书馆', nameEn: 'PKU Library', description: '亚洲高校最大图书馆之一', icon: 'Building2' },
      { name: '百年纪念讲堂', nameEn: 'Centennial Auditorium', description: '千人大礼堂', icon: 'FlaskConical' },
    ],
  },
  clubs: {
    categories: [
      { name: '学术科技', clubs: [
        { name: 'PKU AI Club', nameEn: 'PKU AI Club', description: '北大人工智能研究社', highlight: true },
        { name: '数学科学学院学生会', nameEn: 'Math Society', description: '数学院学生组织' },
      ] },
      { name: '文化创意', clubs: [
        { name: '五四文学社', nameEn: 'May Fourth Literary Society', description: '百年文学社团' },
        { name: '吉他协会', nameEn: 'Guitar Association', description: '古典与民谣吉他' },
      ] },
      { name: '体育运动', clubs: [
        { name: '山鹰社', nameEn: 'Mountain Eagle Society', description: '登山探险社团', highlight: true },
        { name: '乒乓球协会', nameEn: 'Table Tennis Association', description: '国球传承' },
      ] },
    ],
  },
  guide: {
    sections: [
      { title: '行前准备', titleEn: 'Before Arrival', items: [
        '凭录取通知书办理户口迁移',
        '准备身份证、户口本、毕业证原件',
        '购买到北京的车票或机票',
        '提前熟悉燕园地图',
      ] },
      { title: '住宿安排', titleEn: 'Accommodation', items: [
        '本科生入住学一号至学五号楼',
        '研究生可申请万柳/畅春园公寓',
        '宿舍配空调、独立卫浴',
      ] },
      { title: '学术准备', titleEn: 'Academic Prep', items: [
        '完成网上选课（选课系统）',
        '了解选课学分要求',
        '熟悉教务系统',
      ] },
      { title: '校园生活', titleEn: 'Campus Life', items: [
        '办理校园卡（饭卡+门禁+借书）',
        '开通北京银行账户',
        '办理手机卡',
        '熟悉燕园食堂、图书馆、体育馆',
      ] },
    ],
  },
  apps: {
    essential: [
      { name: '北京大学APP', category: '校园', description: '校园地图、课表、成绩查询', platform: ['iOS', 'Android'], icon: 'Building2', color: '#7B0F1A' },
      { name: 'PKU选课系统', category: '学习', description: '网上选课、学分查询', platform: ['Web'], icon: 'GraduationCap', color: '#D4A84B' },
      { name: '学习通', category: '学习', description: '网课、慕课平台', platform: ['iOS', 'Android'], icon: 'BookOpen', color: '#FF6B35' },
      { name: '腾讯会议', category: '会议', description: '线上课程', platform: ['iOS', 'Android', 'Web'], icon: 'Video', color: '#1976FF' },
      { name: '微信', category: '社交', description: '通知接收、校园群聊', platform: ['iOS', 'Android'], icon: 'MessageCircle', color: '#07C160' },
    ],
  },
  assets: { heroVideo: '', campusVideo: '', audioLoop: '', logo: '' },
  socials: { weibo: 'https://weibo.com/pku', wechat: '' },
};

export default pku;
