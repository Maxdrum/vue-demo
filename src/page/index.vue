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
import _ from 'lodash'
export default {
  components: {Header, Footer},
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
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
  .article_list {margin: auto;}
</style>
