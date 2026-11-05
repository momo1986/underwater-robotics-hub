/* ============================================================
 * 栏目页：papers / books / policies / news
 * <body data-section="papers"> 决定渲染哪个栏目
 * 筛选状态写入 URL（?q=&tag=&era=），可直接分享链接
 * ============================================================ */

(function () {
  const key = document.body.dataset.section;
  const sec = SECTIONS[key];
  const PAGE_SIZE = 30;
  const all = sec.data;

  const params = new URLSearchParams(location.search);
  const state = {
    q: params.get("q") || "",
    tag: params.get("tag") || "全部",
    era: params.get("era") || "all", // 仅论文：all | recent | classic
    shown: PAGE_SIZE,
  };

  const input = $("#sectionSearch");
  const tagBar = $("#tagBar");
  const eraBar = $("#eraBar");
  const cards = $("#cards");
  const meta = $("#resultMeta");
  input.value = state.q;

  // 栏目副标题里的统计数字由数据计算，不再手写
  if (key === "papers") {
    const recent = all.filter((p) => p.year >= RECENT_YEAR).length;
    $("#sectionDesc").textContent = `共 ${all.length} 篇，其中 ${RECENT_YEAR} 年以来 ${recent} 篇。涵盖水下视觉、导航定位、运动控制、规划与强化学习、水声通信等方向，也收录这些方向常用的 AI / 控制 / 视觉 / SLAM 基础论文。`;
    $("[data-era=recent]").textContent = `${RECENT_YEAR} 年以来`;
    $("[data-era=classic]").textContent = `${RECENT_YEAR} 年以前`;
  } else {
    $("#sectionCount").textContent = all.length;
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set("q", state.q);
    if (state.tag !== "全部") p.set("tag", state.tag);
    if (state.era !== "all") p.set("era", state.era);
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function byEra(list) {
    if (key !== "papers" || state.era === "all") return list;
    return list.filter((p) => (state.era === "recent" ? p.year >= RECENT_YEAR : p.year < RECENT_YEAR));
  }

  function filtered() {
    return byEra(all).filter(
      (x) => (state.tag === "全部" || x.tags.includes(state.tag)) && matchQuery(sec.fields(x), state.q)
    );
  }

  function render() {
    const scope = byEra(all);
    buildTagBar(tagBar, scope, state.tag, (t) => { state.tag = t; state.shown = PAGE_SIZE; update(); });

    if (eraBar) {
      $$(".chip", eraBar).forEach((c) => c.classList.toggle("active", c.dataset.era === state.era));
    }

    const list = filtered();
    const filteredNow = state.q || state.tag !== "全部" || state.era !== "all";
    meta.innerHTML = filteredNow
      ? `找到 <b>${list.length}</b> 条结果 <button class="link-btn" id="resetFilters">清除筛选</button>`
      : `共 <b>${list.length}</b> 条`;
    $("#resetFilters")?.addEventListener("click", () => {
      Object.assign(state, { q: "", tag: "全部", era: "all", shown: PAGE_SIZE });
      input.value = "";
      update();
    });

    if (!list.length) {
      cards.innerHTML = `<div class="empty"><b>◎ 没有匹配的条目</b><br />换个关键词，或清除筛选再试。</div>`;
      return;
    }
    const shown = list.slice(0, state.shown);
    let html = shown.map((x) => sec.render(x, state.q)).join("");
    const remain = list.length - shown.length;
    if (remain > 0) {
      html += `<div class="empty load-more">已显示 ${shown.length} / ${list.length} 条<br /><button class="chip" id="loadMore">再显示 ${Math.min(remain, PAGE_SIZE)} 条</button></div>`;
    }
    cards.innerHTML = html;
    $("#loadMore")?.addEventListener("click", () => { state.shown += PAGE_SIZE; render(); });
  }

  function update() {
    syncUrl();
    render();
  }

  let timer;
  input.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => { state.q = input.value.trim(); state.shown = PAGE_SIZE; update(); }, 150);
  });
  input.addEventListener("keydown", (e) => { if (e.key === "Escape") { input.value = ""; state.q = ""; update(); } });

  eraBar?.addEventListener("click", (e) => {
    const c = e.target.closest("[data-era]");
    if (!c) return;
    state.era = c.dataset.era;
    state.tag = "全部";
    state.shown = PAGE_SIZE;
    update();
  });

  render();
})();
