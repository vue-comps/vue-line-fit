module.exports = {
  mixins: [require("vue-mixins/onElementResize")],
  props: {
    "adapt": {
      type: Boolean,
      "default": false
    },
    "letterSpacing": {
      type: Boolean,
      "default": false
    },
    "valign": {
      type: Boolean,
      "default": false
    }
  },
  data: function() {
    return {
      style: {
        fontSize: null,
        letterSpacing: null
      },
      calcLetterSpacing: false,
      done: false,
      dispose: null
    };
  },
  methods: {
    calc: function() {
      this.done = false;
      return this.$nextTick((function(_this) {
        return function() {
          var availableHeight, availableWidth, font1, font2, size, style;
          style = window.getComputedStyle(_this.$el, null);
          availableHeight = _this.$el.clientHeight - parseInt(style.getPropertyValue('padding-top')) - parseInt(style.getPropertyValue('padding-bottom'));
          availableWidth = _this.$el.clientWidth - parseInt(style.getPropertyValue('padding-left')) - parseInt(style.getPropertyValue('padding-right'));
          size = _this.$els.size.getBoundingClientRect();
          _this.done = true;
          font1 = 10 * availableHeight / size.height;
          font2 = 10 * availableWidth / size.width;
          _this.style.fontSize = Math.min(font1, font2) + 'px';
          if (_this.valign) {
            _this.style.lineHeight = _this.style.fontSize;
          }
          if (_this.letterSpacing && font1 < font2) {
            _this.calcLetterSpacing = true;
            return _this.$nextTick(function() {
              var b, large, small;
              small = _this.$els.spacing1.getBoundingClientRect();
              large = _this.$els.spacing2.getBoundingClientRect();
              b = 2 * small.width - large.width;
              _this.style.letterSpacing = (availableWidth - b) / (small.width - b) + 'em';
              return _this.calcLetterSpacing = false;
            });
          }
        };
      })(this));
    }
  },
  attached: function() {
    this.calc();
    if (this.adapt) {
      return this.dispose = this.onElementResize(this.$els.main, calc);
    }
  },
  detached: function() {
    return typeof this.dispose === "function" ? this.dispose() : void 0;
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:style=style style=position:relative;white-space:nowrap class=line-fit><div v-el:size=v-el:size v-if=!done style=font-size:10px;visibility:hidden;padding:0;position:absolute><slot></slot></div><div v-el:spacing1=v-el:spacing1 v-if=calcLetterSpacing style=letter-spacing:1em;visibility:hidden;padding:0;position:absolute v-bind:style=\"{'font-size':style.fontSize}\"><slot></slot></div><div v-el:spacing2=v-el:spacing2 v-if=calcLetterSpacing style=letter-spacing:2em;visibility:hidden;padding:0;position:absolute v-bind:style=\"{'font-size':style.fontSize}\"><slot></slot></div><div v-if=valign style=position:relative;top:50%;transform:translateY(-50%) class=line-fit-valign><slot></slot></div><div v-else=v-else class=line-fit-result><slot></slot></div></div>"
