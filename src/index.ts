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

interface Config {
  max?: number; // rem 布局最大宽度
  min?: number; // rem 布局最小宽度
  num?: number; // rem 布局分割块数
  delay?: number; // 各类事件触发 resize 的时间间隔
  [key: string]: number
}

class Rem {
  private styleEl: any;
  private size: number;
  private config: Config = {
    max: 640,
    min: 320,
    num: 16,
    delay: 100,
  };

  constructor() {
    this.styleEl = document.head.appendChild(document.createElement('style'));

    let timer: any;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(::this.resize, this.config.delay);
    });

    if (navigator.userAgent.indexOf('Android') > -1) {
      window.addEventListener('DOMContentLoaded', this.resize);
    }

    this.resize();
  }

  /**
   * 计算系统字体缩放比例
   */
  private getSystemFontScale(): number {
    if (document.readyState === 'loading') {
      return 1;
    }
    const clientWidth = document.documentElement.clientWidth;
    const size = clientWidth / 16;
    const p = document.body.appendChild(document.createElement('p'));
    // 不同的基准字号放大的倍数不一样，比如 16px 放大 1.1 倍，24px 放大 1.2 倍，所以需要先计算 rem 布局会使用大多的字号
    p.style.cssText = 'width: 16em;font-size: ' + size + 'px;';
    // 计算系统字体缩放比例
    const scale = p.offsetWidth / clientWidth;
    document.body.removeChild(p);
    return scale;
  }

  /**
   * 立即刷新 rem 计算，以适配应用程序屏幕尺寸的变化
   */
  resize(): void {
    const scale = this.getSystemFontScale();
    this.size =
      Math.max(this.config.min, Math.min(this.config.max, document.documentElement.clientWidth)) /
      this.config.num /
      scale;
    this.styleEl.innerHTML = 'html{font-size: ' + this.size + 'px !important;}';
  }

  /**
   * 设置 rem 配置项
   * @param newConfig rem 配置项
   */
  set(newConfig: Config): void {
    if (newConfig) {
      let a: string;
      for (a in newConfig) {
        this.config[a] ?? newConfig[a];
      }
    }
    this.resize();
  }
}

const rem = new Rem();

export default rem;
