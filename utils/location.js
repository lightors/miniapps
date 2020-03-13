import {
  TENCENT_MAP_KEY
} from '../config/index.js'

import {
  $get
} from "../utils/common.js"


/**
 * 获取当前位置
 */
export async function getLocation() {
  return new Promise((resolve) => {
    wx.getLocation({
      type: 'gcj02',
      success: function({
        latitude: lat,
        longitude: lng
      }) {
        resolve({
          lat,
          lng
        })
      },

      fail(e) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.showModal({
                title: '重要提示',
                content: '本程序需要获取定位，请手动开启',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        if (res.authSetting['scope.userLocation']) {
                         wx.showToast({
                           title: '授权成功',
                         })
                        }
                      }
                    })
                  } else{
                    getLocation()
                  }
                }
              })
            }
          }
        })
      }
    })

  })
}

/**
 * 根据地址数组获取坐标数组
 */
export async function getLocationByAddressList(addressList) {
  let promiseList = []
  //将shoplist各个店地址换成坐标
  addressList.forEach(address => {
    let pro = $get('https://apis.map.qq.com/ws/geocoder/v1/', {
      address,
      key: TENCENT_MAP_KEY
    })
    //then 可能导致数据返回排列错误
    //这样push的是请求不是结果
    promiseList.push(pro)
  })

  //当多个请求全部完成时
  let resList = await Promise.all(promiseList)
  //得到各门店坐标数组
  let locationList = resList.map(r => r.result.location)

  //console.log(locationList)

  return locationList
}



/**根据定位获取地址名称 */
export async function getAddressByLocation({
  lat,
  lng
}) {
  let res = await $get('https://apis.map.qq.com/ws/geocoder/v1/', {
    location: [lat, lng].join(','),
    key: TENCENT_MAP_KEY
  })
  //console.log(res.data.result)
  return res.result.address
}


/**根据开始坐标和目标地址获取最近的地址 */
export async function getMinDistance({
  lat,
  lng
}, toAddressList) {

  let locationList = await getLocationByAddressList(toAddressList)

  let locationStrList = locationList.map(r => [r.lat, r.lng].join(','))
  //console.log(locationStrList)

  //我的坐标一对多
  //将我的坐标和各个店坐标进行笔记，得到最近的店
  let res = await $get("https://apis.map.qq.com/ws/distance/v1/", {
    mode: "driving",
    from: [lat, lng].join(','),
    to: locationStrList.join(';'),
    key: TENCENT_MAP_KEY

  })

  //距离数组和请求门店的顺序对应
  let distanceList = res.result.elements.map(r => r.distance)
  console.log(...distanceList)
  //最小距离
  let minDistance = Math.min(...distanceList)
  //最小距离所在下标
  let minIndex = distanceList.indexOf(minDistance)

  //console.log(minIndex)

  return {
    minIndex,
    minDistance
  }
}