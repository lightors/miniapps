import {
  BASE_URL
} from '../config/index.js'

export function getMock(url, data) {
  return $get(BASE_URL + url,data)
}


export function getData(e) {
  return e.currentTarget.dataset
}

export function $get(url, data) {
  return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
          url,
          data,
          method: 'GET',
          success: res => {
            //console.log(res.data.data.list)
            resolve(res.data)
          },
          
          fail(e) {
            reject(e)
          },
        complete() {
          wx.hideLoading()
        },
          //console.log(recommends)
      })
      }
  )
}


/* module.exports = {
  getData,
  get
} */

// export default {
//   getData,
 
// }