<template>
  <div class="loading">
    <img src="../../components/m-header/icon.png" width="80px">
    <div class="text" v-html="text"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data() {
      return {
        text: 'candy正在火速为小主加载...'
      }
    }
  }
</script>
<style rel="stylesheet/stylus" lang="stylus">
  @import '../../common/stylus/variable.styl'
  .loading
    text-align: center
    .text
      margin-top:10px
      color: $color-text-d
</style>
