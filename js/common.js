/* ============================================================
 * 深海机器人观测站 · 公共模块
 * 页头 / 页脚 / 主题 / 移动端菜单 / 工具函数 / 卡片渲染
 * 每个页面先加载所需的 js/data/*.js，再加载本文件。
 * ============================================================ */

const SITE = {
  name: "深海机器人观测站",
  en: "UNDERWATER ROBOTICS HUB",
  repo: "https://github.com/momo1986/underwater-robotics-hub",
  updated: "2026-11-05",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------- 工具函数 ---------------- */

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 对已转义文本做关键词高亮；多个关键词分别高亮
function hl(escapedText, query) {
  if (!query) return escapedText;
  const kws = query.split(/\s+/).filter(Boolean).map((k) => esc(k).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!kws.length) return escapedText;
  return escapedText.replace(new RegExp(`(${kws.join("|")})`, "gi"), "<mark>$1</mark>");
}

function matchQuery(fields, query) {
  if (!query) return true;
  const text = fields.join(" ").toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((kw) => text.includes(kw));
}

// 统一的链接逻辑：有原文链接用原文；没有则给出检索链接，并如实标注
function linkFor(item, kind) {
  if (item.url) {
    const isArxiv = /arxiv\.org/.test(item.url);
    const label = isArxiv ? "arXiv 原文" : { papers: "阅读原文", books: "出版信息", policies: "查看原文", news: "阅读报道" }[kind];
    return { href: item.url, label: label + " ↗", search: false };
  }
  if (kind === "papers") {
    return { href: "https://scholar.google.com/scholar?q=" + encodeURIComponent(item.title), label: "Google Scholar 检索 ↗", search: true };
  }
  return { href: "https://www.bing.com/search?q=" + encodeURIComponent(item.search || item.title), label: "检索原文 ↗", search: true };
}

const yearOf = (d) => parseInt(String(d).slice(0, 4), 10) || 0;
const RECENT_YEAR = new Date().getFullYear() - 1; // 近两年视为「近期」

/* ---------------- 卡片渲染 ---------------- */

const tagsHtml = (tags, q) => `<div class="card-tags">${tags.map((t) => `<span class="tag">${hl(esc(t), q)}</span>`).join("")}</div>`;

function cardShell({ top, title, sub, summary, tags, link, q }) {
  return `
  <article class="card">
    <div class="card-top">${top}</div>
    <h3 class="card-title"><a href="${esc(link.href)}" target="_blank" rel="noopener">${hl(esc(title), q)}</a></h3>
    ${sub ? `<div class="card-authors" title="${esc(sub)}">${hl(esc(sub), q)}</div>` : ""}
    ${summary ? `<p class="card-summary">${hl(esc(summary), q)}</p>` : ""}
    ${tagsHtml(tags, q)}
    <div class="card-foot">
      <a class="card-link${link.search ? " is-search" : ""}" href="${esc(link.href)}" target="_blank" rel="noopener"
         ${link.search ? 'title="暂未收录原文链接，点击在搜索引擎中检索"' : ""}>${link.label}</a>
    </div>
  </article>`;
}

const LEVEL_BADGE = {
  "国家法律": "badge-law",
  "行政法规": "badge-rule",
  "部门规章": "badge-rule",
  "部门规范性文件": "badge-rule",
  "部门政策": "badge-plan",
  "国家规划": "badge-plan",
  "国际协定": "badge-intl",
  "地方政策": "badge-local",
};

const SECTIONS = {
  papers: {
    title: "前沿论文", en: "Research Papers", page: "papers.html",
    get data() { return typeof PAPERS !== "undefined" ? PAPERS : []; },
    fields: (x) => [x.title, x.authors, x.venue, x.summary, x.tags.join(" "), String(x.year)],
    render: (p, q) => cardShell({
      top: `<span class="card-venue">${hl(esc(p.venue), q)} · ${p.year}${p.year >= RECENT_YEAR ? '<span class="badge-new">NEW</span>' : ""}</span>`,
      title: p.title, sub: p.authors, summary: p.summary, tags: p.tags, link: linkFor(p, "papers"), q,
    }),
  },
  books: {
    title: "经典著作", en: "Classic Books", page: "books.html",
    get data() { return typeof BOOKS !== "undefined" ? BOOKS : []; },
    fields: (x) => [x.title, x.author, x.publisher, x.summary, x.tags.join(" "), String(x.year)],
    render: (b, q) => cardShell({
      top: `<span class="card-venue">${hl(esc(b.publisher), q)}</span><span class="card-date">${b.year}</span>`,
      title: b.title, sub: b.author, summary: b.summary, tags: b.tags, link: linkFor(b, "books"), q,
    }),
  },
  policies: {
    title: "政策法规", en: "Policy & Regulation", page: "policies.html",
    get data() { return typeof POLICIES !== "undefined" ? [...POLICIES].sort((a, b) => String(b.date).localeCompare(String(a.date))) : []; },
    fields: (x) => [x.title, x.issuer, x.level, x.summary, x.tags.join(" "), x.date],
    render: (g, q) => cardShell({
      top: `<span class="badge ${LEVEL_BADGE[g.level] || "badge-plan"}">${hl(esc(g.level), q)}</span><span class="card-date">${esc(g.date)}</span>`,
      title: g.title, sub: g.issuer, summary: g.summary, tags: g.tags, link: linkFor(g, "policies"), q,
    }),
  },
  news: {
    title: "行业动态", en: "Industry News", page: "news.html",
    get data() { return typeof NEWS !== "undefined" ? [...NEWS].sort((a, b) => String(b.date).localeCompare(String(a.date))) : []; },
    fields: (x) => [x.title, x.company, x.source, x.summary, x.tags.join(" "), x.date],
    render: (n, q) => cardShell({
      top: `<span class="card-venue">${hl(esc(n.company), q)}</span><span class="card-date">${esc(n.date)}</span>`,
      title: n.title, sub: "来源：" + n.source, summary: n.summary, tags: n.tags, link: linkFor(n, "news"), q,
    }),
  },
};

/* ---------------- 页头 / 页脚 ---------------- */

const NAV = [
  ["index.html", "首页"],
  ["papers.html", "前沿论文"],
  ["books.html", "经典著作"],
  ["policies.html", "政策法规"],
  ["news.html", "行业动态"],
  ["about.html", "关于"],
];

function currentPage() {
  const f = location.pathname.split("/").pop();
  return f && f.endsWith(".html") ? f : "index.html";
}

function renderChrome() {
  const cur = currentPage();
  const header = $("#site-header");
  if (header) {
    header.className = "topbar";
    header.innerHTML = `
    <div class="topbar-inner">
      <a class="brand" href="index.html">
        <svg class="brand-logo" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="18" class="ring" />
          <circle cx="20" cy="20" r="11.5" class="ring" />
          <path d="M20 20 L20 2 A18 18 0 0 1 35.6 11 Z" class="sweep" />
          <circle cx="20" cy="20" r="4.5" class="core" />
        </svg>
        <span class="brand-text"><strong>${SITE.name}</strong><small>${SITE.en}</small></span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="打开菜单" aria-expanded="false" aria-controls="mainNav">☰</button>
      <nav class="main-nav" id="mainNav">
        ${NAV.map(([href, label]) => `<a href="${href}" class="nav-link${href === cur ? " active" : ""}"${href === cur ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <form class="top-search" action="search.html" method="get" role="search">
        <span aria-hidden="true">⌕</span>
        <input id="topSearch" name="q" type="search" placeholder="全站搜索" autocomplete="off" aria-label="全站搜索"
               value="${cur === "search.html" ? esc(new URLSearchParams(location.search).get("q") || "") : ""}" />
        <kbd class="top-kbd" aria-hidden="true">/</kbd>
      </form>
      <button class="theme-toggle" id="themeToggle" title="切换明暗主题" aria-label="切换明暗主题">◐</button>
    </div>`;
  }
  const footer = $("#site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = `
      <p><b>${SITE.name}</b> · 水下机器人领域的论文、著作、政策与行业动态索引</p>
      <p class="footer-note">
        数据更新于 ${SITE.updated} · 每条内容均附来源链接，标注「检索」的条目暂缺原文链接 ·
        <a href="${SITE.repo}/issues" target="_blank" rel="noopener">纠错与投稿</a> ·
        <a href="${SITE.repo}" target="_blank" rel="noopener">源码</a>
      </p>`;
  }
  if (!$("#backTop")) {
    document.body.insertAdjacentHTML("beforeend", '<button id="backTop" class="back-top" title="回到顶部" aria-label="回到顶部">↑</button>');
  }
}

function bindChrome() {
  // 主题：记住用户选择；未选择时跟随系统
  $("#themeToggle")?.addEventListener("click", () => {
    const light = !document.documentElement.classList.contains("light");
    document.documentElement.classList.toggle("light", light);
    try { localStorage.setItem("uwr-theme", light ? "light" : "dark"); } catch (e) {}
  });

  // 移动端菜单
  const toggle = $("#navToggle");
  const nav = $("#mainNav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "×" : "☰";
  });

  // 回到顶部
  const back = $("#backTop");
  window.addEventListener("scroll", () => back.classList.toggle("show", window.scrollY > 500), { passive: true });
  back.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 按 / 聚焦搜索框：栏目页优先聚焦栏目内筛选框，其余页面聚焦全站搜索
  document.addEventListener("keydown", (e) => {
    if (e.key !== "/" || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    e.preventDefault();
    ($("#sectionSearch") || $("#homeSearch") || $("#topSearch"))?.focus();
  });
  $("#topSearch")?.addEventListener("keydown", (e) => { if (e.key === "Escape") e.target.value = ""; });
}

/* ---------------- 通用：标签筛选条 ---------------- */

// 按出现频次排序标签，默认只显示前 limit 个，其余折叠
function buildTagBar(container, items, active, onPick, limit = 12) {
  const freq = new Map();
  items.forEach((x) => x.tags.forEach((t) => freq.set(t, (freq.get(t) || 0) + 1)));
  const tags = [...freq.entries()].sort((a, b) => b[1] - a[1]).map(([t, n]) => ({ t, n }));
  const activeHidden = tags.findIndex((x) => x.t === active) >= limit;
  const chip = ({ t, n }, hidden) =>
    `<button class="chip${t === active ? " active" : ""}${hidden ? " extra" : ""}" data-tag="${esc(t)}">${esc(t)}${n != null ? `<span class="chip-n">${n}</span>` : ""}</button>`;
  container.innerHTML =
    chip({ t: "全部", n: items.length }, false) +
    tags.map((x, i) => chip(x, i >= limit)).join("") +
    (tags.length > limit ? `<button class="chip chip-more" data-more>${activeHidden ? "收起" : `更多标签（${tags.length - limit}）`}</button>` : "");
  container.classList.toggle("expanded", activeHidden);
  container.onclick = (e) => {
    const more = e.target.closest("[data-more]");
    if (more) {
      const exp = container.classList.toggle("expanded");
      more.textContent = exp ? "收起" : `更多标签（${tags.length - limit}）`;
      return;
    }
    const c = e.target.closest("[data-tag]");
    if (c) onPick(c.dataset.tag);
  };
}

/* ---------------- 启动 ---------------- */
renderChrome();
bindChrome();
