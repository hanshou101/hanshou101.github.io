const baseCfg = {
  // base: '',        // 部署站点的基础路径。默认根目录

  title      : 'Hello VuePress 测试项目1111111111111',    // 网站的标题。所有页面标题的后缀（官网错写为前缀）。
  description: 'Just playing around',                   // 网站的描述，它将会以 <meta> 标签

  /*
  head: [                                               // 额外的需要被注入到当前页面的 HTML <head> 中的标签
    ['link', {rel: 'icon', href: '/logo.png'}, 'innerHTML写在这儿'],
  ],
  */

  // host: '0.0.0.0',                                      // dev server 的主机名
  // port: 8080,                                              // dev server 的端口
  // temp: '/path/to/@vuepress/core/.temp',                   // 客户端文件的临时目录。


  // dest: '.vuepress/dist',                                  // vuepress build 的输出目录

  // locales:undefined,                                    // 多语言支持的语言配置

  // shouldPrefetch: () => true,                              // 对于哪些文件，是需要生成 <link rel="prefetch"> 资源提示的

  // cache: true,                                                // 是否使用【cache-loader】。并且，还可以用来 指定 cache 的路径。

  // extraWatchFiles: [],                                     // 指定额外的需要被监听的文件。文件变动将会触发 vuepress 重新构建，并实时更新

  // patterns: ['**/*.md', '**/*.vue'],                          // 指定 哪些 文件，将被解析

};

const themeCfg = {
  // theme: undefined,                                           // 使用自定义主题的时候，需要指定它
  themeConfig: {                                                 // 为当前的主题提供一些配置
    /*
    locales: {
      '/'   : {
        selectText   : 'Languages',
        label        : 'English',
        ariaLabel    : 'Languages',
        editLinkText : 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message   : 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        algolia      : {},
        nav          : [
          {text: 'Nested', link: '/nested/', ariaLabel: 'Nested'}
        ],
        sidebar      : {
          '/'       : [/!* ... *!/],
          '/nested/': [/!* ... *!/]
        }
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText   : '选择语言',
        // 该语言在下拉菜单中的标签
        label        : '简体中文',
        // 编辑链接文字
        editLinkText : '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message   : '发现新内容可用.',
            buttonText: '刷新'
          }
        },
        // 当前 locale 的 algolia docsearch 选项
        algolia      : {},
        nav          : [
          {text: '嵌套', link: '/zh/nested/'}
        ],
        sidebar      : {
          '/zh/'       : [/!* ... *!/],
          '/zh/nested/': [/!* ... *!/]
        }
      }
    },
    */
  },
};

const plugCfg = {
  // plugins: undefined,                                         // 使用一个插件
};

const mdCfg = {
  markdown: {
    lineNumbers: true /* undefined */,                                   // 是否在每个代码块的左侧显示行号
    // slugify: 已有源码方法,                                      // 一个将标题文本转换为 slug 的函数 （？？？？？？）
    // anchor: { permalink: true, permalinkBefore: true, permalinkSymbol: '#' },                  // markdown-it-anchor (opens new window)的选项 （？？？？？？）
    // pageSuffix: '.html',                                      // 自定义内部链接，以兼容 使用【vuepress-plugin-clean-urls】的情况
    // externalLinks: {target: '_blank', rel: 'noopener noreferrer'},                             // 指向外部链接的<a>标签，跳转特效。
    // toc: {includeLevel: [2, 3]},                              // markdown-it-table-of-contents (opens new window)的选项    （？？？？？？）
    // plugins:[],                                               // 用来安装【markdown-it 插件】。使用方法与安装一个 VuePress 插件类似
    // extendMarkdown: undefined,                                // 一个函数，用于：修改当前的【markdown-it 实例】的默认配置，或者，应用【额外的插件】
    // extractHeaders: ['h2', 'h3'],                             // 修改提取出的标题级别，并且，提供给VuePress使用
  },
};

const buildCfg = {
  /**
   * postcss-loader 的选项。
   *        1.请注意：指定这个值，将会覆盖内置的 autoprefixer，所以你需要自己将它加进去。
   */
  // postcss: {plugins: [require('autoprefixer')]},
  /**
   * stylus-loader 的选项。
   */
  // stylus:{ preferPathResolver: 'webpack' },
  /**
   * sass-loader 的【*.scss】选项
   */
  // scss: {},
  /**
   * sass-loader 的【*.sass】选项。
   */
  // sass: {indentedSyntax: true},
  /**
   * less-loader 的选项。
   */
  // less: {},
  /**
   * 用于修改内部的 Webpack 配置。
   *        1.和【vue.config.js】的大体相似。但是【第二个参数isServer】不同。
   */
  // configureWebpack: (config, isServer) => {},
  /**
   * 通过 webpack-chain 来修改内部的 Webpack 配置。
   *        1.和【vue.config.js】的大体相似。但是【第二个参数isServer】不同。
   */
  // chainWebpack: (config, isServer) => {},

};


const compatibleCfg = {
  /**
   * 是否启用【 ESNext 到 ES5 的转译，以及对 IE 的 polyfills 】
   *        1.对于现代浏览器，可以设置为 true。
   *                1.会带来 更快的构建速度 和 更小的文件体积。
   */
  // evergreen: false,
};

const localeCfg = {
  locales: {
    /*
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/'   : {
      lang       : 'en-US', // 将会被设置为 <html> 的 lang 属性
      title      : 'VuePress',
      description: 'Vue-powered Static Site Generator'
    },
    '/zh/': {
      lang       : 'zh-CN',
      title      : 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
    */
  }
};

/**
 * 1.参考资料：
 *        https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
 *
 * 2.
 */
module.exports = {
  // 基本配置
  ...baseCfg,
  // 主题配置
  ...themeCfg,
  // 插件配置
  ...plugCfg,
  // MarkDown配置
  ...mdCfg,
  // 构建流程配置
  ...buildCfg,
  // 兼容性配置
  ...compatibleCfg,
  // 多语言配置
  ...localeCfg,
};

