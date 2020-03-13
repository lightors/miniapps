import {
  getAddressByLocation,
  getLocation,
  getLocationByAddressList,
  getMinDistance
} from '../../utils/location.js'

import {
  getMock,
  getData
} from "../../utils/common.js"



Page({

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
    let shoplist = await getMock('/getShopList')
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
    let res = await getMock("/menu")

    this.setData({
      menulist: res.menu
    })
  },

  async getShopsList() {

    //传参给后端
    let type = this.data.menulist[this.data.activeMenuIndex].id
    let res = await getMock('/getGoodsListByTpye', {
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
    myAddress: null,
    menulist: [],
    minDistanceShop: {},
    activeMenuIndex: 0,
    shoplist: [],
    goodslist: []
  },


})