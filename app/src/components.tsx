import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { commitsByYear, SECTIONS } from "./data";
import heat from "./heat.json";

/* ────────────────────────────────────────────────
 * Reveal —— 基态可见，动画纯附加。
 * IntersectionObserver 不可用 / 不触发 / JS 挂掉，内容都照常显示。
 * ──────────────────────────────────────────────── */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (es) => es.some((e) => e.isIntersecting) && (setPlayed(true), io.disconnect()),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={played ? "rv rv-in" : "rv"}
      style={played && delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/** 顶部滚动进度条 */
export function Progress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setP(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} />;
}

/** 左侧固定章节索引（桌面端）。基态就渲染，只是高亮态靠 JS。 */
export function Rail() {
  const [active, setActive] = useState(SECTIONS[0].id);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (es) => {
        const vis = es.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="rail" aria-label="章节索引">
      <ol>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? "on" : ""}>
              <i /><span>{s.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** 数字滚动。prefers-reduced-motion 或无 rAF 时直接落终值。 */
export function CountUp({ to, dur = 1100 }: { to: number; dur?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, guard = 0;
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min((t - t0) / dur, 1);
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      setV(0);
      raf = requestAnimationFrame(tick);
      // 兜底：万一 rAF 不推进（无头浏览器、后台标签页），也必须落到终值，
      // 绝不把一个半路的错数字留在页面上。
      guard = window.setTimeout(() => { cancelAnimationFrame(raf); setV(to); }, dur + 400);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); clearTimeout(guard); };
  }, [to, dur]);
  return <span ref={ref}>{v.toLocaleString()}</span>;
}

/* ────────────────────────────────────────────────
 * 五年半提交热力图。
 * 顺序型编码（单一色相，按量分档），已过 dataviz 校验器双模式四项检查。
 * 每格带 hover tooltip；图例给出分档口径。
 * ──────────────────────────────────────────────── */
const BUCKETS = [1, 3, 6, 11]; // 每周合计：1–2 / 3–5 / 6–10 / 11+
function level(n: number) {
  if (n <= 0) return 0;
  let l = 1;
  for (let i = 1; i < BUCKETS.length; i++) if (n >= BUCKETS[i]) l = i + 1;
  return l;
}

/**
 * 五年半提交热力图。
 * 一行一年、一格一周（该周提交合计）—— 这样 5.6 年能整个铺进桌面宽度里一眼看完，
 * 不必横向滚动。顺序型编码：单一色相按量分四档，已过 dataviz 校验器双模式检查。
 */
export function Heatmap() {
  const [tip, setTip] = useState<{ x: number; y: number; text: string } | null>(null);
  const start = new Date(heat.start + "T00:00:00Z");
  const counts = heat.counts as number[];

  // 先按周合计，再按自然年分行
  type Wk = { iso: string; n: number; week: number };
  const byYear = new Map<string, Wk[]>();
  for (let i = 0; i < counts.length; i += 7) {
    const d = new Date(start);
    d.setUTCDate(d.getUTCDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const y = iso.slice(0, 4);
    const n = counts.slice(i, i + 7).reduce((a, b) => a + b, 0);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push({ iso, n, week: byYear.get(y)!.length });
  }
  const years = [...byYear.keys()].sort();
  const cols = Math.max(...years.map((y) => byYear.get(y)!.length));

  return (
    <figure className="heat">
      <figcaption>
        <div className="chart-title">{"demo-ant-design-pro · 五年半提交热力图"}</div>
        <div className="chart-sub">
          2020-12-17 → 2026-07-21，共 2047 天，其中 992 天有提交。一行一年，一格一周。
        </div>
      </figcaption>

      <div className="heat-rows" role="img"
        aria-label="五年半提交热力图：2047 天中 992 天有提交，2022 年密度最高">
        {years.map((y) => {
          const wks = byYear.get(y)!;
          return (
            <div className="heat-row" key={y}>
              <span className="yr">{y}</span>
              <div className="heat-cells" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {Array.from({ length: cols }, (_, c) => {
                  const wk = wks[c];
                  if (!wk) return <div className="cell void" key={c} />;
                  return (
                    <div
                      key={c}
                      className={`cell l${level(wk.n)}`}
                      onMouseEnter={(e) => {
                        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        setTip({
                          x: r.left + r.width / 2, y: r.top,
                          text: `${wk.iso} 那一周 · ${wk.n ? wk.n + " 次提交" : "无提交"}`,
                        });
                      }}
                      onMouseLeave={() => setTip(null)}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="heat-legend">
        <span>少</span>
        <i className="cell l0" /><i className="cell l1" /><i className="cell l2" /><i className="cell l3" /><i className="cell l4" />
        <span>多</span>
        <em>每周 0 / 1–2 / 3–5 / 6–10 / 11+ 次提交　·　逐年精确数字见下方柱状图</em>
      </div>

      {tip && <div className="floattip" style={{ left: tip.x, top: tip.y }}>{tip.text}</div>}
    </figure>
  );
}

/** 逐年提交数。单序列 → 无图例，标题即命名。部分年度斜纹标注。 */
export function CommitChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...commitsByYear.map((d) => d.n));
  return (
    <div className="chart">
      <div className="chart-title">逐年提交数</div>
      <div className="chart-sub">斜纹为部分年度（2020 年 12 月建仓；2026 年截至 7 月），不与完整年度直接比较</div>
      <div className="bars">
        {commitsByYear.map((d, i) => (
          <div key={d.year} className={"barcol" + (d.partial ? " part" : "")}
            onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {hover === i && <div className="tip">{d.n} commits{d.note && <em>{d.note}</em>}</div>}
            {d.n === max && <div className="val">{d.n}</div>}
            <div className="bar" style={{ height: `${Math.max((d.n / max) * 100, 1.5)}%` }} />
          </div>
        ))}
      </div>
      <div className="xaxis">{commitsByYear.map((d) => <div key={d.year}>{d.year}</div>)}</div>
    </div>
  );
}

/**
 * HekayaTV 实机舞台。
 * 原站是按 PC 桌面设计的，所以在 1600px 的逻辑宽度上渲染，再整体等比缩放到容器宽度——
 * 绝不把它压进窄容器里变形。
 */
export function Stage({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(0.5);
  const W = 1600, H = 980;
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setS(Math.min(el.clientWidth / W, 1));
    fit();
    if (typeof ResizeObserver === "undefined") { window.addEventListener("resize", fit); return () => window.removeEventListener("resize", fit); }
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="stage" ref={box} style={{ height: H * s }}>
      <iframe
        src={src} title={title} loading="lazy"
        style={{ width: W, height: H, transform: `scale(${s})`, transformOrigin: "top left" }}
      />
    </div>
  );
}

export function Lightbox({ i, items, onClose, onMove }: {
  i: number | null;
  items: { shot: string; label: string; desc: string }[];
  onClose: () => void;
  onMove: (d: number) => void;
}) {
  useEffect(() => {
    if (i === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [i, onClose, onMove]);
  if (i === null) return null;
  const it = items[i];
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={it.label}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={it.shot} alt={it.label} />
        <figcaption>
          <b>{it.label}</b><span>{it.desc}</span>
          <div className="lb-nav">
            <button onClick={() => onMove(-1)} aria-label="上一张">←</button>
            <em>{i + 1} / {items.length}</em>
            <button onClick={() => onMove(1)} aria-label="下一张">→</button>
          </div>
        </figcaption>
      </figure>
      <button className="lb-close" onClick={onClose} aria-label="关闭">✕</button>
    </div>
  );
}

export function Mountain() {
  return (
    <svg className="mountain" viewBox="0 0 1200 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="层叠的山峰，一个人站在近处的峰顶上，望向更远更高的山">
      <defs>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era1)" stopOpacity=".38" />
          <stop offset="100%" stopColor="var(--era1)" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era2)" stopOpacity=".52" />
          <stop offset="100%" stopColor="var(--era2)" stopOpacity=".08" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era3)" stopOpacity=".92" />
          <stop offset="100%" stopColor="var(--era3)" stopOpacity=".26" />
        </linearGradient>
      </defs>
      <path d="M620 300 L880 52 L952 132 L1020 74 L1200 300 Z" fill="url(#far)" />
      <path d="M360 300 L610 92 L692 176 L800 116 L1010 300 Z" fill="url(#mid)" />
      <path d="M0 300 L232 108 L330 204 L414 148 L610 300 Z" fill="url(#near)" />
      <circle cx="232" cy="92" r="5" fill="var(--text-primary)" />
      <path d="M232 98 L232 114 M232 103 L223 109 M232 103 L241 108 M232 114 L226 126 M232 114 L239 126"
        stroke="var(--text-primary)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M247 94 L870 55" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 7" opacity=".7" />
      <circle cx="880" cy="52" r="3.6" fill="var(--accent)" />
    </svg>
  );
}

/** 把 **粗体** 标记渲染成 <b> */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <b key={i}>{p.slice(2, -2)}</b>
          : <span key={i}>{p}</span>
      )}
    </>
  );
}
