<template>
  <div class="singer-container">
    <div v-for="item in singerList">
      <a href="">{{item.Fsinger_name}}-{{item.Findex}}</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  //  import { getSinger } from 'api/singer'
  import { commonParam2 } from 'api/config'
  export default {
    data() {
      return {
        singerList: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/v8/fcg-bin/v8.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam2).then(response => {
        this.singerList = JSON.parse(response.body).data.list
        console.log(this.singerList)
      }, response => {
        console.log('error')
      })
    }
//    created() {
//      this._singer()
//    },
//    methods: {
//      _singer() {
//        getSinger().then((res) => {
//          if (res.code === ERR_OK) {
//            console.log(res)
//          }
//        })
//      }
//    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">


</style>
