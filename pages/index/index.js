// index.js
// 获取应用实例
const app = getApp()
var school = 1;

Page({
  data: {
    scrollAnimation: {},
    login: false,
    openid: app.globalData.openid,
    test: {
      hidden: true,
      default: "请选择所在城市",
      txt: ["杭州"]
    },
    swiper:[],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    //this.getOpenid();
    wx.cloud.database().collection("swiper")   
    .get()
    .then(res=> {
      console.log("获取轮播图数据成功",res)
      this.setData({
        swiper:res.data
      })
    })
    .catch(err=> {
      console.log("获取轮播图数据失败",err)
    })
  },
  onShow: function () {
    const db = wx.cloud.database();
    const users = db.collection("Users");
    users.get()
      .then(res => {
        if (res.data.length != 0 && wx.getStorageSync('user')) {
          this.data.login = true;
        } else {
          this.data.login = false;
        }
      })
      .catch(err => {
        console.log("调用失败", err)
      })

    console.log(wx.getStorageSync('user'))
     // 获取公告栏内容宽度
    wx.createSelectorQuery().select('.notice-scroll-inner').boundingClientRect(rect => {
      this.setData({
        scrollWidth: rect.width
      });
      this.startScroll();
    }).exec();
  },
  getUserInfo(e) {
    console.log(e)

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goSever01() {
    wx.navigateTo({

      url: '/pages/service01/service01?school=' + "qianjiangwan",
    })
    //判断用户是否登录
   

    //判断用户选择的校区
    // if (school) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先选择所在城市',
    //   })
    // } else {
    //   if (this.data.test.default == "杭州") {
    //     wx.navigateTo({

    //       url: '/pages/service01/service01?school=' + "qianjiangwan",
    //     })
    //   } 
    // }

  },
  goSever02() {
    wx.navigateTo({

      url: '/pages/service02/service02?school=' + "qianjiangwan",
    })
    //判断用户是否登录
   

    //判断用户选择的校区
    // if (school) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先选择所在城市',
    //   })
    // } else {
    //   if (this.data.test.default == "杭州") {
    //     wx.navigateTo({

    //       url: '/pages/service02/service02?school=' + "qianjiangwan",
    //     })
    //   } 
    // }
  },
  goSever03() {
    wx.navigateTo({
      url: '/pages/service03/service03',
    })
    // //判断用户是否登录
    // if (school) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先选择所在城市',
    //   })
    // } else {
    //   if (this.data.test.default == "杭州") {
    //     wx.navigateTo({
    //       url: '/pages/service03/service03?school=0',
    //     })
    //   }
    // }
  },

  goSever04() {
    wx.navigateTo({
      url: '/pages/service03/service03',
    })
  
    //判断用户是否登录
    // if (school) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先选择所在城市',
    //   })
    // } else {
    //   if (this.data.test.default == "杭州") {
    //     wx.navigateTo({
    //       url: '/pages/service03/service03?school=0',
    //     })
    //   } 
    // }
  },

  showSchool:function(){
    var data=this.data.test;
    data["hidden"]=!data.hidden;
    console.log("点击了");
    this.setData({
      test: data
    })
  },
  SelectVal: function (e) {
    // 获取到点击的列表下标，因为是在下拉的父元素点击，所以获取到menus下标
    var index = e.target.dataset.index;
    var data = this.data.test;
    //获取选中的选项的值
    var test_name = data.txt[index];

    console.log("选择了选项:" + test_name);

    //设置区域默认值和隐藏
    data["default"] = test_name;
    school = 0;
    data["hidden"] = !data.hidden;
    this.setData({
      test: data
    })

  },

  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })

  },

  startScroll: function () {
    const animation = wx.createAnimation({
      duration: this.data.scrollWidth * 35, // 根据内容宽度设置滚动速度
      timingFunction: 'linear',
      delay: 0
    });
    this.data.scrollAnimation = animation.translateX(-this.data.scrollWidth-wx.getSystemInfoSync().windowWidth).step();
    this.setData({
      scrollAnimation: this.data.scrollAnimation.export()
    });
    setTimeout(() => {
      this.data.scrollAnimation = animation.translateX(wx.getSystemInfoSync().windowWidth).step({ duration: 0 });
      this.setData({
        scrollAnimation: this.data.scrollAnimation.export()
      });
      this.startScroll();
    }, this.data.scrollWidth * 20);
  },
  


})