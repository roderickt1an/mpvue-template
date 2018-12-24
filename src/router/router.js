module.exports = [
  {
    path: 'pages/index/index',
    name: 'index',
    config: {
      navigationBarTitleText: '首页',
      enablePullDownRefresh: true,
      usingComponents: {
        // 'van-search': '../vant/search/index',
        // 'van-col': '../vant/col/index',
        // 'van-row': '../vant/row/index',
        // 'van-icon': '../vant/icon/index',
        // 'van-field': '../../static/vant/field/index'
      }
    }
  },
  {
    path: 'pages/counter/index',
    name: 'counter',
    config: {
      navigationBarTitleText: 'vuex测试',
      enablePullDownRefresh: true
    }
  },
  {
    path: 'pages/logs/index',
    name: 'logs',
    config: {
      navigationBarTitleText: 'logs',
      enablePullDownRefresh: true
    }
  }
]
