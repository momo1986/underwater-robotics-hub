/* 搜索结果页：search.html?q=关键词
 * 不单独放输入框，直接复用页头的全站搜索框（#topSearch），输入即更新结果 */

(function () {
  const input = $("#topSearch");
  const meta = $("#resultMeta");
  const out = $("#results");
  const PER_SECTION = 12;

  function render() {
    const q = input.value.trim();
    history.replaceState(null, "", location.pathname + (q ? "?q=" + encodeURIComponent(q) : ""));
    document.title = (q ? `“${q}”的搜索结果 · ` : "搜索 · ") + SITE.name;
    $("#searchTitle").innerHTML = q ? `“${esc(q)}” <small>Search</small>` : "全站搜索 <small>Search</small>";

    if (!q) {
      meta.textContent = "在页面顶部的搜索框输入关键词，可同时检索论文、著作、政策和行业动态；多个关键词用空格分隔。";
      out.innerHTML = "";
      return;
    }

    let total = 0;
    const groups = Object.entries(SECTIONS).map(([k, s]) => {
      const hits = s.data.filter((x) => matchQuery(s.fields(x), q));
      total += hits.length;
      return { k, s, hits };
    });

    meta.innerHTML = `共命中 <b>${total}</b> 条：` +
      groups.map((g) => (g.hits.length ? `<a href="#res-${g.k}">${g.s.title} ${g.hits.length}</a>` : `<span class="muted">${g.s.title} 0</span>`)).join(" · ");

    out.innerHTML = groups
      .filter((g) => g.hits.length)
      .map((g) => `
      <section class="zone" id="res-${g.k}">
        <header class="zone-head">
          <div><h2>${g.s.title} <small>${g.hits.length} 条</small></h2></div>
          ${g.hits.length > PER_SECTION ? `<a class="zone-more" href="${g.s.page}?q=${encodeURIComponent(q)}">在${g.s.title}中查看全部 →</a>` : ""}
        </header>
        <div class="cards">${g.hits.slice(0, PER_SECTION).map((x) => g.s.render(x, q)).join("")}</div>
      </section>`)
      .join("") || `<div class="zone"><div class="empty"><b>◎ 没有回波</b><br />换个关键词试试，比如「SLAM」「声呐」「AUV」。</div></div>`;
  }

  let timer;
  input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(render, 150); });
  $(".top-search").addEventListener("submit", (e) => { e.preventDefault(); render(); });
  if (!input.value) input.focus();
  render();
})();
