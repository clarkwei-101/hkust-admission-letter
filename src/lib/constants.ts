export const HKUST_COLORS = {
  blue: '#003366',
  gold: '#996600',
  white: '#FFFFFF',
  silver: '#C0C0C0',
  lightBlue: '#4a7eb5',
  darkBlue: '#001a33',
} as const;

export const AI_CLUB_INFO = {
  title: 'AI X SCI-FI CLUB',
  subtitle: 'PRESENT',
  description: '探索AI与科幻的交汇点 | 让创意无限延伸',
  tagline: '香港科技大学官方科技社团',
  websiteUrl: 'https://cyber-foundation-ten.vercel.app',
} as const;

export const NAV_ITEMS = [
  {
    id: 'welcome',
    title: '欢迎页',
    titleEn: 'Welcome',
    icon: 'Heart',
    description: '校长欢迎语与重要信息',
    href: '/content/welcome',
    color: '#003366',
  },
  {
    id: 'academics',
    title: '学习介绍',
    titleEn: 'Academics',
    icon: 'GraduationCap',
    description: '学院、专业与学制介绍',
    href: '/content/academics',
    color: '#004488',
  },
  {
    id: 'history',
    title: '校史',
    titleEn: 'History',
    icon: 'Clock',
    description: 'HKUST发展历程',
    href: '/content/history',
    color: '#005599',
  },
  {
    id: 'campus',
    title: '校园建筑',
    titleEn: 'Campus',
    icon: 'Building2',
    description: '标志性建筑与校园地图',
    href: '/content/campus',
    color: '#0066aa',
  },
  {
    id: 'clubs',
    title: '社团',
    titleEn: 'Clubs',
    icon: 'Users',
    description: '学生社团与招新信息',
    href: '/content/clubs',
    color: '#0077bb',
  },
  {
    id: 'cyber-foundation',
    title: 'Cyber Foundation',
    titleEn: 'Cyber Foundation',
    icon: 'Zap',
    description: 'AI X SCI-FI Club · 核心项目平台',
    href: '/content/cyber-foundation',
    color: '#996600',
  },
  {
    id: 'guide',
    title: '新生指南',
    titleEn: 'Guide',
    icon: 'BookOpen',
    description: '行前准备与校园生活',
    href: '/content/guide',
    color: '#0088cc',
  },
  {
    id: 'apps',
    title: '常用APP',
    titleEn: 'Apps',
    icon: 'Smartphone',
    description: '校园必备应用推荐',
    href: '/content/apps',
    color: '#0099dd',
  },
  {
    id: 'resources',
    title: '资源中心',
    titleEn: 'Resources',
    icon: 'Compass',
    description: '官方资源一站式导航',
    href: '/content/resources',
    color: '#00aadd',
  },
  {
    id: 'checklist',
    title: '入学清单',
    titleEn: 'Checklist',
    icon: 'ClipboardList',
    description: '入学必办事项追踪器',
    href: '/content/checklist',
    color: '#00bbdd',
  },
  {
    id: 'testimonials',
    title: '学长学姐说',
    titleEn: 'Student Voices',
    icon: 'Quote',
    description: '学长学姐第一手经验分享',
    href: '/content/testimonials',
    color: '#00ccdd',
  },
  {
    id: 'virtual-tour',
    title: '虚拟校园',
    titleEn: 'Virtual Tour',
    icon: 'MapPin',
    description: 'Google Maps互动导览与精选地标',
    href: '/content/virtual-tour',
    color: '#00ddee',
  },
  {
    id: 'campus-live',
    title: '实时校园',
    titleEn: 'Live Campus',
    icon: 'Radio',
    description: '校巴/小巴实时到站与校园路线',
    href: '/content/campus-live',
    color: '#FF6B35',
  },
] as const;

export const WELCOME_DATA = {
  greeting: 'Welcome to HKUST',
  greetingZh: '欢迎来到香港科技大学',
  subtitle: 'Your Journey Begins Here',
  subtitleZh: '您的学术之旅由此开启',
  academicYear: '2026-2027',
  semesterDates: {
    term1: '2026年9月2日 - 2026年12月5日',
    term2: '2027年1月13日 - 2027年5月9日',
  },
  importantDates: [
    { date: '2026年8月15日', event: '新生注册截止', color: '#003366' },
    { date: '2026年8月25日', event: '新生Orientation Week开始', color: '#996600' },
    { date: '2026年9月2日', event: '秋季学期正式开学', color: '#003366' },
  ],
} as const;

export const ACADEMICS_DATA = {
  schools: [
    {
      name: '工程学院',
      nameEn: 'School of Engineering',
      programs: ['计算机科学与工程', '电子与计算机工程', '机械工程', '化学工程', '土木工程'],
    },
    {
      name: '理学院',
      nameEn: 'School of Science',
      programs: ['数学', '物理学', '化学', '生命科学', '海洋科学与技术'],
    },
    {
      name: '商学院',
      nameEn: 'School of Business and Management',
      programs: ['经济学', '金融学', '会计学', '市场营销', '工商管理'],
    },
    {
      name: '人文与社会科学学院',
      nameEn: 'School of Humanities and Social Science',
      programs: ['中文学', '英文学', '全球中国研究', '社会学'],
    },
  ],
} as const;

export const HISTORY_DATA = {
  milestones: [
    { year: 1991, title: '创校', titleEn: 'Founded', description: '香港科技大学正式成立', color: '#003366' },
    { year: 1997, title: '首批博士', titleEn: 'First PhD Graduates', description: '培养出首批博士毕业生', color: '#996600' },
    { year: 2007, title: 'EQUIS认证', titleEn: 'EQUIS Accreditation', description: '商学院通过EQUIS国际认证', color: '#003366' },
    { year: 2011, title: '世界前50', titleEn: 'Times Ranking', description: '首次进入世界前50名', color: '#996600' },
    { year: 2019, title: '广州分校', titleEn: 'Guangzhou Campus', description: 'HKUST-GZ正式启动', color: '#003366' },
    { year: 2024, title: 'QS前30', titleEn: 'QS World Ranking', description: '位列世界前30名', color: '#996600' },
  ],
} as const;

export const CAMPUS_DATA = {
  buildings: [
    {
      name: '学术楼',
      nameEn: 'Academic Building',
      description: '主教学楼，设有演讲厅、实验室和研究中心',
      icon: 'Building',
    },
    {
      name: '图书馆',
      nameEn: 'Library',
      description: '24小时开放的现代化图书馆，收藏丰富学术资源',
      icon: 'Book',
    },
    {
      name: '学生中心',
      nameEn: 'Student Centre',
      description: '学生会办公室、活动场地和餐饮服务',
      icon: 'Building2',
    },
    {
      name: '赛马会大气研究中心',
      nameEn: 'Jockey Club IAS',
      description: '世界级大气科学研究设施',
      icon: 'FlaskConical',
    },
  ],
} as const;

export const CLUBS_DATA = {
  categories: [
    {
      name: '学术科技',
      clubs: [
        { name: 'AI X SCI-FI CLUB', nameEn: 'AI X SCI-FI CLUB', description: '探索AI与科幻的交汇点', highlight: true },
        { name: '计算机学会', nameEn: 'Computer Science Club', description: '编程竞赛与技术分享' },
        { name: '机器人学会', nameEn: 'Robotics Society', description: '机器人设计与竞赛' },
      ],
    },
    {
      name: '文化创意',
      clubs: [
        { name: '摄影学会', nameEn: 'Photography Club', description: '影像创作与交流' },
        { name: '音乐学会', nameEn: 'Music Society', description: '音乐演出与工作坊' },
        { name: '舞蹈学会', nameEn: 'Dance Club', description: '各类舞蹈培训与演出' },
      ],
    },
    {
      name: '体育运动',
      clubs: [
        { name: '篮球协会', nameEn: 'Basketball Association', description: '校队训练与联赛' },
        { name: '游泳协会', nameEn: 'Swimming Association', description: '游泳教学与比赛' },
        { name: '登山协会', nameEn: 'Mountaineering Club', description: '户外探险与训练' },
      ],
    },
  ],
} as const;

export const GUIDE_DATA = {
  sections: [
    {
      title: '行前准备',
      titleEn: 'Before Arrival',
      items: [
        '办理学生签证（港澳通行证）',
        '预约宿舍并缴纳定金',
        '准备入学文件原件',
        '购买境外意外保险',
        '预订机票与接机服务',
      ],
    },
    {
      title: '住宿安排',
      titleEn: 'Accommodation',
      items: [
        '本科生强制入住宿舍',
        '研究生可申请校内宿舍或校外租房',
        '宿舍设施：床位、书桌、衣柜、空调',
        '公共区域：厨房、洗衣房、自习室',
      ],
    },
    {
      title: '学术准备',
      titleEn: 'Academic Prep',
      items: [
        '完成网上选课',
        '购买教材（图书馆有电子资源）',
        '了解学术诚信政策',
        '熟悉Canvas学习管理系统',
      ],
    },
    {
      title: '校园生活',
      titleEn: 'Campus Life',
      items: [
        '办理学生证与八达通',
        '开通银行账户（中银香港）',
        '购买手机卡（CMHK/CSL/3）',
        '熟悉校园设施与地图',
      ],
    },
  ],
} as const;

export const APPS_DATA = {
  essential: [
    {
      name: 'Canvas',
      category: '学习',
      description: '课程管理、作业提交、成绩查询',
      platform: ['iOS', 'Android', 'Web'],
      icon: 'GraduationCap',
      color: '#E01F3D',
    },
    {
      name: 'HKUST Mobile',
      category: '校园',
      description: '校园地图、设施预约、公告通知',
      platform: ['iOS', 'Android'],
      icon: 'Building2',
      color: '#003366',
    },
    {
      name: 'HKUST Canteen',
      category: '餐饮',
      description: '查看食堂菜单与营业时间',
      platform: ['iOS', 'Android'],
      icon: 'UtensilsCrossed',
      color: '#FF6B35',
    },
    {
      name: 'HKUST Shuttle Bus',
      category: '交通',
      description: '校巴时刻表与实时位置',
      platform: ['iOS', 'Android'],
      icon: 'Bus',
      color: '#2E7D32',
    },
    {
      name: 'Zoom',
      category: '会议',
      description: '线上课程与师生会议',
      platform: ['iOS', 'Android', 'Web'],
      icon: 'Video',
      color: '#2D8CFF',
    },
    {
      name: 'HKU Space',
      category: '选课',
      description: '跨校选课与学分互认',
      platform: ['Web'],
      icon: 'BookOpen',
      color: '#7B2FFF',
    },
  ],
} as const;
