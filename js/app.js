/* ============================================================
 * 深海机器人观测站 · 交互层
 * 渲染 / 筛选 / 全站搜索 / 滚动监听 / 主题切换
 * ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// HTML 转义，防注入
function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 搜索命中关键词高亮（对已转义文本）
function hl(escapedText, query) {
  if (!query) return escapedText;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return escapedText.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>");
}

function matchQuery(item, fields, query) {
  if (!query) return true;
  const text = fields.join(" ").toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((kw) => text.includes(kw));
}

/* ---------------- 通用渲染 ---------------- */

const CARD_NO = { papers: "arXiv / 期刊", books: "专著", policies: "法规", news: "资讯" };

function paperCard(p, i, query) {
  const isNew = p.year >= 2025;
  return `
  <article class="card">
    <div class="card-top">
      <span class="card-venue">${hl(esc(p.venue), query)} · ${p.year}${isNew ? '<span class="badge-new">NEW</span>' : ""}</span>
      <span class="card-date">No.${String(i + 1).padStart(2, "0")}</span>
    </div>
    <h3 class="card-title"><a href="${esc(p.url)}" target="_blank" rel="noopener">${hl(esc(p.title), query)}</a></h3>
    <div class="card-authors">${hl(esc(p.authors), query)}</div>
    <p class="card-summary">${hl(esc(p.summary), query)}</p>
    <div class="card-tags">${p.tags.map((t) => `<span class="tag">${hl(esc(t), query)}</span>`).join("")}</div>
    <div class="card-foot">
      <span class="card-no">${CARD_NO.papers}</span>
      <a class="card-link" href="${esc(p.url)}" target="_blank" rel="noopener">阅读原文 ↗</a>
    </div>
  </article>`;
}

function bookCard(b, i, query) {
  return `
  <article class="card">
    <div class="card-top">
      <span class="card-venue">${hl(esc(b.publisher), query)}</span>
      <span class="card-date">${b.year}</span>
    </div>
    <h3 class="card-title"><a href="${esc(b.url)}" target="_blank" rel="noopener">${hl(esc(b.title), query)}</a></h3>
    <div class="card-authors">${hl(esc(b.author), query)}</div>
    <p class="card-summary">${hl(esc(b.summary), query)}</p>
    <div class="card-tags">${b.tags.map((t) => `<span class="tag">${hl(esc(t), query)}</span>`).join("")}</div>
    <div class="card-foot">
      <span class="card-no">${CARD_NO.books} · 02-${String(i + 1).padStart(2, "0")}</span>
      <a class="card-link" href="${esc(b.url)}" target="_blank" rel="noopener">查看来源 ↗</a>
    </div>
  </article>`;
}

const LEVEL_BADGE = {
  "国家法律": "badge-law",
  "行政法规": "badge-rule",
  "部门规章": "badge-rule",
  "部门政策": "badge-plan",
  "国家规划": "badge-plan",
  "国际协定": "badge-intl",
  "地方政策": "badge-local",
};

function policyCard(g, i, query) {
  const badge = LEVEL_BADGE[g.level] || "badge-plan";
  return `
  <article class="card">
    <div class="card-top">
      <span class="badge ${badge}">${hl(esc(g.level), query)}</span>
      <span class="card-date">${hl(esc(g.date), query)}</span>
    </div>
    <h3 class="card-title"><a href="${esc(g.url)}" target="_blank" rel="noopener">${hl(esc(g.title), query)}</a></h3>
    <div class="card-authors">${hl(esc(g.issuer), query)}</div>
    <p class="card-summary">${hl(esc(g.summary), query)}</p>
    <div class="card-tags">${g.tags.map((t) => `<span class="tag">${hl(esc(t), query)}</span>`).join("")}</div>
    <div class="card-foot">
      <span class="card-no">${CARD_NO.policies} · 03-${String(i + 1).padStart(2, "0")}</span>
      <a class="card-link" href="${esc(g.url)}" target="_blank" rel="noopener">查看原文 ↗</a>
    </div>
  </article>`;
}

function newsCard(n, i, query) {
  return `
  <article class="card">
    <div class="card-top">
      <span class="card-venue">${hl(esc(n.company), query)}</span>
      <span class="card-date">${hl(esc(n.date), query)}</span>
    </div>
    <h3 class="card-title"><a href="${esc(n.url)}" target="_blank" rel="noopener">${hl(esc(n.title), query)}</a></h3>
    <div class="card-authors">来源：${hl(esc(n.source), query)}</div>
    <p class="card-summary">${hl(esc(n.summary), query)}</p>
    <div class="card-tags">${n.tags.map((t) => `<span class="tag">${hl(esc(t), query)}</span>`).join("")}</div>
    <div class="card-foot">
      <span class="card-no">${CARD_NO.news} · 04-${String(i + 1).padStart(2, "0")}</span>
      <a class="card-link" href="${esc(n.url)}" target="_blank" rel="noopener">阅读报道 ↗</a>
    </div>
  </article>`;
}

/* ---------------- 栏目配置 ---------------- */

const SECTIONS = [
  {
    key: "papers",
    data: PAPERS,
    tags: PAPER_TAGS,
    container: $("#paperCards"),
    filters: $("#paperFilters"),
    render: paperCard,
    fields: (x) => [x.title, x.authors, x.venue, x.summary, x.tags.join(" "), String(x.year)],
  },
  {
    key: "books",
    data: BOOKS,
    tags: BOOK_TAGS,
    container: $("#bookCards"),
    filters: $("#bookFilters"),
    render: bookCard,
    fields: (x) => [x.title, x.author, x.publisher, x.summary, x.tags.join(" "), String(x.year)],
  },
  {
    key: "policies",
    data: POLICIES,
    tags: POLICY_TAGS,
    container: $("#policyCards"),
    filters: $("#policyFilters"),
    render: policyCard,
    fields: (x) => [x.title, x.issuer, x.level, x.summary, x.tags.join(" "), x.date],
  },
  {
    key: "news",
    data: NEWS,
    tags: NEWS_TAGS,
    container: $("#newsCards"),
    filters: $("#newsFilters"),
    render: newsCard,
    fields: (x) => [x.title, x.company, x.source, x.summary, x.tags.join(" "), x.date],
  },
];

const PAGE_SIZE = 60; // 每页渲染条数（论文超 200 篇，避免一次性渲染）

const state = {
  query: "",
  active: Object.fromEntries(SECTIONS.map((s) => [s.key, "全部"])),
  shown: Object.fromEntries(SECTIONS.map((s) => [s.key, PAGE_SIZE])),
};

/* ---------------- 渲染 ---------------- */

function buildFilters(section) {
  const tags = ["全部", ...section.tags];
  section.filters.innerHTML = tags
    .map(
      (t) =>
        `<button class="chip${t === "全部" ? " active" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`
    )
    .join("");
}

function renderSection(section) {
  const q = state.query.trim();
  const activeTag = state.active[section.key];
  const list = section.data.filter(
    (item) =>
      (activeTag === "全部" || item.tags.includes(activeTag)) &&
      matchQuery(item, section.fields(item), q)
  );

  if (list.length === 0) {
    section.container.innerHTML = `
      <div class="empty">
        <b>◎ 未检索到匹配内容</b><br />
        当前栏目下没有同时满足「标签：${esc(activeTag)}」与「关键词：${esc(q)}」的条目。<br />
        换个关键词，或清除筛选试试。
      </div>`;
    return;
  }

  const shown = list.slice(0, state.shown[section.key]);
  let html = shown.map((item, i) => section.render(item, i, q)).join("");

  const remain = list.length - shown.length;
  if (remain > 0) {
    html += `
      <div class="empty load-more">
        已显示 ${shown.length} / ${list.length} 条
        <br /><br />
        <button class="chip" data-more="${section.key}">加载更多（还有 ${remain} 条）</button>
      </div>`;
  }
  section.container.innerHTML = html;
}

// 加载更多（事件委托）
document.querySelectorAll(".zone").forEach((zone) => {
  zone.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-more]");
    if (!btn) return;
    const key = btn.dataset.more;
    state.shown[key] += PAGE_SIZE;
    const section = SECTIONS.find((s) => s.key === key);
    renderSection(section);
    updateSearchMeta();
  });
});

function renderAll() {
  SECTIONS.forEach(renderSection);
  updateSearchMeta();
}

function updateSearchMeta() {
  const q = state.query.trim();
  const meta = $("#searchMeta");
  if (!q) {
    meta.hidden = true;
    return;
  }
  meta.hidden = false;
  let total = 0;
  const parts = SECTIONS.map((s) => {
    const n = s.data.filter(
      (item) =>
        (state.active[s.key] === "全部" || item.tags.includes(state.active[s.key])) &&
        matchQuery(item, s.fields(item), q)
    ).length;
    total += n;
    return `${s.key} ${n}`;
  });
  meta.textContent = `⌕ "${q}" — 命中 ${total} 条（${parts.join(" · ")}）`;
}

/* ---------------- 事件绑定 ---------------- */

// 搜索
const searchInput = $("#searchInput");
const searchClear = $("#searchClear");
let searchTimer = null;

searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.query = searchInput.value.trim();
    searchClear.classList.toggle("show", !!state.query);
    renderAll();
  }, 120);
});
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  searchClear.classList.remove("show");
  renderAll();
  searchInput.focus();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.activeElement === searchInput) {
    searchClear.click();
  }
  // 按 / 快速聚焦搜索框
  if (e.key === "/" && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
});

// 筛选 chips
SECTIONS.forEach((section) => {
  buildFilters(section);
  section.filters.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    state.active[section.key] = chip.dataset.tag;
    section.filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderSection(section);
    updateSearchMeta();
  });
});

// 滚动监听：导航高亮 + 回顶按钮
const navLinks = $$(".nav-link");
const zoneEls = ["papers", "books", "policies", "news", "about"].map((id) =>
  document.getElementById(id)
);

window.addEventListener("scroll", () => {
  const y = window.scrollY + 140;
  let currentId = null;
  zoneEls.forEach((el) => {
    if (el && el.offsetTop <= y) currentId = el.id;
  });
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`)
  );
  $("#backTop").classList.toggle("show", window.scrollY > 500);
});

$("#backTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// 主题切换
$("#themeToggle").addEventListener("click", () => document.body.classList.toggle("light"));

// 统计数字动画
function animateStats() {
  $$(".stat b").forEach((el) => {
    const target = +el.dataset.count;
    const start = performance.now();
    const duration = 900;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* ---------------- 启动 ---------------- */
renderAll();
animateStats();
