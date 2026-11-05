/* 深海机器人观测站 · 企业与机构动态数据
 * 每条记录的 url 必须指向具体报道或新闻稿，不使用网站首页。
 * 按日期倒序排列（页面也会自动排序）。
 */

const NEWS = [
  {
    id: "n1",
    company: "中国地质调查局",
    title: "“梦想”号大洋钻探船完成南海试钻，深海钻探取心能力提升至 5000 米级",
    source: "新华网",
    date: "2026-09-29",
    tags: ["深海装备", "国内"],
    summary:
      "“梦想”号在南海 4100 米水深海域完成 2 口井的钻探取心，标志着我国深海钻探取心作业能力迈上 5000 米级台阶。",
    url: "https://www.news.cn/tech/20260929/07ef3729fcad4287af9fa8aac8fef70f/c.html",
  },
  {
    id: "n2",
    company: "Kraken Robotics",
    title: "Kraken 宣布 $2800 万 SeaPower 电池与合成孔径声呐订单",
    source: "Kraken Robotics 新闻稿",
    date: "2026-04-16",
    tags: ["声呐", "能源", "国际"],
    summary:
      "订单来自多家国际客户，涵盖用于无人水下航行器（UUV）的 SeaPower 深海电池与 Kraken SAS 合成孔径声呐，其产品已集成到 30 余种 UUV 平台。",
    url: "https://www.bnnbloomberg.ca/press-releases/2026/04/16/kraken-robotics-announces-28-million-in-seapower-battery-and-kraken-sas-orders/",
  },
  {
    id: "n3",
    company: "Kraken Robotics",
    title: "Kraken 获 $2400 万防务订单，涉及 KATFISH 拖曳式声呐与深海电池",
    source: "Kraken Robotics 新闻稿",
    date: "2026-03-17",
    tags: ["声呐", "防务", "国际"],
    summary:
      "三家新客户订购 SeaPower 电池、KATFISH 拖曳式合成孔径声呐与 Kraken SAS，反映水下无人系统在海军领域的需求增长。",
    url: "https://www.bnnbloomberg.ca/press-releases/2026/03/17/kraken-robotics-announces-24-million-in-defence-orders/",
  },
  {
    id: "n4",
    company: "Teledyne Marine",
    title: "Slocum Sentinel 滑翔机“Redwing”出发，尝试首次环球水下滑翔",
    source: "Teledyne Marine / 罗格斯大学",
    date: "2025-10-10",
    tags: ["水下滑翔机", "国际"],
    summary:
      "Teledyne Marine 与罗格斯大学在马萨诸塞州外海布放 Slocum Sentinel 滑翔机，计划用约五年时间完成环球航行，沿途采集海洋观测数据。",
    url: "https://www.envirotech-online.com/news/water-wastewater/9/teledyne-marine-europe/world-first-underwater-autonomous-glider-to-circumnavigate-the-globe/66001",
  },
  {
    id: "n5",
    company: "中国地质调查局",
    title: "我国首艘大洋钻探船“梦想”号在广州正式入列",
    source: "新华网",
    date: "2024-11-17",
    tags: ["深海装备", "国内"],
    summary:
      "“梦想”号由自然资源部中国地质调查局牵头、150 余家单位协同研制，最大钻深 11000 米，具备全球海域无限航区作业能力。",
    url: "https://www.news.cn/20241118/054d485cbfbc43f0bd359a28e2179daa/c.html",
  },
  {
    id: "n6",
    company: "Kongsberg Discovery",
    title: "HUGIN Endurance 超长航时 AUV 开始首台海试",
    source: "The Maritime Executive",
    date: "2023-09",
    tags: ["AUV", "国际"],
    summary:
      "HUGIN Endurance 于 2021 年发布，可脱离母船独立执行约 15 天的测绘任务；首台产品于 2023 年 9 月开始海试。",
    url: "https://www.maritime-executive.com/article/kongsberg-discovery-set-auv-milestone-with-sea-trials-of-hugin-endurance",
  },
  {
    id: "n7",
    company: "中国船舶集团 702 研究所等",
    title: "“奋斗者”号载人潜水器在马里亚纳海沟坐底，深度 10909 米",
    source: "中国日报",
    date: "2020-11-10",
    tags: ["载人潜水器", "国内"],
    summary:
      "“奋斗者”号创造中国载人深潜新纪录；第二阶段海试累计下潜 13 次，其中 8 次突破万米，11 月 28 日随“探索一号”返航。",
    url: "https://language.chinadaily.com.cn/a/202011/11/WS5fab5a73a31024ad0ba936d2.html",
  },
  {
    id: "n8",
    company: "中国科学院沈阳自动化研究所",
    title: "“海斗一号”全海深自主遥控潜水器完成万米海试，最大下潜深度 10907 米",
    source: "新华社（南海时报转载）",
    date: "2020-06",
    tags: ["AUV", "国内"],
    summary:
      "“海斗一号”在马里亚纳海沟实现 4 次万米下潜，刷新我国潜水器最大下潜深度纪录，填补了我国万米作业型无人潜水器的空白。",
    url: "https://szb.nanhaitoday.com/epaper/zjsb/html/2020-06/09/content_10162.htm",
  },
];
