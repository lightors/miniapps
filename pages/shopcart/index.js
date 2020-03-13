// pages/shopcart/index.js
import { getData, getMock} from "../../utils/common.js"


Page({
  //计算总价
  calcTotalMoney() {
    this.data.totalMoney=0;
    this.data.goodslist.filter(r=>r.isSelect).forEach(r=> {
      this.data.totalMoney += r.price *r.count
    })

    this.setData({
      totalMoney: this.data.totalMoney
    })
  },



  select(e) {
    //console.log(getData(e).id);
    let curr = this.data.goodslist.find(r => r.id === getData(e).id)
    //console.log(curr);
    curr.isSelect = !curr.isSelect;

    //遍历是否全选
    var isSelectALL = this.data.goodslist.every(r=> r.isSelect);
    //console.log(isSelectALL);

    this.setData({
      goodslist:this.data.goodslist,
      isSelectAll:isSelectALL
    })

    this.calcTotalMoney();
  },


  selectAll() {
    this.data.isSelectAll = !this.data.isSelectAll

    this.data.goodslist.forEach(r => {
      r.isSelect = this.data.isSelectAll
    })

    this.setData({
      isSelectAll: this.data.isSelectAll,
      goodslist: this.data.goodslist
    })

    this.calcTotalMoney();
  },


  //加减
  jian(e) {
    let curr = this.data.goodslist.find(r => r.id === getData(e).id);

    if(--curr.count < 1) curr.count = 1;

    this.setData({
      goodslist:this.data.goodslist
    })

    this.calcTotalMoney();
  },

  jia(e) {
    let curr = this.data.goodslist.find(r => r.id === getData(e).id);

    if (++curr.count > 99) curr.count = 99;

    this.setData({
      goodslist: this.data.goodslist
    })

    this.calcTotalMoney();
  },


  /**
   * 页面的初始数据
   */
  data: {
    totalMoney:0,
    isSelectAll:false,
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


  async getGoodsList() {
    let res = await getMock('/cartgoodslist')

    console.log(res.cartgoodslist)

    this.goodslist = res.cartgoodslist 

    this.setData({
      goodslist: this.goodslist
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.calcTotalMoney();

    this.getGoodsList()
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