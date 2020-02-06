/**
 * @Author: Lianer
 * @Date: 2020-02-04 22:01:21
 * @LastEditTime : 2020-02-05 09:17:09
 * @Description:
 */

const useREM = Object.create(
  {
    resize: function() {
      const config = this.config;
      const scale = this.getScale();
      this.size = Math.max(config.min, Math.min(config.max, document.documentElement.clientWidth)) / config.num / scale;
      this.style.innerHTML = 'html{font-size: ' + this.size + 'px !important;}';
      return this;
    },
    set: function(newConfig: Config) {
      if (newConfig) {
        let a: string;
        for (a in newConfig) {
          if (this.config.hasOwnProperty(a)) {
            this.config[a] = (newConfig as Config)[a];
          }
        }
      }
      this.resize();
      return this;
    },
    init: function() {
      this.style = document.head.appendChild(document.createElement('style'));

      let timer: number;
      window.addEventListener(
        'resize',
        function(): void {
          clearTimeout(timer);
          timer = setTimeout(this.resize.bind(this), this.config.delay);
        }.bind(useREM),
      );

      if (navigator.userAgent.indexOf('Android') > -1) {
        window.addEventListener('DOMContentLoaded', function() {
          useREM.resize();
        });
      }

      useREM.resize();
    },
    // 安卓手机调整手机字号，会导致字体渲染被放大
    getScale: function() {
      if (document.readyState === 'loading') {
        return 1;
      }
      const clientWidth = document.documentElement.clientWidth;
      const size = clientWidth / 16;
      const p = document.body.appendChild(document.createElement('p'));
      // 不同的基准字号放大的倍数不一样，比如 16px 放大 1.1 倍，24px 放大 1.2 倍，所以需要先计算rem布局会使用大多的字号
      p.style.cssText = 'width: 16em;font-size: ' + size + 'px;';
      const scale = p.offsetWidth / clientWidth;
      document.body.removeChild(p);
      return scale;
    },
  },
  {
    style: {
      value: null,
      writable: true,
      configurable: false,
      enumerable: true,
    },
    size: {
      value: 20,
      writable: true,
      configurable: false,
      enumerable: true,
    },
    config: {
      value: {
        max: 640,
        min: 320,
        num: 16,
        delay: 100,
      },
      writable: false,
      configurable: false,
      enumerable: true,
    },
  },
);

useREM.init();
useREM.set({
  max: 640,
});
