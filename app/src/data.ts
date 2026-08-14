// 全部数值均来自可核对的仓库元数据（git log / GitHub API），不做估算。

/** demo-ant-design-pro 的逐年提交数。2026 为部分年度（截至 2026-07-21）。 */
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

/** 2A-META《知元纪》的驾驶舱运行区 —— 一个真在跑的人生操作系统 */
export const cockpit = [
  { name: "目标树", desc: "长期目标的分解与追踪" },
  { name: "积分账本", desc: "行为的计价与结算" },
  { name: "番茄流水", desc: "时间颗粒的原始流水" },
  { name: "复盘日记", desc: "每日复盘的沉淀" },
  { name: "复盘素材", desc: "复盘的原始素材池" },
  { name: "候选区", desc: "尚未进入主线的待定项" },
  { name: "资讯收件箱", desc: "外部信息的统一入口" },
];

/** 明线：把自己的人生反复写成仓库 */
export const lifeRepos = [
  { year: "2018", name: "YCW-s_Auto_Life_Game", desc: "把人生的抉择全部汇聚为一个主干的游戏。三观全部炼为一炉。若人在，则游戏在——人的更新，就对应着版本的更新。", era: 1 },
  { year: "2018", name: "YCW-s_Life_Before_2018.04.02", desc: "记录一些快速成长的三观。", era: 1 },
  { year: "2020", name: "MyStepByStepLife", desc: "一步又一步，似蜗牛，似蜗牛。", era: 2 },
  { year: "2020", name: "The_Game_Of_Life", desc: "关于生命的游戏。", era: 2 },
  { year: "2020", name: "Life-Thought-Experience__memorial", desc: "人生、思想、经历，备忘录。", era: 2 },
  { year: "2026", name: "life-task-system", desc: "人生任务系统。", era: 3 },
  { year: "2026", name: "dao-logos-site", desc: "循环道统。", era: 3 },
  { year: "2026", name: "all-human-company-site", desc: "全人公司。", era: 3 },
  { year: "2026", name: "2A-META《知元纪》", desc: "AI-First 时代的开放知识文明系统。它不是一个文档库——驾驶舱运行区在跑，Obsidian 的人生驾驶舱插件是它的子模块。", era: 3, flag: true },
];

/** 战史：每条都锁定日期与当时的稀缺性 */
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

export const shots = [
  { src: "shots/hk1-home.jpg", label: "首页 · 从一句话，到一部短剧" },
  { src: "shots/hk5-studio-canvas.jpg", label: "画布工作流 · 剧本到成片的节点编排" },
  { src: "shots/hk6-studio-director.jpg", label: "3D 导演台" },
  { src: "shots/hk7-studio-dubbing.jpg", label: "配音间" },
  { src: "shots/hk4-studio.jpg", label: "创作工作台" },
];

export const EXPIRY = "2026.11";
