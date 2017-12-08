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

        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import { commonParams, commonParam } from 'api/config'
  //  import { getDisc } from 'api/recommend'
  export default {
    data() {
      return {
        recommends: [],
        url: 'http://www.wangyanan.win:8000/music/json/https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg/'
      }
    },
    mounted() {
      this.$http.get(this.url + commonParam).then(response => {
        this.recommends = response.body.data.slider
        console.log(this.recommends)
      }, response => {
        console.log('error')
      })
      const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
      })
      let commonParam2 = JSON.stringify(data)
      console.log(commonParam2)
    },
    components: {
      Slider
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/variable.styl'
  @import '../../common/stylus/mixin.styl'
  .recommend-list
    .list-title
      color: $color-theme
      font-size: $font-size-medium
      text-align: center
      margin: 20px 0

</style>
