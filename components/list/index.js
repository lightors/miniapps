// components/list.js
import {
  getData
} from "../../utils/common.js"

import listmixin from '../list-mixin.js'

Component({

  behaviors: [listmixin],
  /**
   * 组件的属性列表
   */
  properties: {
    label:{
      type:String,
      value:"标题"
    },
    list: {
      type:Array,
     
    },
    activeIndex:{
      type:Number,
      value:0
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    _activeIndex:0
  },


  lifetimes: {

    

    //组件被加载时执行
    attached:function() {

      console.log(this.data.authorName)

      this.setData({
        _activeIndex:this.data.activeIndex
      })
    }
  },

  observers: {
    //监听到传进来的activeIndex改变的时候执行
    activeIndex: function() {
      this.setData({
        _activeIndex: this.data.activeIndex
      })
    }
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
    changIndex(e) {
      let index = parseInt(getData(e).index)
      this.setData({
        _activeIndex: index
      })

//子组件向外(bind:change)发送index = parseInt(getData(e).index)
      this.$emit('change',index)
    }
  }
})
