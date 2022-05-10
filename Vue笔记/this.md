# this

在介绍这三个函数之前需要，先了解 this，毕竟这三个函数都是为了改变运行时的 this 指向。

this 是指当前函数中正在执行的上下文环境，在 ES5 中，其实 this 的指向，始终坚持一个原理：**this 永远指向最后调用它的那个对象**。

先看几个例子：

```js
var name = "global";
function a() {
  var name = "qqwrv";
  console.log(this.name); // global
  console.log("inner:" + this); // inner: Window
}
a();
console.log("outer:" + this); // outer: Window
```

为什么`console.log(this.name);`打印的是 global 呢？根据刚刚的那句话“this 永远指向最后调用它的那个对象”，最后调用 a 的地方 a();，前面没有调用的对象默认就是全局对象 window，也就相当于是 window.a()。

```js
var name = "global";
var a = {
  name: "qqwrv",
  fn: function () {
    console.log(this.name);
  },
};
window.a.fn(); // qqwrv
```

this 永远指向最后调用它的那个对象，最后调用它的对象仍然是对象 a，所以打印 qqwrv。

```js
var name = "global";
var a = {
  name: null,
  fn: function () {
    console.log(this.name);
  },
};

var f = a.fn;
f(); // global
```

全局对象调用 f()函数，所以 this 指的是全局对象.

这里虽然将 a 对象的 fn 方法赋值给变量 f 了，但是没有调用，由于刚刚的 f 并没有调用，所以 fn() 最后仍然是被 window 调用的。所以 this 指向的也就是 window。

那么怎么改变 this 的指向呢？这里主要介绍 call、apply、bind

- 使用 ES6 的箭头函数（箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined）

```js
// ES6
function foo() {
  setTimeout(() => {
    console.log("id:", this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log("id:", _this.id);
  }, 100);
}
```

- 在函数内部使用 `_this = this`
- 使用 apply、call、bind
- new 实例化一个对象
