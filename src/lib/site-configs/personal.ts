import type { SiteConfig } from '../site.config';

/**
 * Personal — a student-made DIY variant that shows the template can be
 * repurposed for any small indie/creator launch. Cyan + violet, cyberpunk feel.
 */
const personal: SiteConfig = {
  key: 'personal',
  name: '我的录取通知',
  nameEn: 'My Admission',
  shortCode: 'Me',
  foundedYear: 2026,
  city: 'Anywhere',
  country: 'World',
  websiteUrl: '',
  theme: {
    blue: '#0EA5E9',
    gold: '#A78BFA',
    gradient: { from: '#0EA5E9', to: '#A78BFA' },
    lightBlue: '#38BDF8',
    darkBlue: '#075985',
    silver: '#C0C0C0',
    highlightGold: '#C4B5FD',
  },
  aiClub: {
    title: 'MAKER CLUB',
    subtitle: 'PRESENT',
    description: '让每一个idea都成为现实',
    tagline: '独立创作者社区',
    websiteUrl: '',
    foundedYear: 2026,
  },
  tagline: 'Build your own admission story',
  navItems: [
    { id: 'welcome', title: '欢迎', titleEn: 'Welcome', icon: 'Heart', description: '欢迎语', href: '/content/welcome', color: '#0EA5E9' },
    { id: 'academics', title: '学习', titleEn: 'Study', icon: 'GraduationCap', description: '学什么', href: '/content/academics', color: '#38BDF8' },
    { id: 'history', title: '历程', titleEn: 'Journey', icon: 'Clock', description: '我的成长', href: '/content/history', color: '#7DD3FC' },
    { id: 'campus', title: '校园', titleEn: 'Campus', icon: 'Building2', description: '校园地图', href: '/content/campus', color: '#A78BFA' },
    { id: 'clubs', title: '圈层', titleEn: 'Communities', icon: 'Users', description: '加入的小组', href: '/content/clubs', color: '#C4B5FD' },
    { id: 'guide', title: 'Tips', titleEn: 'Tips', icon: 'BookOpen', description: '实用建议', href: '/content/guide', color: '#0EA5E9' },
    { id: 'apps', title: 'App', titleEn: 'Apps', icon: 'Smartphone', description: '常用工具', href: '/content/apps', color: '#38BDF8' },
  ],
  welcome: {
    greeting: 'Welcome',
    greetingZh: '欢迎',
    subtitle: 'Crafted with care',
    subtitleZh: '用心打造',
    academicYear: '2026',
    semesterDates: {
      term1: '2026年9月 - 2026年12月',
      term2: '2027年2月 - 2027年5月',
    },
    importantDates: [
      { date: '今天', event: '开始这一段旅程', color: '#A78BFA' },
    ],
  },
  academics: {
    schools: [
      { name: '主要方向', nameEn: 'Main Focus', programs: ['机器学习', '设计系统', '创意工程'] },
    ],
  },
  history: {
    milestones: [
      { year: 2026, title: '开始', titleEn: 'Begin', description: '我用这个模板记录自己的录取', color: '#0EA5E9' },
    ],
  },
  campus: {
    buildings: [
      { name: '常去的地方', nameEn: 'Favourite Spots', description: '校园里最喜欢的地方', icon: 'Book' },
    ],
  },
  clubs: {
    categories: [
      { name: '我的圈层', clubs: [
        { name: 'AI × SCI-FI', nameEn: 'AI × SCI-FI', description: '我的核心社群', highlight: true },
      ] },
    ],
  },
  guide: {
    sections: [
      { title: '我的建议', titleEn: 'My Tips', items: [
        '相信过程',
        '保持好奇',
        '别忘了玩',
      ] },
    ],
  },
  apps: {
    essential: [
      { name: 'Notion', category: '笔记', description: '一切从这里开始', platform: ['iOS', 'Android', 'Web'], icon: 'BookOpen', color: '#0EA5E9' },
    ],
  },
  assets: { heroVideo: '', campusVideo: '', audioLoop: '', logo: '' },
};

export default personal;
