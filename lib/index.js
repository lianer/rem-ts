(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object')
    exports["rem"] = factory();
  else
    root["rem"] = factory();
})(window, function () {
  return /******/ (function (modules) { // webpackBootstrap
    /******/ // The module cache

    var installedModules = {};

    /******/ // The require function

    function __webpack_require__(moduleId) {

      /******/ // Check if module is in cache

      if (installedModules[moduleId]) {

        return installedModules[moduleId].exports;

      }
      /******/ // Create a new module (and put it into the cache)

      var module = installedModules[moduleId] = {

        i: moduleId,

        l: false,

        exports: {}

      };

      /******/ // Execute the module function

      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

      /******/ // Flag the module as loaded

      module.l = true;

      /******/ // Return the exports of the module

      return module.exports;

    }


    /******/ // expose the modules object (__webpack_modules__)

    __webpack_require__.m = modules;

    /******/ // expose the module cache

    __webpack_require__.c = installedModules;

    /******/ // define getter function for harmony exports

    __webpack_require__.d = function (exports, name, getter) {

      if (!__webpack_require__.o(exports, name)) {

        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter
        });

      }

    };

    /******/ // define __esModule on exports

    __webpack_require__.r = function (exports) {

      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {

        Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module'
        });

      }

      Object.defineProperty(exports, '__esModule', {
        value: true
      });

    };

    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require

    __webpack_require__.t = function (value, mode) {

      if (mode & 1) value = __webpack_require__(value);

      if (mode & 8) return value;

      if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;

      var ns = Object.create(null);

      __webpack_require__.r(ns);

      Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value
      });

      if (mode & 2 && typeof value != 'string')
        for (var key in value) __webpack_require__.d(ns, key, function (key) {
          return value[key];
        }.bind(null, key));

      return ns;

    };

    /******/ // getDefaultExport function for compatibility with non-harmony modules

    __webpack_require__.n = function (module) {

      var getter = module && module.__esModule ?

        function getDefault() {
          return module['default'];
        } :

        function getModuleExports() {
          return module;
        };

      __webpack_require__.d(getter, 'a', getter);

      return getter;

    };

    /******/ // Object.prototype.hasOwnProperty.call

    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };

    /******/ // __webpack_public_path__

    __webpack_require__.p = "";


    /******/ // Load entry module and return exports

    return __webpack_require__(__webpack_require__.s = 0);

  })


  ([
    /* 0 */

    (function (module, exports, __webpack_require__) {

      "use strict";

      /**
       * @Author: Lianer
       * @Email: lianer@live.cn
       * @Date: 2020-02-04 14:24:43
       * @LastEditTime : 2020-02-04 22:17:56
       * @Description: 微医弹性 CSS 布局，适用于移动端项目
       */
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var Rem = /** @class */ (function () {
        function Rem() {
          var _this = this;
          this.config = {
            max: 640,
            min: 320,
            num: 16,
            delay: 100,
          };
          this.styleEl = document.head.appendChild(document.createElement('style'));
          var timer;
          window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
              return _this.resize();
            }, _this.config.delay);
          });
          if (navigator.userAgent.indexOf('Android') > -1) {
            window.addEventListener('DOMContentLoaded', this.resize);
          }
          this.resize();
        }
        /**
         * 计算系统字体缩放比例
         */
        Rem.prototype.getSystemFontScale = function () {
          if (document.readyState === 'loading') {
            return 1;
          }
          var clientWidth = document.documentElement.clientWidth;
          var size = clientWidth / 16;
          var p = document.body.appendChild(document.createElement('p'));
          // 不同的基准字号放大的倍数不一样，比如 16px 放大 1.1 倍，24px 放大 1.2 倍，所以需要先计算 rem 布局会使用大多的字号
          p.style.cssText = 'width: 16em;font-size: ' + size + 'px;';
          // 计算系统字体缩放比例
          var scale = p.offsetWidth / clientWidth;
          document.body.removeChild(p);
          return scale;
        };
        /**
         * 立即刷新 rem 计算，以适配应用程序屏幕尺寸的变化
         */
        Rem.prototype.resize = function () {
          var scale = this.getSystemFontScale();
          this.size =
            Math.max(this.config.min, Math.min(this.config.max, document.documentElement.clientWidth)) /
            this.config.num /
            scale;
          this.styleEl.innerHTML = 'html{font-size: ' + this.size + 'px !important;}';
        };
        /**
         * 设置 rem 配置项
         * @param newConfig rem 配置项
         */
        Rem.prototype.set = function (newConfig) {
          if (newConfig) {
            var a = void 0;
            for (a in newConfig) {
              if (this.config.hasOwnProperty(a)) {
                this.config[a] = newConfig[a];
              }
            }
          }
          this.resize();
        };
        return Rem;
      }());
      var rem = new Rem();
      exports.default = rem;



    })

  ])["default"];
});
//# sourceMappingURL=index.js.map
