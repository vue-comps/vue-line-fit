// out: ..
<template lang="jade">
.line-fit(
    v-bind:style="mainStyle"
    )
  div(v-el:size
      v-if="working"
      style="font-size:10px;visibility:hidden;padding:0;position:absolute"
      )
    slot
  div(
      v-el:spacing1
      v-if="calcLetterSpacing"
      style="letter-spacing:1em;visibility:hidden;padding:0;position:absolute"
      v-bind:style="{'font-size':style.fontSize}"
      )
    slot
  div(
      v-el:spacing2
      v-if="calcLetterSpacing"
      style="letter-spacing:2em;visibility:hidden;padding:0;position:absolute"
      v-bind:style="{'font-size':style.fontSize}")
    slot
  .line-fit-valign(
      v-if="valign"
      style="position:relative;top:50%;transform:translateY(-50%)"
      v-bind:style="style"
      )
    slot
  .line-fit-result(v-else v-bind:style="style")
    slot
</template>

<script lang="coffee">
module.exports =

  mixins:[
    require("vue-mixins/onElementResize")
  ]

  props:
    "refit":
      type: Boolean
      default: false
    "letterSpacing":
      type: Boolean
      default: false
    "valign":
      type: Boolean
      default: false

  data: ->
    mainStyle:
      position:"relative"
      "white-space":"nowrap"
    style:
      fontSize: null
      letterSpacing: null

    calcLetterSpacing: false
    working: true
    dispose: null

  methods:
    calc: ->
      @working = true
      @$nextTick =>
        # height:
        style = window.getComputedStyle(@$el, null);
        availableHeight = @$el.clientHeight -
          parseInt(style.getPropertyValue('padding-top')) -
          parseInt(style.getPropertyValue('padding-bottom'))
        availableWidth = @$el.clientWidth -
          parseInt(style.getPropertyValue('padding-left')) -
          parseInt(style.getPropertyValue('padding-right'))
        size = @$els.size.getBoundingClientRect()
        @working = false
        font1 = 10 * availableHeight / size.height
        font2 = 10 * availableWidth / size.width
        @style.fontSize = Math.min(font1,font2)+'px'
        @style.lineHeight = @style.fontSize if @valign
        if @letterSpacing and font1 < font2
          @calcLetterSpacing = true
          # width:
          @$nextTick =>
            small = @$els.spacing1.getBoundingClientRect()
            large = @$els.spacing2.getBoundingClientRect()
            b = 2 * small.width - large.width
            @style.letterSpacing = (availableWidth-b) / (small.width-b) + 'em'
            @calcLetterSpacing = false

  attached: ->
    @calc()
    if @refit
      @dispose = @onElementResize @$els.main, calc

  detached: ->
    @dispose?()


</script>
