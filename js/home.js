/* 首页：声呐屏（各栏目条目数）+ 观测读数 + 各栏目最新条目 */

(function () {
  const entries = Object.entries(SECTIONS);
  const CH = { papers: "01", books: "02", policies: "03", news: "04" };

  // 声呐屏上的「目标」：每个栏目一个，位置固定，数字来自数据
  const POS = { papers: [30, 34], news: [70, 28], policies: [72, 68], books: [32, 72] };
  $("#sonar").insertAdjacentHTML("beforeend", entries.map(([k, s], i) => `
    <a class="contact" href="${s.page}" style="left:${POS[k][0]}%;top:${POS[k][1]}%;--d:${i * 0.9}s">
      <span class="blip" aria-hidden="true"></span>
      <span class="contact-text"><b data-count="${s.data.length}">${s.data.length}</b><small>CH-${CH[k]} ${s.title}</small></span>
    </a>`).join(""));

  // 数字滚动动画
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$("[data-count]").forEach((el) => {
      const target = +el.dataset.count;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / 1100, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // 观测读数：全部来自真实数据
  const total = entries.reduce((n, [, s]) => n + s.data.length, 0);
  const papers = SECTIONS.papers.data;
  const recent = papers.filter((p) => p.year >= RECENT_YEAR).length;
  const latestNews = SECTIONS.news.data[0];
  const readings = [
    ["收录条目", total],
    [`${RECENT_YEAR} 年以来论文`, recent],
    ["最近动态", latestNews ? latestNews.date : "—"],
    ["数据更新", SITE.updated],
  ];
  $("#readout").innerHTML = `<div class="readout-inner">${readings
    .map(([k, v]) => `<div class="reading"><span>${k}</span><b>${esc(v)}</b></div>`)
    .join("")}</div>`;

  // 各栏目预览
  const previews = { papers: 4, news: 3, policies: 3, books: 3 };
  $("#previews").innerHTML = Object.entries(previews)
    .map(([k, n]) => {
      const s = SECTIONS[k];
      let items = s.data;
      if (k === "papers") items = [...items].sort((a, b) => b.year - a.year);
      return `
      <section class="zone">
        <header class="zone-head">
          <div>
            <p class="channel">CH-${CH[k]}</p>
            <h2>${s.title} <small>${s.en}</small></h2>
          </div>
          <a class="zone-more" href="${s.page}">查看全部 ${s.data.length} 条 →</a>
        </header>
        <div class="cards">${items.slice(0, n).map((x) => s.render(x, "")).join("")}</div>
      </section>`;
    })
    .join("");
})();
