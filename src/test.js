/**
 * @Author: Lianer
 * @Date: 2020-02-04 20:23:39
 * @LastEditTime : 2020-02-05 09:16:44
 * @Description:
 */
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
// const calcAge = Symbol('calcAge'); 在 es5 compile library 中不支持 Symbol，可以在 tsconfig.json 中将 targe 改为 es2015 及以上版本
var calcAge = 'calcAge';
var Parent = /** @class */ (function() {
  function Parent() {
    this.name = 'parent';
    this.birth = 1971;
    this.age = this[calcAge]();
  }
  Parent.prototype[calcAge] = function() {
    return Parent.thisYear - this.birth;
  };
  Parent.prototype.sayName = function() {
    console.log(this.name);
  };
  Parent.prototype.sayWorld = function() {
    console.log('world');
  };
  Parent.sayHello = function() {
    console.log('hello');
  };
  // #hobby: string[] = ['cook']  // w3c 提案私有属性，目前还不支持
  Parent.thisYear = new Date().getFullYear();
  return Parent;
})();
var Child = /** @class */ (function(_super) {
  __extends(Child, _super);
  function Child() {
    var _this = _super.call(this) || this;
    Child.sayHi();
    _this.sayWorld();
    return _this;
  }
  Child.sayHi = function() {
    _super.sayHello.call(this);
  };
  return Child;
})(Parent);
var child = new Child();
