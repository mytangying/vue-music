<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Candy Music</h1>
  </div>
</template>
<script type="text/javascript">
	export default{}
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
	@import  '../../common/stylus/variable.styl'
	@import  '../../common/stylus/mixin.styl'

	.m-header
		height:54px
		padding-top:10px
		text-align: center
		position: relative
		font-size: 0
		color: $color-theme
		.icon
			display: inline-block
			width :30px
			height :32px
			vertical-align: top
			margin-right: 9px
			bg-image("logo")
			background-size: 30px 32px
		.text
			display:inline-block
			line-height: 44px
			vertical-align:top
			font-size: $font-size-large
</style>
