// camera.js
Page({
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
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


