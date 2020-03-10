import {
  TENCENT_MAP_KEY
} from '../config/index.js'


export function getLocation() {
 return new Promise((resolve) => {
   wx.getLocation({
     type: 'gcj02',
     success: function ({
       latitude: lat,
       longitude: lng
     }) { 
       resolve({lat,lng})
     }
   })
 })
}


export function getAddressByLocation(lat, lng) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: [lat, lng].join(','),
        key: TENCENT_MAP_KEY
      },
      success(res) {
        // let { address, address_component, formatted_addresses } = res.data.result

        resolve(res.data.result);
      }

    })
  })
}