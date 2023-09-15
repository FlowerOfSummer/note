- 项目0-1搭建
  - 迁移，整合新服务- 重构
  为什么重构
    - 没有全局http错误捕获方案
    - 大量重复页面，没有封装公共组件，修改维护困难
    - 代码逻辑混乱，历史遗留bug多
    - 代码书写不规范，没有eslint，stylelint校验，以及commit提交规范
  做了什么
    - 梳理既往功能需求，老代码迁移重构
    - 公共业务组件提取，加快开发效率
    - 全局http请求拦截，全局错误处理，请求loading批处理
    - pinia全局数据管理
    - 统一下载导出接口及全局封装
    - 添加eslint，stylelint及commit提交规范
    - 登录逻辑修改，解决失效过期，无法动态续签问题
    - js -> ts
    - 多服务权限，路由，菜单设计开发
      - 根据权限点，采用动态路由方式，设置permissionkey，匹配路由，否则404
      - 菜单设置permissionkey，name与路由对应
    - 封装常用指令
      - v-loading
      - v-copy
      - v-tooltip
    - 消息中心使用websocket，封装使用
    - 封装一些公共hooks
    - 主题定制
- 打包优化
  - 将包chunks,减少单个包体积
  ```js
  export {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString()
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/')
              : []
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          }
        }
      }
    }
  }
  ```
  - 大包cdn引入
    安装vite-plugin-cdn-import插件，使用cdn引入
  - 大图片放cdn
  - 部分组件异步加载

  FP, FCP, LCP
