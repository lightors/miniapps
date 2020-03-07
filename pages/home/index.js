// pages/home/index.js
Page({
  go() {
    wx.navigateTo({
      url: '../mine/index',
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "is",
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
    wx.request({
      url: 'http://123.207.32.32:8000/api/wh/recommend',
      data: {

      },
      method:'GET',
      success: res => {
        console.log(res.data.data.list)
        this.setData({
          recommends: res.data.data.list,
          
        },)
          //console.log(recommends)
        
      }
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