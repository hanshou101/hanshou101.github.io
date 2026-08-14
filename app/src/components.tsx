import { useEffect, useRef, useState } from "react";
import { commitsByYear } from "./data";

/**
 * 进入视口时播放一次入场动画。
 *
 * 设计要点：**基态就是可见的**。动画是纯附加的 CSS keyframes，只在元素进入视口时
 * 加一个 class 播放一次。IntersectionObserver 不可用、不触发，或 JS 整个挂掉，
 * 内容都照常显示 —— 绝不让动画成为内容可见性的前置条件。
 */
export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPlayed(true);
          io.disconnect();
        }
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={played ? "rv rv-in" : "rv"}
      style={played && delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * 逐年提交数。单序列 → 不需要图例，标题即命名。
 * 部分年度用斜纹填充并在 tooltip 中标注，避免与完整年度直接比较。
 */
export function CommitChart() {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...commitsByYear.map((d) => d.n));
  return (
    <div className="chart">
      <div className="chart-title">demo-ant-design-pro · 逐年提交数</div>
      <div className="chart-sub">
        斜纹为部分年度（2020 年 12 月建仓；2026 年截至 7 月），不与完整年度直接比较
      </div>
      <div className="bars">
        {commitsByYear.map((d, i) => (
          <div
            key={d.year}
            className={"barcol" + (d.partial ? " part" : "")}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === i && (
              <div className="tip">
                {d.n} commits
                {d.note && <em>{d.note}</em>}
              </div>
            )}
            {d.n === max && <div className="val">{d.n}</div>}
            <div className="bar" style={{ height: `${Math.max((d.n / max) * 100, 1.5)}%` }} />
          </div>
        ))}
      </div>
      <div className="xaxis">
        {commitsByYear.map((d) => (
          <div key={d.year}>{d.year}</div>
        ))}
      </div>
    </div>
  );
}

export function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [src, onClose]);
  if (!src) return null;
  return (
    <button className="lightbox" onClick={onClose} aria-label="关闭大图">
      <img src={src} alt="" />
    </button>
  );
}

export function Mountain() {
  return (
    <svg
      className="mountain"
      viewBox="0 0 760 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="层叠的山峰，一个人站在近处的峰顶上，望向更远更高的山"
    >
      <defs>
        <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era1)" stopOpacity=".38" />
          <stop offset="100%" stopColor="var(--era1)" stopOpacity=".06" />
        </linearGradient>
        <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era2)" stopOpacity=".55" />
          <stop offset="100%" stopColor="var(--era2)" stopOpacity=".10" />
        </linearGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--era3)" stopOpacity=".90" />
          <stop offset="100%" stopColor="var(--era3)" stopOpacity=".28" />
        </linearGradient>
      </defs>
      <path d="M400 240 L556 44 L604 104 L648 62 L760 240 Z" fill="url(#far)" />
      <path d="M232 240 L392 78 L446 140 L512 96 L640 240 Z" fill="url(#mid)" />
      <path d="M0 240 L150 96 L214 168 L268 128 L392 240 Z" fill="url(#near)" />
      <circle cx="150" cy="82" r="4.4" fill="var(--text-primary)" />
      <path
        d="M150 87 L150 100 M150 91 L143 96 M150 91 L157 95 M150 100 L145 110 M150 100 L156 110"
        stroke="var(--text-primary)"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M162 84 L548 46" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 6" opacity=".75" />
      <circle cx="556" cy="44" r="3.4" fill="var(--accent)" />
    </svg>
  );
}

/** 把 **粗体** 标记渲染成 <b> */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : <span key={i}>{p}</span>
      )}
    </>
  );
}
