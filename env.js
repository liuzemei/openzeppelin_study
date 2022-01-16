module.exports = {
  dev: {
    NODE_ENV: 'development',
    // BASE_URL: 'http://192.168.2.114:8100/api/v2/contract',// 开发服务器地址
    STATIC_URL: '',
    VUE_APP_BASE_URL: '/api'
  },
  test: {
    NODE_ENV: 'test',
    BASE_URL: '/api', // 测试服务器地址
    VUE_APP_BASE_URL: '/api'
  },
  pro: {
    NODE_ENV: 'production',
    BASE_URL: '/api', // 正式服务器地址
    VUE_APP_BASE_URL: '/api'
  }
}
