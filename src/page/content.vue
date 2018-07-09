<template>
  <div>
    <myHeader></myHeader>
    <h2 v-text="dat.RecordsFiltered"></h2>
    <p>作者：{{dat.Draw}} 发表于：{{dat.RecordsTotal}}</p>
    <hr>
    <!--<article v-html="dat.content"></article>-->
    <h3>网友回复：</h3>
    <ul>
      <li v-for="i in dat.Data" :key="i.Id">
        <div>
          <span v-text="'评论者：' + i.ContactPerson"></span>
          <span v-text="'评论于：' + $utils(i.Founded)"></span>
          <span v-text="$getQueryString('name')"></span>
        </div>
        <article v-html="i.WorkAddress"></article>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from '../components/header.vue'
import myFooter from '../components/footer.vue'
export default {
  components: { myHeader, myFooter },
  data () {
    return {
      id: this.$route.params.id,
      name: this.$getQueryString('name'),
      dat: {}
    }
  },
  created () {
    console.log(this.name)
    this.getData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getData'
  },
  methods: {
    getData () {
      this.$api.get('/base/list?Draw=1&VolunteerId=bef55437-9ef0-434b-8005-96227360892a&MaxResultCount=20&SkipCount=1', null, r => {
        this.dat = r.data
      })
    }
  }
}
</script>
