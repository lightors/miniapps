// components/list.js
import {
  getData
} from "../utils/common.js"


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activeGG: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    say() {
      wx.showToast({
        title: 'hello',
      })
    },
    changegg(e) {
      this.setData({
        activeGG: parseInt(getData(e).type)
      })
    }
  }
})
