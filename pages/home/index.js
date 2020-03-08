// pages/home/index.js
// let common = require('../../utils/common.js')

import common from '../../utils/common.js'



Page({
  go() {
    wx.navigateTo({
      url: '../mine/index',
    })
  },

  settext(e) {
   this.setData({
     count: e.detail.value
   })
  },

  settype(e) {
    //console.log(e.currentTarget.dataset.type)
    this.setData({
      activeType:common.getData(e).type
    }) 
  
  },

  del(e) {
    console.log(common.getData(e));
    wx.showModal({
      title: '友情提示',
      content: '确定要删除吗',
      success: res => {
        if(res.confirm) {
          this.data.recommends.splice
          (common.getData(e).index, 1)
          this.setData({
            recommends: this.data.recommends
          })
        }
      }
    })

    
  },

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "is",
    count:1,
    activeType:'1',
    arr: [{
        id: 1,
        name: 123
      },
      {
        id: 2,
        name: 123
      },
      {
        id: 3,
        name: 123
      },
      {
        id: 4,
        name: 123
      },
      {
        id: 5,
        name: 123
      },
    ],
    img: [],
    recommends:[],
  },

  add() {
    //console.log(111);
    this.data.arr.push({
      id:111231,
      name:"lightpr"
    })


    this.setData({
      arr:this.data.arr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    common.get('http://123.207.32.32:8000/api/wh/recommend')
    .then(res=> {
      this.setData({
        recommends: res.data.list
      })
    })

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() { 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})