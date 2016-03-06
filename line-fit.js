module.exports = {
  mixins: [require("vue-mixins/onElementResize")],
  props: {
    "refit": {
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
      mainStyle: {
        position: null,
        "white-space": "nowrap"
      },
      style: {
        fontSize: null,
        letterSpacing: null
      },
      calcLetterSpacing: false,
      working: true,
      dispose: null
    };
  },
  methods: {
    calc: function() {
      this.working = true;
      return this.$nextTick((function(_this) {
        return function() {
          var availableHeight, availableWidth, font1, font2, position, style;
          if (!_this.$el) {
            return;
          }
          style = window.getComputedStyle(_this.$el, null);
          position = style.getPropertyValue("position");
          if (position !== "relative" || position !== "absolute") {
            _this.mainStyle.position = "relative";
          }
          availableHeight = _this.$el.clientHeight - parseInt(style.getPropertyValue('padding-top')) - parseInt(style.getPropertyValue('padding-bottom'));
          availableWidth = _this.$el.clientWidth - parseInt(style.getPropertyValue('padding-left')) - parseInt(style.getPropertyValue('padding-right'));
          _this.working = false;
          font1 = 10 * availableHeight / _this.$els.size.clientHeight;
          font2 = 10 * availableWidth / _this.$els.size.clientWidth;
          _this.style.fontSize = Math.min(font1, font2) + 'px';
          if (_this.valign) {
            _this.style.lineHeight = _this.style.fontSize;
          }
          if (_this.letterSpacing && font1 < font2) {
            _this.calcLetterSpacing = true;
            return _this.$nextTick(function() {
              var b;
              if (!_this.$el) {
                return;
              }
              b = 2 * _this.$els.spacing1.clientWidth - _this.$els.spacing2.clientWidth;
              _this.style.letterSpacing = (availableWidth - b) / (_this.$els.spacing1.clientWidth - b) + 'em';
              return _this.calcLetterSpacing = false;
            });
          }
        };
      })(this));
    }
  },
  attached: function() {
    this.calc();
    if (this.refit) {
      return this.dispose = this.onElementResize(this.$el, this.calc);
    }
  },
  detached: function() {
    return typeof this.dispose === "function" ? this.dispose() : void 0;
  }
};

if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "<div v-bind:style=mainStyle class=line-fit><div v-el:size=v-el:size v-if=working style=font-size:10px;visibility:hidden;padding:0;position:absolute><slot></slot></div><div v-el:spacing1=v-el:spacing1 v-if=calcLetterSpacing style=letter-spacing:1em;visibility:hidden;padding:0;position:absolute v-bind:style=\"{'font-size':style.fontSize}\"><slot></slot></div><div v-el:spacing2=v-el:spacing2 v-if=calcLetterSpacing style=letter-spacing:2em;visibility:hidden;padding:0;position:absolute v-bind:style=\"{'font-size':style.fontSize}\"><slot></slot></div><div v-if=valign style=position:relative;top:50%;transform:translateY(-50%) v-bind:style=style class=line-fit-valign><slot></slot></div><div v-else=v-else v-bind:style=style class=line-fit-result><slot></slot></div></div>"
