/**
 * 1.参考资料：
 *        https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE
 *
 * 2.
 */
module.exports = {

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

