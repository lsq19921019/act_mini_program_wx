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
    coin:0,
    usersNum:0,
    users:'',
    shouqi:'',
    zuiduo:'',
    zuizao:'',
    signIn:false
  },
  toList: function(){
    wx.navigateTo({
      url: "/pages/sleep/sleeplist/sleeplist",
    });
  },
  toRules: function(){
    wx.navigateTo({
      url: "/pages/sleep/sleeprules/sleeprules",
    });
  },
  // 页面多次渲染
  onShow:function(){
    // this.upgradeStatus()
    // this.getList(this.data.page_size,this.data._type);
    this.getIndexData();
    this.checkSleep_();
    wx.setNavigationBarTitle({ title: '早起' });// title名 

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
    wx.setNavigationBarTitle({ title: '早起' });// title名 
  },
  getIndexData:function(){
    // https://pddmini.hzduomi.net/
        let that = this;
        util.request(myUrl.mainUrl + 'minipro/clock/indexInfo/'+app.globalData.APPID, {}, 'GET', 0, function (res) {
          console.log(res.data);
          if(res.data.code==1000){
            let num = res.data.msg.users.length;
            if(num<7){
              for (let index = 0; index < 7-num; index++) {
                res.data.msg.users.push('');
                
              }
              
            }
            console.log(res.data.msg.users);
            that.setData({
              coin:res.data.msg.coinSum,
              usersNum:res.data.msg.usersNum,
              users:res.data.msg.users,
              shouqi:res.data.msg.shouqi,
              zuiduo:res.data.msg.zuiduo,
              zuizao:res.data.msg.zuizao,
              todaySucc:res.data.msg.todaySucc,
              todayFail:res.data.msg.todayFail
            });
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask: 'true',
              duration: 1500,
            })
          }
        });
  },
  
  checkSleep_: function(){
    // https://pddmini.hzduomi.net/minipro/clock/signIn
    // https://pddmini.hzduomi.net/minipro/clock/checkRec
    // https://pddmini.hzduomi.net/minipro/clock/saveRec
    // https://pddmini.hzduomi.net/minipro/clock/signIn
    // https://pddmini.hzduomi.net/minipro/clock/indexInfo
    var that = this;
    var pams = {
      token: wx.getStorageSync('token'),
      // test:1
    }
    util.request(myUrl.mainUrl + 'minipro/clock/checkRec', pams, 'GET', 0, function (res) {
      // console.log(res.data);
      if(res.data.code==1000){
        // if(!res.data.msg){

        // }
        // if(res.data.msg.status==1){
        //   if(!res.data.msg){

        //   }else{

        //   }
        //     //       if(timestamp.getHours()<6){
        // }
        if(res.data.msg.status==0||res.data.msg.status==2||res.data.msg.status==3){
            // wx.navigateTo({ 
            //   url: "/pages/sleep/paysleep/paysleep",
            // });
          that.setData({
            signIn:false
          });
        }else{
          that.setData({
            signIn:true
          });
        }
      }
        
      //   // wx.showToast({
      //   //   title: res.data.msg,
      //   //   icon: 'none',
      //   //   mask: 'true',
      //   //   duration: 3000,
      //   // });
      //   //获取当前时间
      //   let timestamp =new Date(res.data.systemTime);
      //   let str_time = timestamp.getFullYear()+''+(timestamp.getMonth()+1<10?'0'+(timestamp.getMonth()+1):timestamp.getMonth()+1)+""+(timestamp.getDate()<10?'0'+timestamp.getDate():timestamp.getDate());
      //   console.log(timestamp.getHours());
      //   if(res.data.msg.status==1){
      //     if(parseInt(res.data.msg)<=parseInt(str_time)||!res.data.msg){
      //       if(timestamp.getHours()<6){
      //         that.setData({
      //           signIn:true
      //         });
      //       }else{

      //       }
      //     }else{
      //       var pams_ = {
      //         token: wx.getStorageSync('token'),
      //       }
      //       that.setData({
      //         signIn:true
      //       });
      //     }
      //   }else{
          
      //   }
      // }else{
      //   that.setData({
      //     signIn:true
      //   });
      //   // wx.showToast({
      //   //   title: res.data.msg,
      //   //   icon: 'none',
      //   //   mask: 'true',
      //   //   duration: 3000,
      //   // })
      // }
      // if (res.data.result == 'OK') {
      //   that.setData({
      //     page_num:res.data.list.length,
      //     data_list: res.data.list,
      //     page_size: p_size+1
      //   });
      //   // that.setData({
      //   //   aliNo: res.data.aliAccount,
      //   //   aliname: res.data.name,
      //   //   waitDeal: res.data.wd,
      //   //   amount: res.data.amount,
      //   //   balance: res.data.balance,
      //   // })
      // }     
    });
  },
  checkSleep: function(){
    // https://pddmini.hzduomi.net/minipro/clock/signIn
    // https://pddmini.hzduomi.net/minipro/clock/checkRec
    // https://pddmini.hzduomi.net/minipro/clock/saveRec
    // https://pddmini.hzduomi.net/minipro/clock/signIn
    // https://pddmini.hzduomi.net/minipro/clock/indexInfo
    var that = this;
    var pams = {
      token: wx.getStorageSync('token'),
      // test:1
    }
    
    // var pams = {
    //   token: wx.getStorageSync('token'),
    // }
    util.request(myUrl.mainUrl + 'minipro/clock/checkRec', pams, 'GET', 0, function (res) {
      if(res.data.code==1000){
        if(res.data.msg.status==0||res.data.msg.status==2||res.data.msg.status==3){
            wx.navigateTo({ 
              url: "/pages/sleep/paysleep/paysleep",
            });
        }else{
          
            var pams_ = {
              token: wx.getStorageSync('token'),
            }
            util.request(myUrl.mainUrl + 'minipro/clock/signIn', pams_, 'GET', 0, function (res) {
              if(res.data.code==1000){
                
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  mask: 'true',
                  duration: 1500,
                });
              }else{
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  mask: 'true',
                  duration: 1500,
                })
              }
            });
        }
      }
      // console.log(res.data);
      // if(res.data.code==1000){
        
      //   // wx.showToast({
      //   //   title: res.data.msg,
      //   //   icon: 'none',
      //   //   mask: 'true',
      //   //   duration: 3000,
      //   // });
      //   //获取当前时间
      //   let timestamp =new Date(res.data.systemTime);
      //   let str_time = timestamp.getFullYear()+''+(timestamp.getMonth()+1<10?'0'+(timestamp.getMonth()+1):timestamp.getMonth()+1)+""+(timestamp.getDate()<10?'0'+timestamp.getDate():timestamp.getDate());
      //   console.log(timestamp.getHours());
        
      //   if(res.data.msg.status==1){
          
      //   if(parseInt(res.data.msg)<=parseInt(str_time)||!res.data.msg){
      //     if(timestamp.getHours()<6){
      //       var pams_ = {
      //         token: wx.getStorageSync('token'),
      //       }
      //       util.request(myUrl.mainUrl + 'minipro/clock/signIn', pams_, 'GET', 0, function (res) {
      //         if(res.data.code==1000){
                
      //           wx.showToast({
      //             title: res.data.msg,
      //             icon: 'none',
      //             mask: 'true',
      //             duration: 3000,
      //           });
      //         }else{
      //           wx.showToast({
      //             title: res.data.msg,
      //             icon: 'none',
      //             mask: 'true',
      //             duration: 3000,
      //           })
      //         }
      //       });
      //     }else{
      //       var pams_ = {
      //         token: wx.getStorageSync('token'),
      //       }
      //       util.request(myUrl.mainUrl + 'minipro/clock/signIn', pams_, 'GET', 0, function (res) {
      //         if(res.data.code==1000){
                
      //           wx.showToast({
      //             title: res.data.msg,
      //             icon: 'none',
      //             mask: 'true',
      //             duration: 3000,
      //           });
      //         }else{
      //           wx.showToast({
      //             title: res.data.msg,
      //             icon: 'none',
      //             mask: 'true',
      //             duration: 3000,
      //           })
      //         }
      //       });
      //       // wx.navigateTo({ 
      //       //   url: "/pages/sleep/paysleep/paysleep",
      //       // });
      //     }
      //   }else{
      //     var pams_ = {
      //       token: wx.getStorageSync('token'),
      //     }
      //     util.request(myUrl.mainUrl + 'minipro/clock/signIn', pams_, 'GET', 0, function (res) {
      //       if(res.data.code==1000){
              
      //         wx.showToast({
      //           title: res.data.msg,
      //           icon: 'none',
      //           mask: 'true',
      //           duration: 3000,
      //         });
      //       }else{
      //         wx.showToast({
      //           title: res.data.msg,
      //           icon: 'none',
      //           mask: 'true',
      //           duration: 3000,
      //         })
      //       }
      //     });
      //   }
      //   }else{
          
      //   }
      // }else{
      //   wx.showToast({
      //     title: res.data.msg,
      //     icon: 'none',
      //     mask: 'true',
      //     duration: 3000,
      //   })
      // }
      // if (res.data.result == 'OK') {
      //   that.setData({
      //     page_num:res.data.list.length,
      //     data_list: res.data.list,
      //     page_size: p_size+1
      //   });
      //   // that.setData({
      //   //   aliNo: res.data.aliAccount,
      //   //   aliname: res.data.name,
      //   //   waitDeal: res.data.wd,
      //   //   amount: res.data.amount,
      //   //   balance: res.data.balance,
      //   // })
      // }     
    });
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
  getList: function(p_size,type_){
    var that = this;
    var pams = {
      token: wx.getStorageSync('token'),
      type: type_,
      p: p_size
    }
    util.request(myUrl.mainUrl + 'user/r/getRecord', pams, 'GET', 0, function (res) {
      console.log(res.data);
      if (res.data.result == 'OK') {
        that.setData({
          page_num:res.data.list.length,
          data_list: res.data.list,
          page_size: p_size+1
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

  
  
  //转发好友
  onShareAppMessage: function (e) {
    let that = this;
    let title = '';
    let imgUrl = '';
    let path = '';
    
    // if(e.from==="button"){
    //   console.log("用户点击了按钮开始分享", e)
    //   console.log(e);
    //   console.log(e.target.dataset.id+'==================');
    //   console.log(e.target.dataset.url+'==================');
    //   let url_ = e.target.dataset.url.replace('http:','https:');
    //   console.log(url_);
    //   title = e.target.dataset.title;
    //   imgUrl =  e.target.dataset.img;
    //   path = "pages/index/index?name="+e.target.dataset.title+"&type="+that.data.switch_type;
    // }else{
      title = '天天早起打卡，健康还赚钱，等你来';
      imgUrl =  'https://duoyidian.hzinterconn.cn/reading_mini_share_3.png';
      path = 'pages/sleep/sleep';
    // }
    // wx.setStorageSync("name",);
    // console.log('userId = ' + app.globalData.user.unionidF + ' & id=' + that.data.spreadId + "&platform=" + that.data.goodsInfo.platform);
    return {
      title: title,
      imageUrl: imgUrl,
      path: path,
    }
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