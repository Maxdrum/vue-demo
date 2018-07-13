/**
 * Created by swain on 2018/7/6.
 */
import wx from 'weixin-js-sdk'
import axios from 'axios'
function goodTime (str) {
  let now = new Date().getTime()
  let oldTime = new Date(str).getTime()
  let difference = now - oldTime
  let result = ''
  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let year = month * 12
  let _year = difference / year
  let _month = difference / month
  let _week = difference / (7 * day)
  let _day = difference / day
  let _hour = difference / hour
  let _min = difference / minute

  if (_year >= 1) {
    result = '发表于 ' + ~~(_year) + ' 年前'
  } else if (_month >= 1) {
    result = '发表于 ' + ~~(_month) + ' 个月前'
  } else if (_week >= 1) {
    result = '发表于 ' + ~~(_week) + ' 周前'
  } else if (_day >= 1) {
    result = '发表于 ' + ~~(_day) + ' 天前'
  } else if (_hour >= 1) {
    result = '发表于 ' + ~~(_hour) + ' 个小时前'
  } else if (_min >= 1) {
    result = '发表于 ' + ~~(_min) + ' 分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

function htmlFontSize () {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  var width = w > 720 ? 720 : w
  var fz = ~~(width * 100000 / 36) / 10000
  var html = document.getElementsByTagName('html')[0]
  html.style.cssText = 'font-size: ' + fz + 'px'
  var realfz = ~~(+window.getComputedStyle(html).fontSize.replace('px', '') * 10000) / 10000
  if (fz !== realfz) {
    html.style.cssText = 'font-size: ' + fz * (fz / realfz) + 'px'
  }
}
htmlFontSize()
window.onresize = function () {
  htmlFontSize()
}

function getShare () {
  var url = 'http://zxd.ngrok.fyxmt.com' + '/wechat/jssdk/config?url=' + encodeURIComponent(window.location.href)
  axios.get(url)
    .then(r => {
      // handle success
      const data = r.data.result || {}
      if (data.code === 0) {
        wxInit(data)
      }
    })
    .catch(error => {
      // handle error
      console.log(error)
    })
    .then(() => {
      // always executed
    })
}

function wxInit (configData) {
  console.log('请求后的sign参数：', configData)
  if (configData.code !== 0 || configData.data === null) {
    alert(configData.msg)
    return
  }
  var signParam = configData.data
  // 进行校验
  wx.config({
    debug: false,
    appId: signParam.appId,
    timestamp: signParam.timestamp,
    nonceStr: signParam.nonceStr,
    signature: signParam.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      // 'translateVoice',
      // 'startRecord',
      // 'stopRecord',
      // 'onRecordEnd',
      // 'playVoice',
      // 'pauseVoice',
      // 'stopVoice',
      // 'uploadVoice',
      // 'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      // 'scanQRCode',
      'chooseWXPay',
      // 'openProductSpecificView',
      // 'addCard',
      // 'chooseCard',
      // 'openCard',
      'closeWindow'
    ]
  })
  window.shareData = {}
  wx.ready(function () {
    console.log('分享内容:', window.shareData)
    wx.showOptionMenu()
    // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareAppMessage({
      title: window.shareData.tTitle,
      desc: window.shareData.tContent,
      link: window.shareData.tLink,
      imgUrl: window.shareData.imgUrl,
      trigger: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
      },
      cancel: function (res) {
        console.log(res)
        alert('已取消')
      },
      fail: function (res) {
        alert(JSON.stringify(res))
      }
    })
    // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareTimeline({
      title: window.shareData.tTitle,
      desc: window.shareData.tContent,
      link: window.shareData.tLink,
      imgUrl: window.shareData.imgUrl,
      trigger: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
      },
      cancel: function (res) {
        console.log(res)
        alert('已取消')
      },
      fail: function (res) {
        alert(JSON.stringify(res))
      }
    })
    // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareQQ({
      title: window.shareData.tTitle,
      desc: window.shareData.tContent,
      link: window.shareData.tLink,
      imgUrl: window.shareData.imgUrl,
      trigger: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
      },
      cancel: function () {
        alert('已取消')
      },
      fail: function (res) {
        alert(JSON.stringify(res))
      }
    })
    // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
    wx.onMenuShareWeibo({
      title: window.shareData.tTitle,
      desc: window.shareData.tContent,
      link: window.shareData.tLink,
      imgUrl: window.shareData.imgUrl,
      trigger: function (res) {
        console.log(res)
      },
      complete: function (res) {
        console.log(res)
      },
      success: function (res) {
        console.log(res)
      },
      cancel: function (res) {
        console.log(res)
        alert('已取消')
      },
      fail: function (res) {
        alert(JSON.stringify(res))
      }
    })
  })
}

getShare()

export {goodTime, getQueryString}
