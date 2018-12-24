import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'
import store from './store/store'
// import Toast from '../static/vant/toast/toast';
// var Fly = require("flyio/dist/npm/wx")
import Fly from 'flyio/dist/npm/wx'

var fly = new Fly();

let encode

//  登录
function login(){
  console.log("login")
  wx.login({
    success: function (res){
      if(res.code) {
        wx.request({
          url: 'http://cloud.yrl.fun/api/user/weChatApplet/getWXEncKey',
          data: {
            code: res.code,
            typeFlag: "invoice"
          },
          success: function(res){
            if(res.data.msgCode == 40000){
              wx.setStorage({
                key: "encCode",
                data: res.data.data
              })
            }
          }
        })
      }
    }
  })
}


//  请求拦截，增加请求校验值
fly.interceptors.request.use((config,promise)=>{
  //  检查权限
  if(!encode){
    return new Promise((resolve, reject)=>{
      wx.getStorage({
        key: "encCode",
        success:function(res){
          encode = res.data
          Object.assign(config.body, {encode:encode})
          console.log("拦截")
          // config.headers["X-Tag"]="flyio";
          resolve(config)
        }
      })
    })
  }else{
    Object.assign(config.body, {encode: encode})
    console.log("使用默认值")
    return config
  }
})

//  判断请求是否成功！
fly.interceptors.response.use(
  function(res){
    if(res.status == 200){
      if(res.data.msgCode == 40000){
        return res.data
      }
      if(res.data.msgCode == 50003){
        wx.showToast({
          title: "未登录！",
          icon: "none"
        })
        login()
      }
      wx.showToast({
        title: res.data.msg,
        icon: "none"
      })
      console.log(res.data)
    }else{
      wx.showToast({
        title: "网络连接异常！",
        icon: "none"
      })
    }
  }
)
//配置请求基地址
// console.log(process.env.NODE_ENV)
fly.config.baseURL= process.env.NODE_ENV == "production"? "https://cloud.zgcfo.com/api/":"http://cloud.yrl.fun/api/"

Vue.prototype.$login = login
Vue.prototype.$fly = fly;
Vue.prototype.$store = store
Vue.use(MpvueRouterPatch)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
