// .umirc.local.ts 仅在 umi dev 时有效。umi build 时不会被加载
// 这份配置会和 .umirc.ts 做 deep merge 后形成最终配置。


import {defineConfig} from 'umi';

let proxyTarget = 'http://127.0.0.1:82';

export default defineConfig({

  devServer: {
    port: 8002,
  },

  define: {
    "process.env.API_BASE_URL": "/api/"
  },

  proxy: {
    '/api': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
    '/ureport': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/ureport': '/ureport' },
    },
    '/code': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/code': '/code' },
    },
    '/job': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/job': '/job' },
    },
    '/sso': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/sso': '/sso' },
    },
    '/flowable': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/flowable': '/flowable' },
    },
    '/weapp': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/weapp': '/weapp' },
    },
    '/kettle': {
      target: proxyTarget,
      changeOrigin: true,
      pathRewrite: { '^/kettle': '/kettle' },
    },
  },
});
