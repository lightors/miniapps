import {
  getAddressByLocation,
  getLocation,
  getLocationByAddressList,
  getMinDistance
} from '../../utils/location.js'



import {
  GET_SHOPLIST,
  GET_MENU,
  GET_GOODSLIST_BY_TYPE

} from "../../config/api.js"
import {
  getMock,
  getData
} from "../../utils/common.js"



Page({

  getdetail() {
    wx.hideTabBar({
      aniamtion: true,
      success: () => {
        this.setData({
          isHideDetail: false
        })
      }
    })
  },

  closedetail() {
    this.setData({
      isHideDetail: true,
      activeGuigeIndex: 0,
      activeWenduIndex: 0,
      activeTangduIndex: 0,

    })
    wx.showTabBar({
      animation:true,
    })
  },

  onLoad() {

    //this.getMyAddress()

    //async  await 写法

    this.initData()


  },


  async initData() {
    await this.getMenu()

    this.getShopsList()
  },

  onShow() {
    this.getShopList()
  },

  async getShopList() {
    let shoplist = await getMock(GET_SHOPLIST)
    this.data.shoplist = shoplist.shoplist
    //console.log(this.data.shoplist.shoplist)
    this.getAddress()

  },


  /*   async getMyAddress() {
      let start = await getLocation()

      let add = await getAddressByLocation(start)

      this.setData({
        myAddress: add

      })

    }, */


  async getAddress() {
    //获取当前经纬度 let start = {lat, lng}
    let start = await getLocation()

    let toList = this.data.shoplist.map(r => r.address)

    let {
      minIndex,
      minDistance
    } = await getMinDistance(start, toList)

    this.setData({
      minDistanceShop: {
        name: this.data.shoplist[minIndex].name,
        distance: minDistance
      }
    })

  },


  async getMenu() {
    let res = await getMock(GET_MENU)

    this.setData({
      menulist: res.menu
    })
  },

  async getShopsList() {

    //传参给后端
    let type = this.data.menulist[this.data.activeMenuIndex].id
    let res = await getMock(GET_GOODSLIST_BY_TYPE, {
      type
    })

    //console.log(goodslist);
    this.setData({
      goodslist: res.goodslist
    })


  },


  changeMenu(e) {
    this.setData({
      activeMenuIndex: getData(e).index
    })


    this.getShopsList()
  },

  data: {
    isHideDetail: true,
    myAddress: null,
    menulist: [],
    minDistanceShop: {},
    activeMenuIndex: 0,
    shoplist: [],
    goodslist: [],
    guigelist:['大','中','小'],
    wendulist:["热",'常温','冰'],
    tangdulist: ["全糖", '半糖', '无糖'],
    activeGuigeIndex:0,
    activeWenduIndex:0,
    activeTangduIndex:0,

    
  },


  changeguige(e) {
    //console.log(e.detail)
    //console.log(this.data.guigelist[e.detail])

    this.data.activeGuigeIndex = e.detail
  
  },

    changewendu(e) {
    //console.log(e.detail)
    //console.log(this.data.guigelist[e.detail])

    this.data.activeWenduIndex = e.detail

  },

    changetangdu(e) {
    //console.log(e.detail)
    //console.log(this.data.guigelist[e.detail])

    this.data.activeTangduIndex = e.detail

  },


  order() {
    console.log(this.data.guigelist[this.data.activeGuigeIndex],this.data.wendulist[this.data.activeWenduIndex],this.data.tangdulist[this.data.activeTangduIndex],)
  }







})