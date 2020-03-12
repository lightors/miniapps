import {
  getAddressByLocation,
  getLocation,
  getLocationByAddressList,
  getMinDistance
} from '../../utils/location.js'
import {
  TENCENT_MAP_KEY
} from '../../config/index.js'


import {
  $get
} from "../../utils/common.js"
Page({

  onLoad() {

    //this.getMyAddress()

    //async  await 写法
    this.getAddress()



  },


 async getMyAddress() {
   let start = await getLocation()

   let add = await getAddressByLocation(start)

   this.setData({
     myAddress:add

   })

 },


  async getAddress() {
    //获取当前经纬度 let start = {lat, lng}
    let start = await getLocation()

    let toList = this.data.shoplist.map(r=>r.address)
  
    let {minIndex,minDistance} = await getMinDistance(start,toList)
    
    this.setData({
      minDistanceShop:{
        name:this.data.shoplist[minIndex].name,
        distance:minDistance
      }
    })

  },

  data: {
    myAddress: null,
    minDistanceShop:{},
    shoplist: [{
        id: 1,
        name: '1号店',
        address: '广东省中山市东区街道起湾商业街一横巷4号(东璟廷东北'
      },
      {
        id: 2,
        name: '2号店',
        address: '广东省中山市东区起湾北道12号华鸿水云轩5期7幢1层(紫茵庭园正门对面)'
      },
      {
        id: 3,
        name: '3号店',
        address: '广东省中山市富湾东路1号'
      },

    ]
  },

  callme() {
    wx.makePhoneCall({
      phoneNumber: '13014194251',
    })


  },
  error(e) {
    console.log(e.detail)
  },




/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
  // this.getMyAddress()

  // //async  await 写法
  // this.getAddress()

  }


})


