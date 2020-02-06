/**
 * @Author: Lianer
 * @Date: 2020-02-04 20:23:39
 * @LastEditTime : 2020-02-05 09:16:44
 * @Description:
 */

// const calcAge = Symbol('calcAge'); 在 es5 compile library 中不支持 Symbol，可以在 tsconfig.json 中将 targe 改为 es2015 及以上版本
const calcAge = 'calcAge';

const sum = function(a: number, b: number) {
  return a + b;
};

sum(1, 2);

class Parent {
  private name = 'parent';
  private birth = 1971;
  private age: number;
  // #hobby: string[] = ['cook']  // w3c 提案私有属性，目前还不支持

  static thisYear = new Date().getFullYear();

  constructor() {
    this.age = this[calcAge]();
  }

  private [calcAge](): number {
    return Parent.thisYear - this.birth;
  }

  sayName() {
    console.log(this.name);
  }

  sayWorld() {
    console.log('world');
  }

  static sayHello() {
    console.log('hello');
  }
}

class Child extends Parent {
  constructor() {
    super();
    Child.sayHi();
    this.sayWorld();
  }

  static sayHi() {
    super.sayHello();
  }
}

const child = new Child();
