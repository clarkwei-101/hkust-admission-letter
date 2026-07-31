import type { SiteConfig } from '../site.config';

/**
 * HKU — The University of Hong Kong
 * Deep green + gold brand identity (colonial heritage)
 */
const hku: SiteConfig = {
  key: 'hku',
  name: '香港大学',
  nameEn: 'The University of Hong Kong',
  shortCode: 'HKU',
  foundedYear: 1911,
  city: 'Hong Kong',
  country: 'China',
  websiteUrl: 'https://www.hku.hk',
  theme: {
    blue: '#0F4D3A',
    gold: '#B8860B',
    gradient: { from: '#0F4D3A', to: '#1F7A5F' },
    lightBlue: '#3D8060',
    darkBlue: '#072B21',
    silver: '#C0C0C0',
    highlightGold: '#D4A84B',
  },
  aiClub: {
    title: 'HKU AI SOCIETY',
    subtitle: 'PRESENT',
    description: '百年学府 · AI 新浪潮',
    tagline: '香港大学 AI 学生组织',
    websiteUrl: 'https://cyber-foundation-ten.vercel.app',
    foundedYear: 2024,
  },
  tagline: '明德格物 · Sapientia et Virtus',
  navItems: [
    { id: 'welcome', title: '欢迎页', titleEn: 'Welcome', icon: 'Heart', description: '校长欢迎语', href: '/content/welcome', color: '#0F4D3A' },
    { id: 'academics', title: '学习介绍', titleEn: 'Academics', icon: 'GraduationCap', description: '十大学院介绍', href: '/content/academics', color: '#1F6B52' },
    { id: 'history', title: '校史', titleEn: 'History', icon: 'Clock', description: '百年发展历程', href: '/content/history', color: '#2F896A' },
    { id: 'campus', title: '校园建筑', titleEn: 'Campus', icon: 'Building2', description: '本部校园与沙宣道', href: '/content/campus', color: '#3FA782' },
    { id: 'clubs', title: '社团', titleEn: 'Clubs', icon: 'Users', description: '百周年校园社团', href: '/content/clubs', color: '#5FBC9A' },
    { id: 'guide', title: '新生指南', titleEn: 'Guide', icon: 'BookOpen', description: '行前准备与校园生活', href: '/content/guide', color: '#7FD1B2' },
    { id: 'apps', title: '常用APP', titleEn: 'Apps', icon: 'Smartphone', description: '校园必备应用', href: '/content/apps', color: '#9FE6CA' },
    { id: 'resources', title: '资源中心', titleEn: 'Resources', icon: 'Compass', description: '官方资源导航', href: '/content/resources', color: '#BFFBE2' },
    { id: 'checklist', title: '入学清单', titleEn: 'Checklist', icon: 'ClipboardList', description: '入学必办事项', href: '/content/checklist', color: '#CFFCFA' },
    { id: 'testimonials', title: '学长学姐说', titleEn: 'Student Voices', icon: 'Quote', description: '学长学姐经验', href: '/content/testimonials', color: '#DAFFE4' },
    { id: 'virtual-tour', title: '虚拟校园', titleEn: 'Virtual Tour', icon: 'MapPin', description: 'Google Maps互动导览', href: '/content/virtual-tour', color: '#E5FFEC' },
    { id: 'campus-live', title: '实时校园', titleEn: 'Live Campus', icon: 'Radio', description: '实时校巴', href: '/content/campus-live', color: '#FF6B35' },
  ],
  welcome: {
    greeting: 'Welcome to HKU',
    greetingZh: '欢迎来到香港大学',
    subtitle: '明德格物 · Sapientia et Virtus',
    subtitleZh: '您的学术之旅由此开启',
    academicYear: '2026-2027',
    semesterDates: {
      term1: '2026年9月1日 - 2026年12月5日',
      term2: '2027年1月18日 - 2027年5月6日',
    },
    importantDates: [
      { date: '2026年8月22日', event: '新生Orientation Week开始', color: '#B8860B' },
      { date: '2026年9月1日', event: '秋季学期正式开学', color: '#0F4D3A' },
    ],
  },
  academics: {
    schools: [
      { name: '建筑学院', nameEn: 'Faculty of Architecture', programs: ['建筑学', '园境建筑', '城市规划'] },
      { name: '文学院', nameEn: 'Faculty of Arts', programs: ['中文', '英文', '历史', '哲学'] },
      { name: '商学院', nameEn: 'Faculty of Business and Economics', programs: ['工商管理', '会计与金融', '经济学'] },
      { name: '牙医学院', nameEn: 'Faculty of Dentistry', programs: ['牙医学'] },
      { name: '教育学院', nameEn: 'Faculty of Education', programs: ['教育学士', '言语及听觉科学'] },
      { name: '工程学院', nameEn: 'Faculty of Engineering', programs: ['计算机科学', '电子工程', '机械工程'] },
      { name: '法律学院', nameEn: 'Faculty of Law', programs: ['法学士', 'JD', 'PCLL'] },
      { name: '医学院', nameEn: 'LKS Faculty of Medicine', programs: ['内外全科医学士', '护理学', '药学'] },
      { name: '理学院', nameEn: 'Faculty of Science', programs: ['数学', '物理', '化学', '生物'] },
      { name: '社会科学院', nameEn: 'Faculty of Social Sciences', programs: ['社会学', '心理学', '政治学'] },
    ],
  },
  history: {
    milestones: [
      { year: 1911, title: '创校', titleEn: 'Founded', description: '香港大学正式成立', color: '#0F4D3A' },
      { year: 1941, title: '战时医学院', titleEn: 'Wartime Medical School', description: '为抗战培养医护人员', color: '#B8860B' },
      { year: 1967, title: '学生会成立', titleEn: 'Students Union', description: '香港大学学生会正式注册', color: '#0F4D3A' },
      { year: 1989, title: '邓小平接见', titleEn: 'Deng Xiaoping Visit', description: '历史性访问', color: '#B8860B' },
      { year: 2023, title: 'QS亚洲前5', titleEn: 'QS Asia Top 5', description: '跻身QS亚洲前五名', color: '#0F4D3A' },
    ],
  },
  campus: {
    buildings: [
      { name: '本部大楼', nameEn: 'Main Building', description: '红砖殖民地风格地标', icon: 'Building' },
      { name: '大学图书馆', nameEn: 'University Library', description: '主图书馆与特藏室', icon: 'Book' },
      { name: '黄克竞楼', nameEn: 'Haking Wong Building', description: '工程与医学教学', icon: 'Building2' },
      { name: '本部学术楼', nameEn: 'Academic Exchange Building', description: '演讲厅与研讨室', icon: 'FlaskConical' },
    ],
  },
  clubs: {
    categories: [
      { name: '学术科技', clubs: [
        { name: 'HKU AI Society', nameEn: 'HKU AI Society', description: '港大AI学生组织', highlight: true },
        { name: '计算机学会', nameEn: 'Computer Science Society', description: '编程竞赛与AI研究分享' },
      ] },
      { name: '文化创意', clubs: [
        { name: '辩论队', nameEn: 'Debating Union', description: '港大百年辩论传统' },
        { name: '音乐学会', nameEn: 'Music Society', description: '古典与现代音乐演出' },
      ] },
      { name: '体育运动', clubs: [
        { name: '龙舟队', nameEn: 'Dragon Boat Team', description: '传统龙舟竞技' },
        { name: '赛艇队', nameEn: 'Rowing Club', description: '水上学府传统', highlight: true },
      ] },
    ],
  },
  guide: {
    sections: [
      { title: '行前准备', titleEn: 'Before Arrival', items: [
        '办理学生签证（港澳通行证）',
        '预约宿舍并缴纳定金',
        '准备入学文件原件',
        '购买境外意外保险',
        '预订机票与接机服务',
      ] },
      { title: '住宿安排', titleEn: 'Accommodation', items: [
        '本科生保证第一年宿舍',
        '研究生可申请校外租房',
        '宿舍设施齐全',
      ] },
      { title: '学术准备', titleEn: 'Academic Prep', items: [
        '完成网上选课',
        '购买教材',
        '熟悉Moodle学习系统',
      ] },
      { title: '校园生活', titleEn: 'Campus Life', items: [
        '办理学生证与八达通',
        '开通银行账户',
        '购买手机卡',
        '探索百年校园',
      ] },
    ],
  },
  apps: {
    essential: [
      { name: 'Moodle', category: '学习', description: '课程管理、作业提交', platform: ['iOS', 'Android', 'Web'], icon: 'GraduationCap', color: '#0F4D3A' },
      { name: 'HKU Mobile', category: '校园', description: '校园地图、设施预约', platform: ['iOS', 'Android'], icon: 'Building2', color: '#B8860B' },
      { name: 'HKU Canteen', category: '餐饮', description: '食堂菜单与营业时间', platform: ['iOS', 'Android'], icon: 'UtensilsCrossed', color: '#FF6B35' },
      { name: 'HKU Shuttle', category: '交通', description: '校巴时刻表与实时位置', platform: ['iOS', 'Android'], icon: 'Bus', color: '#2E7D32' },
      { name: 'Zoom', category: '会议', description: '线上课程', platform: ['iOS', 'Android', 'Web'], icon: 'Video', color: '#2D8CFF' },
    ],
  },
  assets: { heroVideo: '', campusVideo: '', audioLoop: '', logo: '' },
  socials: { instagram: 'https://instagram.com/hku', youtube: 'https://youtube.com/@hku' },
};

export default hku;
