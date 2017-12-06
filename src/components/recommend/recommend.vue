<template>
  <div class="">
    热门推荐
  </div>
</template>
<script>
import { commonParam } from 'api/config'
export default {
  data() {
    return {
      data: '',
      url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg/'
    }
  },
  mounted() {
    this.$http.get(this.url + commonParam).then(response => {
      this.data = response.body.data.slider
      console.log(this.data)
    }, response => {
      console.log('error')
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">


</style>
