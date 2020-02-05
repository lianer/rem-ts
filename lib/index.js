function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * @Author: Lianer
 * @Email: lianer@live.cn
 * @Description: 微医弹性 CSS 布局，适用于移动端项目
 * @examples:
 *
 * // 使用方法
 * import '@weiyi/rem'; // 在项目的入口文件顶部引入此文件即可使用（确保在页面开始渲染之前加载完成，部分浏览器不支持动态 rem 计算）
 *
 * // 特殊方法
 * import rem from '@weiyi/rem';
 * rem.resize(); // 立即刷新，用于特殊情况下导致 rem 需要重新计算的时候，比如：系统字号发生了变化、应用程序窗口化等
 * rem.set({max: 640}); // 设置参数，并立即刷新
 */
var Rem =
  /*#__PURE__*/
  (function() {
    function Rem() {
      var _this = this;

      _classCallCheck(this, Rem);

      _defineProperty(this, 'styleEl', void 0);

      _defineProperty(this, 'size', void 0);

      _defineProperty(this, 'config', {
        max: 640,
        min: 320,
        num: 16,
        delay: 100,
      });

      this.styleEl = document.head.appendChild(document.createElement('style'));
      var timer;
      window.addEventListener('resize', function() {
        clearTimeout(timer);
        timer = setTimeout(_this.resize.bind(_this), _this.config.delay);
      });

      if (navigator.userAgent.indexOf('Android') > -1) {
        window.addEventListener('DOMContentLoaded', this.resize);
      }

      this.resize();
    }
    /**
     * 计算系统字体缩放比例
     */

    _createClass(Rem, [
      {
        key: 'getSystemFontScale',
        value: function getSystemFontScale() {
          if (document.readyState === 'loading') {
            return 1;
          }

          var clientWidth = document.documentElement.clientWidth;
          var size = clientWidth / 16;
          var p = document.body.appendChild(document.createElement('p')); // 不同的基准字号放大的倍数不一样，比如 16px 放大 1.1 倍，24px 放大 1.2 倍，所以需要先计算 rem 布局会使用大多的字号

          p.style.cssText = 'width: 16em;font-size: ' + size + 'px;'; // 计算系统字体缩放比例

          var scale = p.offsetWidth / clientWidth;
          document.body.removeChild(p);
          return scale;
        },
        /**
         * 立即刷新 rem 计算，以适配应用程序屏幕尺寸的变化
         */
      },
      {
        key: 'resize',
        value: function resize() {
          var scale = this.getSystemFontScale();
          this.size =
            Math.max(this.config.min, Math.min(this.config.max, document.documentElement.clientWidth)) /
            this.config.num /
            scale;
          this.styleEl.innerHTML = 'html{font-size: ' + this.size + 'px !important;}';
        },
        /**
         * 设置 rem 配置项
         * @param newConfig rem 配置项
         */
      },
      {
        key: 'set',
        value: function set(newConfig) {
          if (newConfig) {
            var a;

            for (a in newConfig) {
              var _this$config$a;

              (_this$config$a = this.config[a]) !== null && _this$config$a !== void 0 ? _this$config$a : newConfig[a];
            }
          }

          this.resize();
        },
      },
    ]);

    return Rem;
  })();

var rem = new Rem();

export default rem;
