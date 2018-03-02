<template>
  <div class="rank">
    <scroll :data="rankList" class="rank-container" ref="scroll">
      <div>
        <div class="rank-list clearfix" v-for="item in rankList">
          <div class="icon">
            <img @load="loadImage" v-lazy="item.picUrl" width="100">
          </div>
          <div class="songlist">
            <ul>
              <li v-for="list,index in item.songList" >{{index + 1}} {{list.songname}}-{{list.singername}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="loading-container" v-show="!rankList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { commonParam } from 'api/config'
  export default {
    data() {
      return {
        rankList: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam).then(response => {
        this.rankList = response.body.data.topList
      }, response => {
        console.log('error')
      })
    },
    methods: {
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/variable.styl'
  .rank
    position: fixed;
    width: 100%;
    top: 100px;
    bottom: 0;
    .rank-container
      height:100%
      overflow: hidden
      position: relative
      .rank-list
        padding:0 20px 20px;
        .icon
          float: left
          padding-right: 10px
          img
            display: block
        .songlist
          background: $color-highlight-background
          padding: 11px 0
          li
            color: $color-text-d
            font-size: $font-size-small
            line-height: 26px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .loading-container
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

</style>
