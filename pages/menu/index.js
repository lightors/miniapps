import {
  getAddressByLocation,
  getLocation
} from '../../utils/location.js'
import {
  TENCENT_MAP_KEY
} from '../../config/index.js'


import {
  $get
} from "../../utils/common.js"
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
    let {
      lat,
      lng
    } = await getLocation()
    //根据经纬度获取地址
    let res = await getAddressByLocation(lat, lng)
    this.address = res.address
    this.setData({
      address: this.address
    })



    let promiseList = []
    //将shoplist各个店地址换成坐标
    this.data.shoplist.forEach(r => {
      //console.log(r.address);


      /*          wx.request({
              url: 'https://apis.map.qq.com/ws/geocoder/v1/',
              data:{
                address:r.address,
                key: TENCENT_MAP_KEY
              },
              success:res=> {
                console.log(res.data.result)
              }
            }) */



      let pro = $get('https://apis.map.qq.com/ws/geocoder/v1/', {
        address: r.address,
        key: TENCENT_MAP_KEY
      })
      //then 可能导致数据返回排列错误
      /* .then(res => {
              console.log(res.result)
            }) */
      //console.log(pro)

      //这样push的是请求不是结果
      promiseList.push(pro)
    })
    //console.log(arr)

    /*  let proAll = Promise.all(promiseList)

     proAll.then(resList => {
       let locationList = resList.map(r=> r.result.location)
       
     }) */


    let resList = await Promise.all(promiseList)

    let locationList = resList.map(r => r.result.location)
    //console.log(locationList.map(r=>[r.lat,r.lng].join(',')))


    let locationStrList = locationList.map(r => [r.lat, r.lng].join(','))
    //console.log(locationStrList)

   let res2 = await $get("https://apis.map.qq.com/ws/distance/v1/", {
      mode: "driving",
      from: [lat,lng].join(','),
      to: locationStrList.join(';'),
      key: TENCENT_MAP_KEY

    })


    //距离数组和请求门店的顺序对应
    let distanceList = res2.result.elements.map(r=>(
      //to:r.to,不需要了
    r.distance
    ))
    console.log(...distanceList)
    //最小距离
    let minDistance = Math.min(...distanceList)
    //最小距离所在下标
    let minIndex = distanceList.indexOf(minDistance) 

    console.log(minIndex)

    
    this.setData({
      minDistanceShop:{
        name:this.data.shoplist[minIndex].name,
        distance:minDistance
      }
    })











    //将我的坐标和各个店坐标进行笔记，得到最近的店

    //console.log(res.address)

  },

  data: {
    address: null,
    minDistanceShop:{},
    shoplist: [{
        id: 1,
        name: '第一家店',
        address: '广东省中山市东区街道起湾商业街一横巷4号(东璟廷东北'
      },
      {
        id: 1,
        name: '第二家店',
        address: '广东省中山市东区起湾北道12号华鸿水云轩5期7幢1层(紫茵庭园正门对面)'
      },
      {
        id: 1,
        name: '第三家店',
        address: '广东省中山市华宏水云轩'
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
  }




})