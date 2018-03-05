<template>
  <div class="search-container">
    <div class="search-hotkey">
      <a :href="search.special_url" class="special-key"  v-show="search.special_key">{{search.special_key}}</a>
      <a href="#" v-for="item in hotkey" v-cloak>{{item.k}}</a>
    </div>
    <div class="loading-container" v-show="!hotkey.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { commonParam } from 'api/config'
  import Loading from 'base/loading/loading'
  export default {
    data() {
      return {
        search: {},
        hotkey: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam).then(response => {
        this.search = JSON.parse(response.body).data
        this.hotkey = JSON.parse(response.body).data.hotkey
        console.log(this.search)
      }, response => {
        console.log('error')
      })
    },
    components: {
      Loading
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/variable.styl"
  .search-hotkey
    a
      border-radius: 5px
      background: $color-highlight-background
      margin:5px
      padding:2px 5px
      display: inline-block
    .special-key
      border: 1px solid #fc4524
      color: #fc4524
</style>
