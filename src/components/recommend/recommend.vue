<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href='item.linkUrl'>
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="list in discList" class="clearfix item">
            <div class="icon">
              <img :src="list.picUrl" class="discListPic">
            </div>
            <div class="text">
              <h3>{{list.songListAuthor}}</h3>
              <p>{{list.songListDesc}}</p>
            </div>
          </li>
        </ul>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Loading from 'base/loading/loading'
  import Slider from 'base/slider/slider'
  import { commonParam } from 'api/config'
  //  import { getDisc } from 'api/recommend'd
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
        this.recommends = response.body.data.slider
        this.discList = response.body.data.songList
      }, response => {
        console.log('error')
      })
    },
    components: {
      Slider,
      Loading
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'
  @import '../../common/stylus/reset.styl'
  .slider-wrapper
    overflow: hidden
  .recommend-list
    .list-title
      color: $color-theme
      font-size: $font-size-medium
      text-align: center
      margin: 20px 0
    .item
      padding: 0 20px 20px
      .icon
        width: 80px
        float: left
        padding-right: 20px
        .discListPic
          width: 100%
      .text
        overflow:hidden
        font-size: $font-size-medium
        h3
          font-size: $font-size-medium
          margin-bottom:10px
          line-height:1
        p
          color: $color-text-d
</style>
