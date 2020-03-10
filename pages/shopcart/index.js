// pages/shopcart/index.js
import common from "../../utils/common.js"

Page({
  select(e) {
    //console.log(common.getData(e).id);
    let curr = this.data.goodslist.find(r => r.id === common.getData(e).id)
    console.log(curr);
    curr.isSelect = !curr.isSelect;
    this.setData({
      goodslist:this.data.goodslist
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    goodslist:[
      {
        id:1,
        name:"星冰乐",
        desc:"大杯/去冰/七分糖",
        price:21,
        count:1,
        isSelect:true,
      },
      {
        id: 2,
        name: "抹茶拿铁",
        desc: "大杯/去冰/七分糖",
        price: 25,
        count: 4,
        isSelect: false,
      },
      {
        id: 3,
        name: "美式咖啡",
        desc: "大杯/七分糖",
        price: 29,
        count: 3,
        isSelect: false,
      },
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})