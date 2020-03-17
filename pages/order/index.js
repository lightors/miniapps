// pages/order/index.js
import {
  GET_ORDERLIST
} from "../../config/api.js"

import {
  getData,
  getMock
} from "../../utils/common.js"

Page({


  onChange(e) {
    console.log(e.detail.index-1)

    this.data.ordertype = e.detail.index - 1
    this.data.pageindex = 1
    this.setData({
      orderlist:[]
    })
    this.getOrderList()
  },

  async getOrderList() {
    let res = await getMock(GET_ORDERLIST)
    //console.log(res.orderlist)
    //console.log(this.data.orderlist)

    if (this.data.orderlist >= 50) {
      return wx.showToast({
        title: '没有更多了',
        icon:"none",
      })
    }
    
    
    this.setData({
      orderlist: this.data.orderlist.concat(res.orderlist)
    })
  },


  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [],
    ordertype:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrderList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("到底部了")
    this.getOrderList()
  },


  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    setTimeout(()=> {
      wx.stopPullDownRefresh()
    },500)

    this.data.orderlist = []
    this.getOrderList()
  },

})