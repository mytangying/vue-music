<template>
  <div class="">
    排行榜
  </div>
</template>
<script type="text/ecmascript-6">
import { commonParam } from 'api/config'
export default {
  data() {
    return {
      data: '',
      url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg/'
    }
  },
  mounted() {
    this.$http.get(this.url + commonParam).then(response => {
      this.data = JSON.parse(response.bodyText.slice(18, -1)).data.topList
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
