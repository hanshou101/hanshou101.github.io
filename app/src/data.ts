// 全部数值均来自可核对的仓库元数据（git log / GitHub API），不做估算。

export const EXPIRY = "2026.11";

export const SECTIONS = [
  { id: "hekaya", label: "当季作品" },
  { id: "craft", label: "古法时代" },
  { id: "spine", label: "日课" },
  { id: "cockpit", label: "知元纪" },
  { id: "lineage", label: "八年" },
  { id: "archive", label: "战史" },
  { id: "refresh", label: "保鲜" },
  { id: "contact", label: "联系" },
];

/** demo-ant-design-pro 的逐年提交数。2020 与 2026 为部分年度。 */
export const commitsByYear = [
  { year: "2020", n: 10, partial: true, note: "12 月建仓" },
  { year: "2021", n: 460, partial: false },
  { year: "2022", n: 841, partial: false },
  { year: "2023", n: 592, partial: false },
  { year: "2024", n: 555, partial: false },
  { year: "2025", n: 277, partial: false },
  { year: "2026", n: 29, partial: true, note: "截至 7 月" },
];

export const dailyDriver = {
  repo: "demo-ant-design-pro",
  commits: 2764,
  activeDays: 992,
  spanDays: 2047,
  from: "2020-12-17",
  to: "2026-07-21",
  tools: 97,
  files: 546,
};

/** src/pages/ycw —— 按渗透测试全生命周期编排的自建工具集 */
export const toolStages = [
  { key: "pre-engagement", label: "前期交涉", n: 3 },
  { key: "info-network", label: "信息收集", n: 1 },
  { key: "threat-modeling", label: "威胁建模", n: 1 },
  { key: "exp", label: "漏洞利用", n: 1 },
  { key: "post-exp", label: "后渗透", n: 1 },
  { key: "defensive", label: "防守反制", n: 5 },
  { key: "cve-analyze", label: "CVE 分析", n: 1 },
  { key: "radar", label: "资产雷达", n: 8 },
  { key: "radar-advance", label: "雷达进阶", n: 2 },
  { key: "report", label: "报告产出", n: 1 },
  { key: "special-skill", label: "专项技法", n: 27 },
  { key: "total", label: "总控", n: 1 },
  { key: "yewu-luoji", label: "业务逻辑", n: 1 },
];

export const specialSkills = [
  "xss", "sql", "ssrf", "csrf", "webshell", "reverse", "heap", "stack",
  "int", "string-format", "race-condition", "privilege-escalation",
  "bypass-waf", "bypass-antivirus", "weak-pwd", "account-hijack",
  "electron", "apk", "iot", "encode-decode", "code-review",
  "zero-day-vulnerability", "target-drone", "edu-src", "spot-detect-src",
  "xss-common-vuln", "career-path-plan",
];

/** 驾驶舱运行区 —— 2A-META 根目录下真在跑的模块 */
export const cockpit = [
  { name: "目标树", desc: "长期目标的分解与追踪" },
  { name: "积分账本", desc: "行为的计价与结算" },
  { name: "番茄流水", desc: "时间颗粒的原始流水" },
  { name: "复盘日记", desc: "每日复盘的沉淀" },
  { name: "复盘素材", desc: "复盘的原始素材池" },
  { name: "候选区", desc: "尚未进入主线的待定项" },
  { name: "资讯收件箱", desc: "外部信息的统一入口" },
];

export const plugin = [
  { k: "manifest.json", v: "标准 Obsidian 插件清单" },
  { k: "esbuild.config.mjs", v: "自建构建链" },
  { k: "src/core", v: "核心逻辑层" },
  { k: "src/channels", v: "数据通道层" },
  { k: "src/ui", v: "界面层" },
  { k: "test/", v: "测试" },
  { k: "versions.json", v: "版本管理" },
];

/**
 * 一条线，两股绳：
 * kind=repo  —— 明线，把人生反复写成仓库
 * kind=daily —— 暗线，demo-ant-design-pro 的逐年演进，填住 2020→2026 之间的空白
 */
export const lineage = [
  { year: "2018", kind: "repo", era: 1, name: "YCW-s_Auto_Life_Game",
    desc: "把人生的抉择全部汇聚为一个主干的游戏。三观全部炼为一炉。若人在，则游戏在——人的更新，就对应着版本的更新。" },
  { year: "2018", kind: "repo", era: 1, name: "YCW-s_Life_Before_2018.04.02",
    desc: "记录一些快速成长的三观。" },
  { year: "2020", kind: "repo", era: 2, name: "MyStepByStepLife",
    desc: "一步又一步，似蜗牛，似蜗牛。" },
  { year: "2020", kind: "repo", era: 2, name: "The_Game_Of_Life",
    desc: "关于生命的游戏。" },
  { year: "2020", kind: "repo", era: 2, name: "Life-Thought-Experience__memorial",
    desc: "人生、思想、经历，备忘录。" },
  { year: "2020.12", kind: "daily", era: 2, name: "demo-ant-design-pro 建仓", n: 10,
    desc: "此后五年半，这个仓库几乎每隔一天就有一次提交。下面这段，就是它填满的。" },
  { year: "2021", kind: "daily", era: 2, name: "工具与知识的第一次归拢", n: 460,
    desc: "流量分析菜单、疑难杂症检索、把多日的成果做整理——甚至塞进了唯物辩证法的条目。工具和知识还没分家。" },
  { year: "2022", kind: "daily", era: 2, name: "代码审计工具链成型", n: 841,
    desc: "正则排除树、Java 正则关键字库、可泛化的函数抽取。全期提交量的峰值年。" },
  { year: "2023", kind: "daily", era: 2, name: "接进 AI", n: 592,
    desc: "关键信息爬取与总结、一组 AI 连续自动化工具。审计工具链第一次和大模型接上。" },
  { year: "2024", kind: "daily", era: 3, name: "AI 平台化", n: 555,
    desc: "接入新的 AI 平台、做「AI 管理」、把时间轴做出来。从「用 AI」变成「管 AI」。" },
  { year: "2025", kind: "daily", era: 3, name: "转向表达与可视化", n: 277,
    desc: "UI 重做、分形三角形、左侧 Markdown 与右侧图形联动、思维导图长标题换行。开始在意好不好看。" },
  { year: "2026", kind: "daily", era: 3, name: "与驾驶舱、量化打通", n: 29,
    desc: "每天任务抽取到 Obsidian 模板、量化体系、CheckList 体系。工具箱终于接进了人生操作系统。" },
  { year: "2026", kind: "repo", era: 3, name: "life-task-system", desc: "人生任务系统。" },
  { year: "2026", kind: "repo", era: 3, name: "dao-logos-site", desc: "循环道统。" },
  { year: "2026", kind: "repo", era: 3, name: "all-human-company-site", desc: "全人公司。" },
  { year: "2026", kind: "repo", era: 3, name: "2A-META《知元纪》", flag: true,
    desc: "八年执念的收口：一套面向 AI 完全开放的知识文明系统，也是上面那一整条线唯一的终点。" },
];

export const archive = [
  { when: "2025.12", what: "Codex 还被严重低估的时候，**用一周从零做完一整套 SaaS**。那个时间点，全球做到的人我排第二。", dead: "2026.03 起归零" },
  { when: "2025.03", what: "**6 小时**完成 2000 道题、400 页的 OCR 提取、格式标准化、结果复校验与防泄密封装。", dead: "2025.09 起归零" },
  { when: "2026.03", what: "逆向研究 macOS 版 Codex.app 的 fast 模式入口，做成开源工具包。", dead: "2026.08 起归零" },
  { when: "2021–2025", what: "**15 场**国家级 / 省市级护网重保与攻防演练，**至今未丢一分**；其中一次在裁判组。" },
  { when: "2022–2024", what: "11 个甲方代码审计项目（某股份制银行、某央企数科总部、某省级农信、某头部手机厂商等）。" },
  { when: "2023", what: "给 **GitHub 官方 CodeQL 规则库**提交过规则集；挖出 **RuoYi 0day**。" },
  { when: "2023 / 2025", what: "上海期货交易所核心交易系统测试——二进制与通讯协议，国内无先例。" },
  { when: "2024.10", what: "某银行鸿蒙 APP 安全审计，ArkTS + Native C++ 双侧，**6 高危 5 中危**。" },
  { when: "2021", what: "vmd、美洽的 Electron 本地代码执行漏洞。" },
];

/** HekayaTV 的八条路由，每条都可直接点开 */
export const hekayaRoutes = [
  { path: "", label: "首页", desc: "从一句话，到一部短剧", shot: "shots/home.jpg" },
  { path: "studio/canvas", label: "画布工作流", desc: "剧本到成片的节点编排", shot: "shots/studio-canvas.jpg" },
  { path: "studio/director", label: "3D 导演台", desc: "镜位与走位", shot: "shots/studio-director.jpg" },
  { path: "studio/cast", label: "主体库", desc: "角色一致性管理", shot: "shots/studio-cast.jpg" },
  { path: "studio/dubbing", label: "配音间", desc: "方言配音与字幕", shot: "shots/studio-dubbing.jpg" },
  { path: "studio", label: "创作工作台", desc: "项目总览", shot: "shots/studio.jpg" },
  { path: "app", label: "观众端 App", desc: "消费侧体验", shot: "shots/app.jpg" },
  { path: "console", label: "运营驾驶舱", desc: "产能与投放", shot: "shots/console.jpg" },
];
