<template>
  <div class="singer-container">
    <list-view :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  //  import { getSinger } from 'api/singer'
  import { commonParam2 } from 'api/config'
  import Singer from 'common/js/singer'
  import ListView from 'base/listview/listview'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    data() {
      return {
        singerList: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/v8/fcg-bin/v8.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam2).then(response => {
        this.singerList = this._normalizeSinger(JSON.parse(response.body).data.list)
      }, response => {
        console.log('error')
      })
    },
    methods: {
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
              }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
            }))
        })
       // 为了得到有序列表，我们需要处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components: {
      ListView
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  .singer-container
    position: fixed
    width:100%
    top: 100px
    bottom:0
    overflow: hidden
    .listview
      height:100%
      overflow:hidden

</style>
