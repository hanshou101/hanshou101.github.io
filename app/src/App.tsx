import { useCallback, useState } from "react";
import {
  Reveal, Progress, Rail, CountUp, Heatmap, CommitChart, Stage, Lightbox, Mountain, Rich,
} from "./components";
import {
  archive, cockpit, dailyDriver, hekayaRoutes, lineage, plugin,
  specialSkills, toolStages, EXPIRY,
} from "./data";

const HK = "/hekaya/";

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  return () => {
    const n = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", n);
    try { localStorage.setItem("ycw-theme", n); } catch {}
    setTheme(n);
  };
}

/** 光标聚光：把鼠标位置写进 CSS 变量 */
function spot(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function App() {
  const flip = useTheme();
  const [box, setBox] = useState<number | null>(null);
  const move = useCallback(
    (d: number) => setBox((i) => (i === null ? i : (i + d + hekayaRoutes.length) % hekayaRoutes.length)),
    []
  );

  return (
    <>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <Progress />

      <div className="bar">
        <div className="bar-in">
          <div className="sig">严崇文 <span>· 小严同学</span></div>
          <div className="spacer" />
          <a className="cta" href={HK} target="_blank" rel="noopener">HekayaTV 实机 ↗</a>
          <button className="toggle" onClick={flip} aria-label="切换明暗主题">明 / 暗</button>
        </div>
      </div>

      <div className="shell">
        <Rail />

        <main>
          {/* ══ HERO ══ */}
          <section className="hero first">
            <span className="expiry" style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              border: "1px solid var(--hairline)", borderRadius: 999, padding: "6px 15px 6px 12px",
              fontSize: 12.5, color: "var(--text-secondary)", background: "var(--surface-2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
              本页有效期至 <b style={{ color: "var(--text-primary)" }}>{EXPIRY}</b> · 到期重写
            </span>
            <h1><em>AI 大玩家</em>不做 AI，玩 AI。</h1>
            <p className="lede">这行三个月一次改朝换代，<strong>我每次都在第一批。</strong></p>
            <Mountain />
            <blockquote>
              我是登山者。登山之前，兴致勃勃；登上峰顶之后，兴致缺缺。<br />
              我来到，我看见，我征服——掌握一个难关之后，我不留恋，直接前往下一座还没登顶的、更高的山。
            </blockquote>
          </section>

          {/* ══ HEKAYA ══ */}
          <section id="hekaya">
            <Reveal>
              <div className="kicker">当季在架 · 现在时</div>
              <div className="hk-head">
                <div>
                  <h2 style={{ marginBottom: 12 }}>HekayaTV</h2>
                  <p className="lede" style={{ marginTop: 0 }}>
                    حكاية —— 阿拉伯语「故事」。<strong>从一句话，到一部短剧。</strong>
                  </p>
                </div>
                <a className="btn" href={HK} target="_blank" rel="noopener">打开实机 ↗</a>
              </div>
              <p style={{ marginTop: 22 }}>
                面向中东 · 北非 · 拉美蓝海市场的 AI 短剧平台。八条路由、一条完整生产线：
                剧本生成 → 分镜 → 镜头生成 → 3D 导演台 → 主体库 → 配音与字幕 → 合规预检 → 成片发行。
                <strong>下面这个框里是真的在跑的它</strong>——按它原本的桌面宽度渲染，再整体缩放，所以版面不会被挤变形。
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="browser">
                <div className="browser-bar">
                  <i /><i /><i />
                  <span className="browser-url">hanshou101.github.io/hekaya/</span>
                  <a href={HK} target="_blank" rel="noopener">新标签打开 ↗</a>
                </div>
                <Stage src={HK} title="HekayaTV 实时预览" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <p style={{ marginTop: 30, marginBottom: 0, fontSize: 15 }}>
                八条路由都可以直接点开——<strong>点缩略图看大图，点标题进实机</strong>。
              </p>
              <div className="routes">
                {hekayaRoutes.map((r, i) => (
                  <div className="route" key={r.path || "home"}>
                    <button
                      className="thumb"
                      onClick={() => setBox(i)}
                      style={{ border: 0, padding: 0, width: "100%", cursor: "zoom-in", display: "block" }}
                      aria-label={`放大查看 ${r.label}`}
                    >
                      <img src={r.shot} alt={r.label} loading="lazy" />
                      <span className="zoom">点击放大</span>
                    </button>
                    <a className="meta" href={HK + r.path} target="_blank" rel="noopener"
                      style={{ display: "block", borderBottom: 0 }}>
                      <b>{r.label} ↗</b>
                      <span>{r.desc}</span>
                    </a>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="tagrow">
                <span className="tag live">2026.07</span>
                <span className="tag">Next.js 14</span>
                <span className="tag">three.js / react-three-fiber</span>
                <span className="tag">xyflow 节点画布</span>
                <span className="tag">8 条路由全静态预渲染</span>
              </div>
              <div className="credit spot" onMouseMove={spot}>
                <b>署名：导演。</b> HekayaTV 是我指挥 Fable 5 做的。我的活儿是知道这个活该派谁去，
                以及看一眼就知道它做得好不好。Fable 5 的审美让我击节称赞——
                <b>能认出这一点，是我从古法时代带出来的、唯一还在增值的东西。</b>
              </div>
            </Reveal>
          </section>

          {/* ══ 古法时代 ══ */}
          <section id="craft">
            <Reveal>
              <div className="kicker">古法时代</div>
              <h2>那是没有 AI 的年代。<br />一个人要把整条链路，亲手吃透。</h2>
              <div className="duo">
                <div>
                  <p>
                    前端主程，公司自研的期货合约交易系统；CocosCreator 2D 游戏的主力开发；用 WASM 和 Rust
                    做前端性能优化；推动整个公司的 TypeScript 化。然后转身进安全——15 场国家级、省市级的护网重保，
                    至今未丢一分，其中一次坐在裁判组；11 个甲方的代码审计；开源框架 RuoYi 的 0day；
                    上海期货交易所的核心交易系统测试，国内没有先例。
                  </p>
                  <p>
                    没有 AI 兜底。每一个漏洞得自己盯出来，每一行代码得自己读进去，每一次上线前端自研自测零差错，
                    还要预设兜底方案。那不是一堆过时的库存——<strong>那是我的珍藏。</strong>
                  </p>
                </div>
                <div>
                  <p className="big" style={{ marginTop: 4 }}>
                    那个年代的手艺，是一手的、真人的、不可替代的。
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote style={{ borderColor: "var(--gold)", marginTop: 46 }}>
                但新航海时代已经开了。<br />
                <strong>我要启程了。</strong>
              </blockquote>
              <p>
                我带走的不是那些具体的招式——招式 AI 现在都会。我带走的是一双被古法磨出来的眼睛：
                <strong>AI 吐出来的东西，我一眼看得出是好是坏。</strong>
              </p>
              <p>
                我不是一个看不懂输出的 vibe coder，我是一个读了十年别人代码的人。
                在人人都能生产的时代，这叫审美——它是目前唯一还没被 AI 拉平的东西。
              </p>
            </Reveal>
          </section>

          {/* ══ 日课 ══ */}
          <section id="spine">
            <Reveal>
              <div className="kicker">没有断过 · 日课</div>
              <h2>我的时间线上没有空白。<br />只是有些线，不在明处。</h2>
              <p>
                人生仓库是明线，一年冒一个头。真正没断过的是暗线——一个叫 <code>{dailyDriver.repo}</code> 的仓库，
                从 {dailyDriver.from} 建仓到 {dailyDriver.to}，五年半，一直在写。
              </p>
              <div className="stats">
                <div className="stat"><b><CountUp to={dailyDriver.commits} /></b><span>次提交</span></div>
                <div className="stat"><b><CountUp to={dailyDriver.activeDays} /></b><span>个活跃日</span></div>
                <div className="stat"><b>5.6</b><span>年，未断</span></div>
                <div className="stat"><b><CountUp to={dailyDriver.tools} /></b><span>个独立工具</span></div>
              </div>
            </Reveal>

            <Reveal delay={0.05}><Heatmap /></Reveal>

            <Reveal delay={0.06}>
              <div className="duo tight" style={{ marginTop: 50 }}>
                <CommitChart />
                <div className="note" style={{ marginTop: 34 }}>
                  {dailyDriver.activeDays} 个活跃日，摊在 {dailyDriver.spanDays} 天里——
                  <b>差不多每隔一天就有一次提交，连续五年半。</b>
                  这不是「某一年做了个项目」，这是日课。
                  <br /><br />
                  2022 年是峰值：841 次提交，代码审计工具链在那一年成型。
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h3 style={{ marginTop: 60, fontSize: 22 }}>里面装的是什么</h3>
              <p>
                一整套按渗透测试全生命周期编排的自建工具集，{dailyDriver.files} 个文件、
                {dailyDriver.tools} 个独立工具，从前期交涉一路排到报告产出。
              </p>
              <div className="stages">
                {toolStages.map((s) => (
                  <div className="stage-card spot" key={s.key} onMouseMove={spot}>
                    <i>{s.n}</i><b>{s.label}</b><code>{s.key}</code>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 28, fontSize: 15 }}>
                其中 <strong>special-skill</strong> 一个目录就装了 27 项专项技法：
              </p>
              <div className="chips">
                {specialSkills.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </Reveal>
          </section>

          {/* ══ 知元纪（前置到「八年」之前） ══ */}
          <section id="cockpit">
            <Reveal>
              <div className="kicker">正在跑 · 知元纪</div>
              <h2>《知元纪》不是一个文档库。<br />它是一套在跑的人生操作系统。</h2>
              <div className="duo">
                <div>
                  <p>
                    2A-META 叫《知元纪》——AI-First 时代的开放知识文明系统。这个名字听起来很大，
                    但它落地的方式非常具体：<strong>根目录下有一个「驾驶舱运行区」，七个模块每天在跑。</strong>
                  </p>
                  <p>
                    目标在分解，积分在结算，番茄在计时，复盘每天沉淀，外部资讯统一进收件箱，
                    还没想清楚的东西先扔进候选区等待。<strong>驾驶舱不是比喻——它是真的仪表盘。</strong>
                  </p>
                </div>
                <div>
                  <p className="big" style={{ marginTop: 4 }}>
                    连接信息、目标、Agent、预测、协同、迭代与长期记忆。
                  </p>
                </div>
              </div>
              <div className="cock">
                {cockpit.map((c) => (
                  <div className="cockitem spot" key={c.name} onMouseMove={spot}>
                    <b>{c.name}</b><span>{c.desc}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h3 style={{ marginTop: 58, fontSize: 22 }}>仪表盘是我自己写的</h3>
              <p>
                它的子模块 <code>Awesome_ObsidianPlugin_HugeRepo</code> 里，
                <strong><code>plugins/life-cockpit</code> 是一个完整的 Obsidian 插件</strong>——
                不是配置片段，是一个有构建链、有分层架构、有测试、有版本管理的正经工程。
                <code>Easy-Git</code> 也挂在子模块里。
              </p>
              <div className="plugin">
                {plugin.map((p) => (
                  <div className="row" key={p.k}><code>{p.k}</code><span>{p.v}</span></div>
                ))}
              </div>
              <div className="note">
                所以《知元纪》这一条，和别人「我也在用 Obsidian 记笔记」不是一件事。
                <b>它是一个自己写引擎、自己定义数据结构、自己每天在上面跑的系统</b>——
                而且它是下面那条八年长线唯一的收口。
              </div>
            </Reveal>
          </section>

          {/* ══ 八年谱系 ══ */}
          <section id="lineage">
            <Reveal>
              <div className="kicker">不可压缩 · 完成时</div>
              <h2>AI 能在一个下午复制我的任何一项技能，<br />但复制不了这八年。</h2>
              <p>
                下面这条线有两股绳：<strong>大点是明线</strong>——我把自己的人生反复写成仓库；
                <strong>小点是暗线</strong>——{dailyDriver.repo} 的逐年演进，正好填住 2020 到 2026 之间的每一年。
                两股绳从 2018 拧到 2026，中间没有一年是空的。
              </p>
              <div className="tl">
                {lineage.map((r, i) => (
                  <div className={`node ${r.kind}${r.flag ? " flag" : ""}`} key={i}>
                    <i style={{ background: `var(--era${r.era})` }} />
                    <div className="yr">{r.year}</div>
                    <div className="nm">
                      {r.name}
                      {"n" in r && r.n ? <span className="n">{r.n} commits</span> : null}
                    </div>
                    <div className="ds">{r.desc}</div>
                  </div>
                ))}
              </div>
              <div className="note">
                旁边还堆着 179 个我自己的仓库，从 2017 年到现在。
                但<b>数量在这个时代不稀缺，时间才稀缺</b>——它的成本不是技能，是八年。
              </div>
            </Reveal>
          </section>

          {/* ══ 战史 ══ */}
          <section id="archive">
            <Reveal>
              <div className="kicker">已归档 · 战史</div>
              <h2>下面这些都过期了。<br />我知道，所以我标了日期。</h2>
              <p>
                一件事的价值不锁定在你做成它的那天，锁定在<strong>它变得人人可做的那天</strong>。
                下面每一条在当时都是稀缺的，今天都不是了。它们放在这里是记录，不是能力条——
                就像 1970 年的世界纪录，是历史，不是今天的百米成绩。
              </p>
              <div className="arc">
                {archive.map((a, i) => (
                  <div className="rec" key={i}>
                    <div className="when">{a.when}</div>
                    <div className="what">
                      <Rich text={a.what} />
                      {a.dead && <span className="dead">（{a.dead}）</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="note">
                <b>为什么要标归零日期？</b> 因为这行三个月改一次朝。能报出每一项资产的折旧时刻，
                本身就是我还在场上的证明——不敢标日期的人，才是真的过期了。
              </div>
            </Reveal>
          </section>

          {/* ══ 保鲜 ══ */}
          <section id="refresh">
            <Reveal>
              <div className="kicker">保鲜机制</div>
              <h2>这一页每三个月重写一次。</h2>
              <p>
                因为在这个行业里，一份静态的自我介绍从写完那天就开始腐烂。
                所以这不是一份简历，是一个<strong>按季度重跑的流程</strong>——已经配成定时任务，自己会跑。
              </p>
              <ol className="rules">
                <li>每件作品和成就过一遍，只问一个问题：<strong>一个新手加当月最强的 AI，一个下午能不能做出来？</strong>能——划掉，或降级成带日期的战史。</li>
                <li>检查当季旗舰是否还打得过同期作品。打不过就换掉。<strong>旗舰位永远只放当季作品。</strong></li>
                <li>更新前置位声明：「那个我三个月前就不用了」——里面的「那个」和「现在在玩的」，两个词都要换。</li>
                <li>古法那一段、八年那条线、驾驶舱，都不用改。它们是设计成不折旧的。</li>
              </ol>
              <div className="note" style={{ marginTop: 36 }}>
                下一次重写：<b>2026 年 11 月</b>。如果你看到这一页过了期还没更新，那说明我掉队了——这个判断我授权你替我做。
              </div>
            </Reveal>
          </section>

          {/* ══ 联系 ══ */}
          <section id="contact">
            <Reveal>
              <div className="kicker">联系</div>
              <div className="duo">
                <div>
                  <h2 style={{ marginBottom: 18 }}>别问我会什么。</h2>
                  <p className="big" style={{ maxWidth: "28ch" }}>
                    那个答案三个月就过期。问我上个月在玩什么，和下个月准备扔掉什么。
                  </p>
                </div>
                <div className="links" style={{ marginTop: 8, flexDirection: "column", alignItems: "flex-start" }}>
                  <a href="mailto:yanchongwen101@163.com"><span>Email</span>yanchongwen101@163.com</a>
                  <a href="https://github.com/hanshou101" rel="me noopener"><span>GitHub</span>@hanshou101</a>
                  <a href={HK} target="_blank" rel="noopener"><span>当季作品</span>HekayaTV 实机 ↗</a>
                </div>
              </div>
            </Reveal>
          </section>

          <footer>
            <p>严崇文 · 小严同学 —— 古法全栈开发 · 古法全栈安全 · 维新派 AI 小学生 · 量化小学生</p>
            <p>（其实句句属实，甚至还过于谦虚。）</p>
            <p style={{ marginTop: 20 }}>本页有效期至 2026 年 11 月 · 过期即失效，请以最新版本为准</p>
          </footer>
        </main>
      </div>

      <Lightbox i={box} items={hekayaRoutes} onClose={() => setBox(null)} onMove={move} />
    </>
  );
}
