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
    showBoxPho: false,
    mobile:'',
    g_id:'',
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
  toRules:function(){
    
    wx.navigateTo({
      url: "/pages/welfare/rules/rules",
    })
  },
  getList: function(p_size,type_){
    // https://pddmini.hzduomi.net/minipro/mall/getGoods
    var that = this;
    var pams = {
      // token: wx.getStorageSync('token'),
      // type: type_,
      // p: p_size
    }
    util.request(myUrl.mainUrl + 'minipro/mall/getGoods', pams, 'GET', 0, function (res) {
      console.log(res.data);
      if (res.data.code == 1000) {
        that.setData({
          data_list: res.data.msg,
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
  showBox:function(e){
    this.setData({
      showBoxPho:true,
      g_id:e.currentTarget.dataset.id
    });
    // that.data.showBoxPho= true;
  },
  closeWin:function(){
    this.setData({
      showBoxPho:false
    });
  },
  //键盘输入时获取搜索的值
  bindBlur: function(e) {
    var that = this;
    // var sendMsg = e.detail.value;
    that.setData({
      mobile: e.detail.value
    })
  },
  getGoods:function(){
    var that = this;
    if(that.data.mobile===''){
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        mask: 'true',
        duration: 1500,
      });
      return;
    }else if(!(/^1[3456789]\d{9}$/.test(that.data.mobile))){ 
      
      wx.showToast({
        title: "手机号码有误，请重填",
        icon: 'none',
        mask: 'true',
        duration: 1500,
      });
      return false; 
  } 
    
    var pams = {
      // token: wx.getStorageSync('token'),
      // type: type_,
      // p: p_size
      // phone:that.data.mobile,
      goodsId:that.data.g_id
    }
// https://pddmini.hzduomi.net/minipro/mall/getGoodsRemian
    util.request(myUrl.mainUrl + 'minipro/mall/getGoodsRemian', pams, 'GET', 0, function (res) {
      console.log(res.data);
      if (res.data.code == 1000) {
        if(res.data.msg>0){
          var pams = {
            token: wx.getStorageSync('token'),
            // type: type_,
            // p: p_size
            phone:that.data.mobile,
            goodsId:that.data.g_id
          }
          util.request(myUrl.mainUrl + 'minipro/mall/exchange', pams, 'GET', 0, function (res) {
            
            console.log(res.data);
            if (res.data.code == 1000) {
              
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  mask: 'true',
                  duration: 1500,
                });
                that.setData({
                  showBoxPho:false
                });
            }else{
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                mask: 'true',
                duration: 1500,
              });
            }
          });
        }else{
          wx.showToast({
            title: '商品数量不足！',
            icon: 'none',
            mask: 'true',
            duration: 1500,
          });
        }
        // that.setData({
        //   aliNo: res.data.aliAccount,
        //   aliname: res.data.name,
        //   waitDeal: res.data.wd,
        //   amount: res.data.amount,
        //   balance: res.data.balance,
        // })
      }else{
        
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: 'true',
          duration: 1500,
        });
      }     
    });
  },
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
    this.getList();
    wx.setNavigationBarTitle({ title: '福利' });// title名 
  },
  // 页面多次渲染
  onShow:function(){
    // this.upgradeStatus()
    this.getList(this.data.page_size,this.data._type);
    wx.setNavigationBarTitle({ title: '福利' });// title名 
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
  }
});