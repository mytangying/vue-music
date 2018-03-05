<template>
  <transition name="slide">
    <div class="music-list">
      <div class="list">
        <ul>
          <li v-for="item in musicList">
            <p>{{item.musicData.songname}}</p>
            <p>{{item.musicData.singer[0].name}}.{{item.musicData.albumname}}</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  export default{
    data() {
      return {
        musicList: ''
      }
    },
    mounted() {
      this.$jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
        {
          jsonpCallback: 'jsonpFunc',
          callbackName: 'jsonpFunc',
          g_tk: 5381,
          loginUin: 0,
          hostUin: 0,
          format: 'jsonp',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq',
          needNewCode: 0,
          singermid: this.$router.history.current.params.id,
          order: 'listen',
          begin: 0,
          num: 30,
          songstatus: 1
        }).then(json => {
        this.musicList = json.data.list
        console.log(this.musicList)
      }, () => {
        console.log('error')
      })
    },
    components: {
      Scroll
    }
  }
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.2s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .music-list
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;

</style>
