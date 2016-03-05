<template lang="jade">
.container
  a(href="https://github.com/paulpflug/vue-line-fit/blob/master/dev/basic.vue") source
  p width: 100px; height: 100px
  line-fit(style="width: 100px;height: 100px") Test
  p width: 100px; height: 100px; valing = true
  line-fit(style="width: 100px;height: 100px" v-bind:valign="true") Test
  p width: 300px; height: 100px
  line-fit(style="width: 300px; height: 100px") Test
  p width: 300px; height: 100px; text-align: center
  line-fit(style="width: 300px; height: 100px;text-align: center") Test
  p width: 300px; height: 100px; letter-spacing = true
  line-fit(style="width: 300px; height: 100px" v-bind:letter-spacing="true") Test
</template>

<script lang="coffee">
module.exports =
  components:
    "line-fit": require "../line-fit.js"

</script>

<style lang="stylus">
.line-fit
  border 1px solid black

.container > a
  position absolute
  line-height 350px
  text-align center
  left 0
  bottom 0
  top 0
  right 0

</style>
