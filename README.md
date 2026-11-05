# 深海机器人观测站 · Underwater Robotics Hub

水下机器人领域的信息索引站：前沿论文、经典著作、政策法规与行业动态，每条内容都附有来源链接。

在线访问：<https://momo1986.github.io/underwater-robotics-hub/>

## 页面

| 页面 | 内容 |
| --- | --- |
| `index.html` | 首页：观测站主视觉（声呐屏显示各栏目条目数）、观测读数、各栏目最新条目 |
| `papers.html` | 前沿论文：可按年代和标签筛选 |
| `books.html` | 经典著作 |
| `policies.html` | 政策法规（按日期倒序） |
| `news.html` | 行业动态（按日期倒序） |
| `search.html` | 搜索结果页（`search.html?q=关键词`）；输入框在每个页面的页头，不单独占一页 |
| `about.html` | 收录范围、链接说明、纠错方式 |
| `404.html` | GitHub Pages 的 404 页 |

栏目页的搜索词和筛选条件会写入网址（如 `papers.html?tag=SLAM&era=recent`），可直接分享。

## 目录结构

```
├── *.html            # 各页面（结构相同：页头/页脚由 js/common.js 注入）
├── css/style.css     # 样式（深色 / 浅色主题）
├── favicon.svg
├── sitemap.xml / robots.txt
└── js/
    ├── data/
    │   ├── papers.js    # 论文
    │   ├── books.js     # 著作
    │   ├── policies.js  # 政策法规
    │   └── news.js      # 行业动态
    ├── common.js     # 页头页脚、主题、卡片渲染、工具函数
    ├── section.js    # 栏目页：筛选、分页、URL 状态
    ├── home.js       # 首页
    └── search.js     # 搜索页
```

## 维护数据

- 增删条目只需改 `js/data/` 下对应文件，统计数字、标签和首页预览都会自动更新。
- `url` 必须指向原文页面（论文页、发布页、具体报道），**不要填网站首页**。
- 论文链接优先填 arXiv（开放获取），其次填 DOI（`https://doi.org/...`）。
- 暂时找不到原文时：论文的链接留空，页面显示「Google Scholar 检索」；其他栏目留空 `url` 并填写 `search` 关键词，页面显示「检索原文」。
- 修改数据后，把 `js/common.js` 里的 `SITE.updated` 改成当天日期。

## 本地运行

无需构建：

```bash
python3 -m http.server 8080
```

然后访问 <http://localhost:8080>。
