const app = getApp()
const myUrl = require("../../../utils/url.js");
const util = require('../../../utils/util.js');
Page({
  //页面的初始数据
  data: {
    _type: 0,//初始页面 A级  B级
    page_num: 0,
    data_list:'',
    page_size: 0,
    switch_type:1,
    themlist:[{
      themeId:'6666',
      name:'6666',
      imageUrl:'http://t16img.yangkeduo.com/pdd_oms/2019-05-30/d2aa785bcf9c1ffa2b1730cfa3f94f37.jpg',
    },{
      themeId:'6666',
      name:'6666',
      imageUrl:'http://t16img.yangkeduo.com/pdd_oms/2019-05-30/d2aa785bcf9c1ffa2b1730cfa3f94f37.jpg',
    }],
    url:'',
    to_page:0,
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
  // getList: function(type_,name){
  //   var that = this;
  //   var pams = {
  //     type:type_,
  //     name:name?name:'',
  //   }
  //   console.log(app.globalData.APPID);
  //   util.request(myUrl.mainUrl + '/articles/'+app.globalData.APPID, pams, 'GET', 0, function (res) {
  //     console.log(res.data);
  //     if (res.data.code == 1000) {
  //       that.setData({
  //         data_list:res.data.msg
  //       });
  //       // that.setData({
  //       //   aliNo: res.data.aliAccount,
  //       //   aliname: res.data.name,
  //       //   waitDeal: res.data.wd,
  //       //   amount: res.data.amount,
  //       //   balance: res.data.balance,
  //       // })
  //     }     
  //   });
  // },

  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // var that = this;
    // that.setData({
    //   page: 1,
    //   nomore: false,
    //   stop: false, //是否停止下拉刷新
    // })
    // that.getData(1, 1);
    setTimeout(()=>{
      wx.stopPullDownRefresh();
    },500);
  },
  
  onLoad: function (options) {
    let that = this;
    
    // console.log(options.url+"===========");

    // if(options.url){
    //   that.setData({
    //     url:options.url+"#wechat_redirect"
    //   });
    // }else{
      setTimeout(function(){
        let url_ = wx.getStorageSync('to_url')
        that.setData({
          url:url_+"#wechat_redirect"
        });
      },0);
    // }
    let title_ = wx.getStorageSync('to_title')
    console.log(111111111111111111);
    wx.setNavigationBarTitle({ title: title_ });// title名 
    // //判断是否登录
    // options = util.isLogin(this, app);
    // if (!options) return; 
    

    // if (getCurrentPages().length < 2) {
    //   //从其他页面直接跳转过来的，如 分享,  模板消息
    //   this.setData({
    //     ifRootPage: true
    //   })
    // }
    // this.getData(0, 1); 
    // console.log(options.url);
        // this.setData({
        //   to_page:wx.getStorageSync('to_page')
        // }); //商品ID
        // if(this.data.to_page==0){
        //   wx.switchTab({
        //     url: '/pages/index/index'
        //   });
        // }
    // wx.setNavigationBarTitle({ title: '首页' });// title名 
  },  
  onUnload: function () {
    console.log(2222222222222);
    // wx.reLaunch({
    //   url: '/pages/index/index'
    // })
  },
  onHide:function(){
    console.log(3333333333333);
    this.setData({
      url:false
    }); //商品ID
    // wx.switchTab({
    //   url: '/pages/index/index'
    // });
    
    wx.setStorageSync('to_page', 0);
  },
  // 页面多次渲染
  onShow:function(){
    console.log(44444444444444);
    // // this.upgradeStatus()
    // console.log(that.data.url);
    // console.log();
    // this.getList(1);
    // wx.setNavigationBarTitle({ title: '首页' });// title名 
  },
  tabSwitch: function(e){
    let e_num = e.currentTarget.dataset.style;
    if (this.data._type == e_num) {
        return
      } else if (e_num == 0) {
        this.setData({
          _type: 0,
          page_size: 0
        })
        this.getList(this.data.page_size,0);
      } else if (e_num == 1) {
        this.setData({
          _type: 1,
          page_size: 0
        })
        this.getList(this.data.page_size,1);
      } 
  },
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
    }else{
      that.setData({
        switch_type:1
      });
    }
  }
});