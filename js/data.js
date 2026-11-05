/* ============================================================
 * 深海机器人观测站 · 数据层
 * 论文数据（200+ 篇）来自 js/data_papers.js，需先于本文件加载
 * 其他栏目数据为示例数据集，可持续更新维护（新闻/政策以官方来源为准）
 * ============================================================ */

// PAPERS 由 data_papers.js 生成（前沿论文 + 经典 AI/控制/CV/SLAM 论文）
const PAPER_TAGS = [...new Set(PAPERS.flatMap((p) => p.tags))];

// ---------------- 经典著作 ----------------
const BOOKS = [
  {
    id: "b1",
    title: "《水下机器人》",
    author: "蒋新松、封锡盛、王隶棠",
    publisher: "辽宁科学技术出版社",
    year: 2000,
    tags: ["国内经典", "总体设计"],
    summary:
      "我国水下机器人事业的奠基之作，系统总结 AUV/ROV 的总体设计、运动控制、水声导航与作业系统，凝聚了“CR-01”等深海机器人研制的第一手经验，是国内该领域的必读文献。",
    url: "https://book.douban.com/",
  },
  {
    id: "b2",
    title: "Handbook of Marine Craft Hydrodynamics and Motion Control",
    author: "Thor I. Fossen",
    publisher: "Wiley",
    year: 2021,
    tags: ["运动控制", "水动力建模"],
    summary:
      "海洋载具水动力建模与运动控制的权威工具书（第 2 版），涵盖 6 自由度模型、风浪流干扰、导引与控制设计，水下机器人运动控制研究的标准参考文献。",
    url: "https://www.wiley.com/en-us/Handbook+of+Marine+Craft+Hydrodynamics+and+Motion+Control%2C+2nd+Edition-p-9781119575104",
  },
  {
    id: "b3",
    title: "Marine Control Systems: Guidance, Navigation, and Control of Ships, Rigs and Underwater Vehicles",
    author: "Thor I. Fossen",
    publisher: "Marine Cybernetics",
    year: 2002,
    tags: ["运动控制", "导引导航"],
    summary:
      "Fossen 的经典教材，建立船舶与水下机器人导引、导航与控制（GNC）的统一理论框架，其滑模控制、反步法与观测器设计章节被后续大量论文沿用。",
    url: "https://www.fossen.biz/marine-control-systems/",
  },
  {
    id: "b4",
    title: "Underwater Robots: Motion and Force Control of Vehicle-Manipulator Systems",
    author: "Gianluca Antonelli",
    publisher: "Springer",
    year: 2014,
    tags: ["作业操控", "机械臂"],
    summary:
      "聚焦水下机器人-机械臂系统（UVMS）的运动与力控制，覆盖动力学建模、自适应控制、估计与干预作业，是水下机器人作业系统方向最重要的专著（第 3 版）。",
    url: "https://link.springer.com/book/10.1007/978-3-319-02874-4",
  },
  {
    id: "b5",
    title: "Springer Handbook of Ocean Engineering",
    author: "Manhar R. Dhanak, Nikhil R. Xiros (eds.)",
    publisher: "Springer",
    year: 2016,
    tags: ["海洋工程", "综合手册"],
    summary:
      "海洋工程百科式手册，其中海洋机器人（Marine Robotics）章节系统介绍 AUV/ROV/滑翔机的平台技术、能源、通信与感知体系，适合作为跨领域知识地图。",
    url: "https://link.springer.com/book/10.1007/978-3-319-11949-7",
  },
  {
    id: "b6",
    title: "Principles of Underwater Sound",
    author: "Robert J. Urick",
    publisher: "Peninsula Publishing",
    year: 1983,
    tags: ["水声", "声呐"],
    summary:
      "水声学与声呐原理的“圣经”级经典（第 3 版），系统阐述声传播、散射、混响与噪声，是理解水下声学感知与通信物理基础的必读书。",
    url: "https://www.peninsulapublishing.com/",
  },
  {
    id: "b7",
    title: "Underwater Acoustic Signal Processing: Modeling, Detection, and Estimation",
    author: "Douglas A. Abraham",
    publisher: "Springer",
    year: 2019,
    tags: ["水声", "信号处理"],
    summary:
      "现代水声信号处理的系统教材，覆盖检测、估计与匹配追踪等主题，兼顾理论推导与声呐工程实践，适合从事水下感知与通信的研究者深入阅读。",
    url: "https://link.springer.com/book/10.1007/978-3-319-92834-2",
  },
];

// ---------------- 政策法规 ----------------
const POLICIES = [
  {
    id: "g1",
    title: "《中华人民共和国深海海底区域资源勘探开发法》",
    issuer: "全国人民代表大会常务委员会",
    date: "2016-05-01",
    level: "国家法律",
    tags: ["深海", "资源勘探"],
    summary:
      "我国首部深海领域专门法律，规范深海海底区域资源勘探、开发及相关环境保护活动，为深海装备（含载人潜水器与 AUV）的科考作业与安全监管提供法律依据。",
    url: "https://flk.npc.gov.cn/",
  },
  {
    id: "g2",
    title: "《深海海底区域资源勘探开发许可管理办法》",
    issuer: "自然资源部",
    date: "2017-08-01",
    level: "部门规章",
    tags: ["深海", "许可管理"],
    summary:
      "深海法的重要配套规章，明确深海勘探开发许可的申请条件、审查程序与监管要求，涉及深海调查航次、装备作业与国际协作的合规流程。",
    url: "https://www.mnr.gov.cn/",
  },
  {
    id: "g3",
    title: "《“十四五”海洋经济发展规划》",
    issuer: "国务院",
    date: "2021-12-01",
    level: "国家规划",
    tags: ["海洋经济", "规划"],
    summary:
      "部署“十四五”期间海洋经济发展重点，提出发展高端海工装备与智能海洋装备、建设海洋科技创新平台，为水下机器人产业化和深海科考能力建设明确方向。",
    url: "https://www.gov.cn/zhengce/content/2021-12/31/content_5665161.htm",
  },
  {
    id: "g4",
    title: "《海洋观测预报管理条例》",
    issuer: "国务院",
    date: "2012-06-01",
    level: "行政法规",
    tags: ["海洋观测", "安全管理"],
    summary:
      "规范海洋观测网规划、观测站建设与资料共享，水下无人观测平台（AUV、滑翔机等）的布放、运行与数据管理需符合本条例及其实施细则的要求。",
    url: "https://www.gov.cn/gongbao/content/2012/content_2126023.htm",
  },
  {
    id: "g5",
    title: "《国家管辖范围以外区域海洋生物多样性协定》（BBNJ 协定）",
    issuer: "联合国大会",
    date: "2023-06-19",
    level: "国际协定",
    tags: ["国际协定", "海洋治理"],
    summary:
      "公海与深海海底生物多样性养护和可持续利用的全球性法律框架，对深海科学考察、海洋遗传资源获取与环境影响评估提出要求，直接影响深海机器人的国际科考作业规则。",
    url: "https://www.un.org/depts/los/biodiversity/",
  },
  {
    id: "g6",
    title: "《海洋工程装备制造业持续健康发展行动计划（2017—2020 年）》",
    issuer: "工业和信息化部等八部门",
    date: "2017-12-01",
    level: "部门政策",
    tags: ["海工装备", "产业政策"],
    summary:
      "推动海洋工程装备制造业转型升级，提出发展深海装备、智能装备与关键配套设备，为水下机器人整机企业、核心零部件与配套产业提供政策支持。",
    url: "https://www.miit.gov.cn/",
  },
  {
    id: "g7",
    title: "《“机器人+”应用行动实施方案》",
    issuer: "工业和信息化部等十七部门",
    date: "2023-01-19",
    level: "部门政策",
    tags: ["机器人", "应用推广"],
    summary:
      "面向农林牧渔、能源、安全应急等领域推广机器人应用，明确支持水下机器人等特种机器人在深海资源开发、水下检测、渔业养殖与应急救援场景的规模化应用。",
    url: "https://www.gov.cn/zhengce/zhengceku/2023-01/19/content_5738144.htm",
  },
  {
    id: "g8",
    title: "《山东省海洋强省建设行动方案》",
    issuer: "山东省人民政府",
    date: "2018-03-01",
    level: "地方政策",
    tags: ["地方政策", "海洋强省"],
    summary:
      "省级海洋强省顶层设计，依托青岛国家深海基地与中国海工装备产业集群，重点培育深海探测装备与水下机器人研发制造企业，形成地方产业集聚效应。",
    url: "http://www.shandong.gov.cn/",
  },
];

// ---------------- 头部企业新闻 ----------------
const NEWS = [
  {
    id: "n1",
    company: "中国船舶集团 702 研究所",
    title: "“奋斗者”号载人潜水器完成万米深潜，转入常态化科考应用",
    source: "新华社",
    date: "2020-11-10",
    tags: ["载人深潜", "深海科考"],
    summary:
      "“奋斗者”号在马里亚纳海沟成功坐底，下潜深度 10909 米，创我国载人深潜新纪录；此后已在多个海沟开展常态化科考，搭载国产化关键部件比例超过 96%。",
    url: "https://www.xinhuanet.com/",
  },
  {
    id: "n2",
    company: "广州海洋地质调查局",
    title: "首艘大洋钻探船“梦想”号正式入列",
    source: "央视新闻",
    date: "2024-11-17",
    tags: ["大洋钻探", "船舶装备"],
    summary:
      "我国自主设计建造的首艘大洋钻探船“梦想”号在广州正式入列，最大钻探深度可达 11000 米，具备海域可燃冰勘采与深部科学探测能力，配套多种无人探测装备。",
    url: "https://news.cctv.com/",
  },
  {
    id: "n3",
    company: "中国科学院沈阳自动化研究所",
    title: "“海斗一号”全海深 AUV 完成万米深渊自主航行与探测",
    source: "中科院之声",
    date: "2020-06-01",
    tags: ["AUV", "深渊科考"],
    summary:
      "“海斗一号”在马里亚纳海沟实现最大下潜深度 10907 米的自主航行与摄影测量，突破了全海深无人潜水器自主控制、声学导航与操探作业等关键技术。",
    url: "https://www.sia.cas.cn/",
  },
  {
    id: "n4",
    company: "深之蓝（Sublue）",
    title: "深之蓝发布新一代全姿态水下推进器，消费级水下机器人出口全球",
    source: "36氪",
    date: "2024-05-20",
    tags: ["消费级", "水下推进"],
    summary:
      "天津深之蓝发布新一代全姿态水下推进器与水下拍摄机器人产品线，覆盖科研、测绘、应急救援与消费娱乐场景，产品已出口至多个国家和地区。",
    url: "https://www.sublue.com/",
  },
  {
    id: "n5",
    company: "博雅工道（Bodysense）",
    title: "博雅工道 ROV 水下机器人助力水库大坝与桥基安全巡检",
    source: "科技日报",
    date: "2023-08-10",
    tags: ["行业级 ROV", "水下检测"],
    summary:
      "博雅工道行业级 ROV 广泛应用于水库大坝、桥梁桩基与海上风电基础的水下结构检测，结合声呐与机械臂实现水下除锈、清淤等工程化作业。",
    url: "https://www.bodysense.com.cn/",
  },
  {
    id: "n6",
    company: "Kongsberg Discovery",
    title: "康斯伯格发布超远程 AUV HUGIN Endurance，单次任务航程逾千公里",
    source: "Kongsberg 官网",
    date: "2023-09-05",
    tags: ["AUV", "国际头部"],
    summary:
      "挪威康斯伯格发布 HUGIN Endurance AUV，续航可达 15 天、航程约 1100 公里，主要用于远海大范围测绘与水文调查，代表了远程自主水下航行器的国际领先水平。",
    url: "https://www.kongsberg.com/maritime/",
  },
  {
    id: "n7",
    company: "Saab",
    title: "萨博 Sabertooth 混合式 ROV/AUV 获深海监测与港口安全新订单",
    source: "Saab 官网",
    date: "2023-11-02",
    tags: ["ROV/AUV", "国际头部"],
    summary:
      "瑞典萨博的 Sabertooth 半自主水下机器人支持 AUV 与 ROV 双模作业，可在深海布放与自主返航，被应用于海洋环境监测、港口安保与基础设施检测等长期驻留任务。",
    url: "https://www.saab.com/",
  },
  {
    id: "n8",
    company: "Teledyne Marine",
    title: "Teledyne 推出新一代 G3 水下滑翔机与 Gavia AUV 升级型号",
    source: "Teledyne Marine",
    date: "2024-03-15",
    tags: ["滑翔机", "传感器"],
    summary:
      "Teledyne Marine 推出续航更长的 Slocum G3 Glider 与 Gavia AUV 升级型，集成多参数水质与温盐深传感器，广泛服务于海洋观测网建设与科研调查。",
    url: "https://www.teledynemarine.com/",
  },
  {
    id: "n9",
    company: "Kraken Robotics",
    title: "Kraken 高分辨率声呐与深海电池系统持续拓展全球市场",
    source: "Kraken 官网",
    date: "2024-07-08",
    tags: ["声呐", "核心部件"],
    summary:
      "加拿大 Kraken Robotics 的 AquaPix 干式插拔多波束声呐与 SeaPower 亚海水下电池，为 AUV/ROV 提供高分辨率成像与长航时能源方案，成为国际水下机器人核心部件供应商。",
    url: "https://krakenrobotics.com/",
  },
  {
    id: "n10",
    company: "青岛罗博飞海洋科技",
    title: "罗博飞水下机器人应用于水产养殖与深海网箱巡检",
    source: "青岛日报",
    date: "2023-05-18",
    tags: ["渔业养殖", "行业级 ROV"],
    summary:
      "青岛罗博飞的观察级 ROV 集成水下清洁刷与高清成像系统，应用于深海网箱巡检、网衣清洗与海参底播养殖监测，推动“机器换人”在水产养殖领域落地。",
    url: "https://www.qingdaorobofish.com/",
  },
];

// ---------------- BOOK_TAGS / POLICY_TAGS / NEWS_TAGS ----------------
const BOOK_TAGS = [...new Set(BOOKS.flatMap((b) => b.tags))];
const POLICY_TAGS = [...new Set(POLICIES.flatMap((g) => g.tags))];
const NEWS_TAGS = [...new Set(NEWS.flatMap((n) => n.tags))];
