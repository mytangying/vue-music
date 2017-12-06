<template>
  <div class="">
    搜索
  </div>
</template>
<script type="text/ecmascript-6">
import { commonParam } from 'api/config'
export default {
  data() {
    return {
      data: '',
      url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg/'
    }
  },
  mounted() {
    this.$http.get(this.url + commonParam).then(response => {
      this.data = response.body.data.hotkey
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
