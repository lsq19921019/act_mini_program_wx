const app = getApp()
const myUrl = require("../../utils/url.js");
const util = require('../../utils/util.js');
Page({
  //页面的初始数据
  data: {
    _type: 0,//初始页面 A级  B级
    page_num: 0,
    data_list:'',
    page_size: 0,
    switch_type:1,
    sendMsg:'',
    themlist:[{
      themeId:'6666',
      name:'6666',
      imageUrl:'https://duoyidian.hzinterconn.cn/reading_home_banner_0.png',
      url:'/pages/welfare/welfare'
    },{
      themeId:'6666',
      name:'6666',
      imageUrl:'https://duoyidian.hzinterconn.cn/reading_home_banner_1.png',
      url:'/pages/sleep/sleep'
    }],
    current_arti_id:'',
    showWinLayer:false,
    contact:false
  },
  toPageBanner: function(e){
    if(e.currentTarget.dataset.type==0){
      wx.switchTab({
        url: "/pages/welfare/welfare",
      });
    }else{
      wx.switchTab({
        url: "/pages/sleep/sleep",
      });
    }
  },
  toCoin:function(){
    
    wx.navigateTo({
      url: "/pages/my/coin_record/coin_record",
    });
    
  },
  toSleep:()=>{
    
    wx.switchTab({
      url: "/pages/sleep/sleep",
    });
  },
  closeWin: function(){
    this.setData({
      showWinLayer:false
    });
  },
  showWin: function(e){
    let that = this;
    if(e.currentTarget.dataset.type==1){
      that.setData({
        contact: true
      });
    }else{
      that.setData({
        contact: false
      });
    }
    this.setData({
      showWinLayer:true
    });
  },
  
  //键盘输入时获取搜索的值
  bindBlur: function(e) {
    var that = this;
    var sendMsg = e.detail.value;
    that.setData({
      sendMsg: sendMsg
    })
  },
  //查找跳转带上搜索的内容
  sendSeek: function(e) {
    var sendMsg = this.data.sendMsg;
    if (sendMsg == "") {
      wx.showToast({
        title: "亲，搜索条件不能为空哦！",
        icon: 'none',
        duration: 1500,
      })
      return;
    }
    var that = this;
    var pams = {
      type:that.data.switch_type,
      name:sendMsg?sendMsg:'',
      token: wx.getStorageSync('token'),
    }
    console.log(app.globalData.APPID);
    util.request(myUrl.mainUrl + 'minipro/articles/'+app.globalData.APPID, pams, 'GET', 1, function (res) {
      console.log(res.data);
      if (res.data.code == 1000) {
        that.setData({
          data_list:res.data.msg
        });
        // that.setData({
        //   aliNo: res.data.aliAccount,
        //   aliname: res.data.name,
        //   waitDeal: res.data.wd,
        //   amount: res.data.amount,
        //   balance: res.data.balance,
        // })
      }     
    });
  },
  toWellfare: function(){
    
    wx.switchTab({
      url: '/pages/welfare/welfare'
    })
  },
  toDetail: function(e){
    // https://pddmini.hzduomi.net/minipro/articles/getRead
    // https://pddmini.hzduomi.net/minipro/articles/saveRead
    
    var pams = {
      token: wx.getStorageSync('token'),
      artId: e.currentTarget.dataset.id
    }
    util.request(myUrl.mainUrl + 'minipro/articles/getRead', pams,'GET', 0, function (res) {
      console.log(res.data);
      if (res.data.code == 1000) {
        // that.setData({
        //   data_list:res.data.msg
        // });
        
        if(res.data.msg==0){
          var pams_ = {
            token: wx.getStorageSync('token'),
            artId: e.currentTarget.dataset.id,
            coin: 5,
          }
          util.request(myUrl.mainUrl + 'minipro/articles/saveRead', pams_,'GET', 0, function (res) {
            console.log(res.data);
            if (res.data.code == 1000) {
              // that.setData({
              //   data_list:res.data.msg
              // });
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  mask: 'true',
                  duration: 1500,
                })

            }else if(res.data.code == 1001){

            }else{
              wx.showToast({
                title: '服务器忙碌',
                icon: 'none',
                mask: 'true',
                duration: 1500,
              })
            }     
          });
        }
      }else{
        wx.showToast({
          title: '服务器忙碌',
          icon: 'none',
          mask: 'true',
          duration: 1500,
        })
      }     
    });
    // return;
    console.log(e.currentTarget.dataset.url);
    // let url_ = e.currentTarget.dataset.url.replace('http:','https:')+'#wechat_redirect';
    let url_ = e.currentTarget.dataset.url;
    let url_title_ = e.currentTarget.dataset.title;
    console.log(url_);
    wx.setStorageSync('to_url', url_.replace('#rd','#wechat_redirect'));
    wx.setStorageSync('to_title', url_title_);
    
    wx.navigateTo({
      url: "/pages/index/detail/detail?url="+url_,
    });
    
    wx.setStorageSync('to_page', 1);
  },
  getDates: function(time){
    let date =getDate(time);
    let M = date.getMonth() + 1;
    let y = date.getFullYear();
    let d = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return y+'-'+M+'-'+d+' '+hours+':'+min+':'+sec;
  },
  getList: function(type_,name,share_tag){
    var that = this;
    var pams = {
      type:type_,
      name:name?name:'',
      token: wx.getStorageSync('token'),
    }
    console.log(app.globalData.APPID);
    util.request(myUrl.mainUrl + 'minipro/articles/'+app.globalData.APPID, pams, 'GET', 1, function (res) {
      console.log(res.data);
      if (res.data.code == 1000) {
        that.setData({
          data_list:res.data.msg
        });
        if(share_tag){
          // wx.showToast({
          //     title: that.data.data_list[0].url,
          //     icon: 'none',
          //     mask: 'true',
          //     duration: 1500,
          //   });
          // wx.setStorageSync('to_url', that.data.data_list[0].url.replace('http:','https:')+'#wechat_redirect');
          wx.setStorageSync('to_url', that.data.data_list[0].url);
          wx.setStorageSync('to_title', that.data.data_list[0].title);
          
          wx.navigateTo({
            url: "/pages/index/detail/detail",
          });
        }
        // that.setData({
        //   aliNo: res.data.aliAccount,
        //   aliname: res.data.name,
        //   waitDeal: res.data.wd,
        //   amount: res.data.amount,
        //   balance: res.data.balance,
        // })
      }     
    });
  },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    // that.setData({
    //   page: 1,
    //   nomore: false,
    //   stop: false, //是否停止下拉刷新
    // })
    // that.getData(1, 1);
    this.getList(that.data.switch_type);
    setTimeout(()=>{
      wx.stopPullDownRefresh();
    },500);
  },
  
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    }) 
    // //判断是否登录
    console.log(this);
    let that =this;
    options = util.isLogin(this, app);
    if (!options) return; 
    if(options.name){
      // wx.showToast({
      //   title: options.name+"======"+options.type,
      //   icon: 'none',
      //   mask: 'true',
      //   duration: 3000,
      // });
      
      that.getList(options.type,options.name,1);
    }
    // if (getCurrentPages().length < 2) {
    //   //从其他页面直接跳转过来的，如 分享,  模板消息
    //   this.setData({
    //     ifRootPage: true
    //   })
    // }
    // this.getData(0, 1); 
    wx.setNavigationBarTitle({ title: '首页' });// title名 
  },
  // 页面多次渲染
  onShow:function(){
    // this.upgradeStatus()
    this.getList(this.data.switch_type,this.data.sendMsg);
    wx.setNavigationBarTitle({ title: '首页' });// title名 
  },
  // tabSwitch: function(e){
  //   let e_num = e.currentTarget.dataset.style;
  //   if (this.data._type == e_num) {
  //       return
  //     } else if (e_num == 0) {
  //       this.setData({
  //         _type: 0,
  //         page_size: 0
  //       })
  //       this.getList(this.data.page_size,0);
  //     } else if (e_num == 1) {
  //       this.setData({
  //         _type: 1,
  //         page_size: 0
  //       })
  //       this.getList(this.data.page_size,1);
  //     } 
  // },
  toHomePage:function(){
    console.log(666666666);
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  tabSwitch:function(){
    let that = this;
    if(that.data.switch_type==1){
      that.setData({
        switch_type:2
      });
      that.getList(2);
    }else{
      that.setData({
        switch_type:1
      });
      that.getList(1);
    }
  },
  
  //转发好友
  onShareAppMessage: function (e) {
    let that = this;
    let title = '';
    let imgUrl = '';
    let path = '';
    
    if(e.from==="button"){
      console.log("用户点击了按钮开始分享", e)
      console.log(e);
      console.log(e.target.dataset.id+'==================');
      console.log(e.target.dataset.url+'==================');
      let url_ = e.target.dataset.url.replace('http:','https:');
      console.log(url_);
      title = e.target.dataset.title;
      imgUrl =  e.target.dataset.img;
      path = "pages/index/index?name="+e.target.dataset.title+"&type="+that.data.switch_type;
    }else{
      title = '重新定义阅读，赚金币好礼免费拿';
      imgUrl =  'https://duoyidian.hzinterconn.cn/reading_mini_share_1.png';
      path = 'pages/index/index';
    }
    // wx.setStorageSync("name",);
    // console.log('userId = ' + app.globalData.user.unionidF + ' & id=' + that.data.spreadId + "&platform=" + that.data.goodsInfo.platform);
    return {
      title: title,
      imageUrl: imgUrl,
      path: path,
      success: function(res){
        console.log('文章转发成功！！！！！！！！！！！！！！');
        wx.showToast({
          title: "文章转发成功！",
          icon: 'none',
          mask: 'true',
          duration: 1500,
        });
        
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
        var shareTickets = res.shareTickets;
　　　　　　// 转发成功之后的回调
          console.log(res);
　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
              console.log("文章转发成功！");
              wx.showToast({
                title: "文章转发成功！",
                icon: 'none',
                mask: 'true',
                duration: 1500,
              });
              var pams = {
                token: wx.getStorageSync('token'),
                artId: e.target.dataset.id
              }
              util.request(myUrl.mainUrl + 'minipro/articles/getForward', pams,'GET', 0, function (res) {
                console.log(res.data);
                if (res.data.code == 1000) {
                  // that.setData({
                  //   data_list:res.data.msg
                  // });
                  if(res.data.msg==0){
                      var pams_ = {
                        token: wx.getStorageSync('token'),
                        artId: e.target.dataset.id,
                        coin: 5,
                      }
                      util.request(myUrl.mainUrl + 'minipro/articles/saveForward', pams_,'GET', 0, function (res) {
                        console.log(res.data);
                        if (res.data.code == 1000) {
                          // that.setData({
                          //   data_list:res.data.msg
                          // });
                            wx.showToast({
                              title: res.data.msg,
                              icon: 'none',
                              mask: 'true',
                              duration: 1500,
                            })
                            
                        }else if(res.data.code == 2001){
                          wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            mask: 'true',
                            duration: 1500,
                          })
                        }else{
                          wx.showToast({
                            title: '服务器忙碌',
                            icon: 'none',
                            mask: 'true',
                            duration: 1500,
                          })
                        }     
                      });
                  }
                }else{
                  wx.showToast({
                    title: '服务器忙碌',
                    icon: 'none',
                    mask: 'true',
                    duration: 1500,
                  })
                }     
              });
　　　　　　}
　　　　},
　　　　fail: function(res){
　　　　　　// 转发失败之后的回调
　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
  wx.showToast({
    title: "文章转发取消！",
    icon: 'none',
    mask: 'true',
    duration: 1500,
  });
              console.log("文章转发取消！");
　　　　　　　　// 用户取消转发
　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
  wx.showToast({
    title: "文章转发失败！",
    icon: 'none',
    mask: 'true',
    duration: 1500,
  });
              console.log("文章转发失败！");
　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
　　　　　　}
　　　　},
　　　　complete: function(){
  wx.showToast({
    title: "文章转发完成！",
    icon: 'none',
    mask: 'true',
    duration: 1500,
  });
            console.log("文章转发完成！");
　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
　　　　}
    }
  },
});