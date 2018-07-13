<template>
  <div class="main">
    <div @click="test">
      <img src="/static/image/game.jpg" width="100%" alt="">
    </div>
    <div>index page</div>
    <Header></Header>
    <div class="article_list">
      <ul class="clearfix pull-left">
        <li v-for="item in list" :key="item.Id">
          <time v-text="item.Address"></time>
          <router-link :to="'/content/' + item.Id">
            {{ item.DisplayName }}
          </router-link>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/header.vue'
import Footer from '../components/footer.vue'
// import wx from 'weixin-js-sdk'
import _ from 'lodash'
export default {
  components: {Header, Footer},
  data () {
    return {
      list: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // this.getData()
      // this.getShare()
      this.$nextTick(() => {
        window.shareData = {
          imgUrl: '/wap/img/pic-share.jpeg',
          tLink: window.location.href,
          tTitle: '金鸡湖培训',
          tContent: '132'
        }
      })
    },
    /* getShare () {
     var url = 'http://zxd.ngrok.fyxmt.com' + '/wechat/jssdk/config?url=' + encodeURIComponent(window.location.href)
     this.$api.get(url, null, r => {
     if (r.code === 0) {
     this.wxInit(r)
     }
     })
     },
     wxInit (configData) {
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
     }, */
    getData () {
      this.$api.get('/org/kvs', null, r => {
        this.list = r.data
        var a = _.compact([0, 1, false, 2, '', 3])
        console.log(a)
      })
    },
    test () {
      // test jq
      $('.article_list').css('font-size', '18px')
    }
  }
}
</script>
<style>
  .article_list {
    margin: auto;
  }
</style>
