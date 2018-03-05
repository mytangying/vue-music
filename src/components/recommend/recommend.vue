<template>
  <div class="recommend">
    <scroll ref="scroll" :data="discList" class="recommend-content">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommends">
              <a :href='item.linkUrl'>
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="list in discList" class="clearfix item">
              <div class="icon">
                <img v-lazy="list.picUrl" class="discListPic">
              </div>
              <div class="text">
                <h3 v-cloak>{{list.songListAuthor}}</h3>
                <p v-cloak>{{list.songListDesc}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import { commonParam } from 'api/config'
  //  import { getDisc } from 'api/recommend'
  export default {
    data() {
      return {
        recommends: [],
        discList: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam).then(response => {
        this.discList = response.body.data.songList
        this.recommends = response.body.data.slider
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
      Slider,
      Scroll,
      Loading
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/reset.styl'
  .recommend
    position: fixed
    width:100%
    top: 100px
    bottom:0
    .recommend-content
      height:100%
      overflow:hidden
      .slider-wrapper
        position: relative
        width:100%
        overflow: hidden
      .recommend-list
        .list-title
          color: $color-theme
          font-size: $font-size-medium
          text-align: center
          height: 65px
          line-height: 65px
        .item
          display: flex
          box-sizing:border-box
          align-items:center
          padding: 0 20px 20px
          .icon
            flex:0 0 80px
            width: 80px
            padding-right: 20px
            .discListPic
              width: 100%
          .text
            display: flex
            flex-direction:column
            justify-content:center
            flex:1
            line-height: 20px
            overflow:hidden
            font-size: $font-size-medium
            h3
              font-size: $font-size-medium
              margin-bottom:10px
            p
              color: $color-text-d

</style>
