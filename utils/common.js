function getData(e) {
  return e.currentTarget.dataset
}

function get(url, data) {
  return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
          url,
          data: {},
          method: 'GET',
          success: res => {
            //console.log(res.data.data.list)
            resolve(res.data)
          },
          complete() {
            wx.hideLoading()
          },
          fail(e) {
            reject(e)
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

export default {
  getData,
  get
}