
import {
  getAddressByLocation,
  getLocation
} from '../../utils/location.js'


Page({

  onLoad() {

    //promise 写法
    // getLocation().then(({
    //   lat,
    //   lng
    // }) => {
    //   //console.log(res);
    //   getAddressByLocation(lat,lng).then(res => {
    //     console.log(res)
    //   })
    // })



    //async  await 写法
    this.getAddress()



  },


  async getAddress() {
    //获取当前经纬度
    let { lat, lng } = await getLocation()
    //根据经纬度获取地址
    let res = await getAddressByLocation(lat, lng)

    console.log(res.address)
    this.address = res.address
    this.setData({
      address: this.address
    })
  },

  data: {
    address:null
  },

  callme() {
    wx.makePhoneCall({
      phoneNumber: '13014194251',
    })

    
  },
  error(e) {
    console.log(e.detail)
  }


 
  
})


