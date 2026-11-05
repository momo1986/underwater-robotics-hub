/* 深海机器人观测站 · 经典著作数据
 * 每条记录的 url 应指向原文页面；找不到原文时填 search 字段（检索关键词），页面会显示为「检索原文」。
 */

// 经典著作
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
    url: "",
    search: "水下机器人 蒋新松 封锡盛 王隶棠 辽宁科学技术出版社",
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
    url: "",
    search: "Principles of Underwater Sound Urick 3rd edition",
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
