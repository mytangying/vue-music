<template>
  <scroll ref="listview"
          class="listview"
          :data="data"
          :listenScroll="listenScroll"
          :probeType="probeType"
          @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList"
            class="item"
            :class="{current: currentIndex===index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { getData } from 'common/js/dom'
  const ANCHORHEIGHT = 18
  const TITLEHEIGHT = 30
  export default {
    created() {
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1,
        fixedTop: -1
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        this.touch.y1 = e.touches[0].pageY
        this.touch.anchorIndex = anchorIndex
        this.currentIndex = parseInt(anchorIndex)
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        this.touch.y2 = e.touches[0].pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHORHEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + parseInt(delta)
        this.currentIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部时， newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            this.currentIndex = i
            this.diff = height2 + newY
            console.log(this.diff)
            return
          }
        }
        // 滚动到底部且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal - TITLEHEIGHT) < 0 ? newVal - TITLEHEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        console.log(fixedTop)
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: 12px
      color: hsla(0, 0%, 100%, .5)
      background: #333
    ul .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: hsla(0, 0%, 100%, .5)
        font-size: 14px

  .list-shortcut
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: rgba(0, 0, 0, .3);
    font-family: Helvetica;
    .item
      padding: 3px;
      line-height: 1;
      color: hsla(0, 0%, 100%, .5);
      font-size: 12px;
      &.current
        color: #ffcd32

  .list-fixed
    position: absolute
    width: 100%
    top: 0
    left: 0
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: 12px
      color: hsla(0, 0%, 100%, .5)
      background: #333
</style>
