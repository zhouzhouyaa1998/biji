# js 声明对象

1----普通函数声明⽅式 ------->存在函数提升会将函数提升到最上⾯函数是⼀等公民函数的提升会在变量的提升
的上⾯。
`1 function sum（）{}；调⽤：sum（）`function 命令后面是函数名，函数名后面是一对圆括号，里面是传入函数的参数。函数体放在大括号里。
2---函数表达式声明⽅式 ------> 将⼀个函数（匿名函数/命名函数）赋值给⼀个变量不存在函数提升变量会提升函数体还是留在原来位置
`1 var add=function（）{}；调⽤：add（）` //虽然命名式函数表达式有函数名，但是不能通过这个函数名来调⽤函数，还是只能通过被赋值的变量加上⼩括号才能调⽤
3----构造函数声明⽅式
`var add2=new Function（）；调⽤：add2（）`
4----箭头函数没有 function，不能当作构造函数来使用。
`const f = () => {};`
查看一个对象本身的所有属性，可以使用 Object.keys 方法。

```js
const e = {}; //声明一个对象
const h = 123;
let i = "1";
const f = () => {}; //声明一个函数
const b = {
  a: 123,

  b1: function () {}, //匿名函数声明在对象里的四中表达方式
  b2: () => {}, //对象里不能使用等号=
  b3() {}, //b1: function () {}的简写
  b4: f,
  c: {
    d() {},
  },
  e,
  [i]: "dsfsaf",
  // '1': "dsfsaf",
};

b.a; //访问对象b属性a
b[i]; //变量用中括号来访问
```

```js
const b = new Array(2); //用new的时候Array才是构造函数，使用构造函数，创建一个数组，构造函数传的参数2是数组长度
const c = Array.of(2); //用的Array函数自带的of方法，把传来的参数变成数组的元素，所以c数组长度为1，第一个元素是2
const d = Array.from(
  {
    length: 2, //用的Array函数自带的from方法,接收一个类数组or可迭代对象返回一个新的数组
  },
  (value, index) => index //对数组每个元素初始化，将数组下标（index）赋值给数组[0,1]，如果指定了该参数，新数组中的每个元素会执行该回调函数。
);

const f = (value, index) => {
  //(value, index)是从Array.from传来的
  return index + 2; //给数组自定义赋值2，3
};
const e = Array.from(
  {
    length: 2, //用的Array函数自带的from方法,接收一个类数组or可迭代对象返回一个新的数组
  },
  f
);

const a = []; //声明一个空数组
a[0]; //访问数组元素
a.push(0, 1); //给数组添元素
a.map((value, index) => {});
a.map(function (value, index) {
  return value;
}); //map是用来遍历的，作用是生成新的数组
```

```js
const a = (value, index) => index;
// 当函数体只有return index;这一行可以简写为index
const a = (value, index) => {
  return index;
};
```

## 创建对象

构造函数的作用就是创建一个对象。函数必须是存在的，有 new 才是构造函数。
let，var，const 是声明变量的关键字（命令）
let 变量名 = new 构造函数（）

1. new Object()
2. {}
3. new 构造函数()
4. Object.create()
5. Object.assign()

```js
var add = function () {}; //声明一个匿名函数赋值给add
const r = new add(); //调用构造函数，返回的一个新对象赋值给r

const a = {
  test: "123",
};

const b = Object.create(a); //Object.create是以某个对象为原型创建一个对象。

const d = { msg: "aaaa" };

const c = Object.assign({}, { msg: "aaaa" }, { value: "44444" }, a); //Object.create是以某个对象为基础创建一个对象。

console.log(c);
// {msg: 'aaaa', value: '44444'} 后面同名的属性会覆盖前面的。
```

## 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。

```js
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, "foo");
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的 enumerable 属性，称为“可枚举性”，如果该属性为 false，就表示某些操作会忽略当前属性。

- 目前，有四个操作会忽略 enumerable 为 false 的属性。
  - for...in 循环：只遍历对象自身的和继承的可枚举的属性。
  - Object.keys()：返回对象自身的所有可枚举的属性的键名。
  - JSON.stringify()：只串行化对象自身的可枚举的属性。
  - Object.assign()： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。

ES2017 引入了跟 Object.keys 配套的 Object.values 和 Object.entries，作为遍历一个对象的补充手段，供 for...of 循环使用。

```js
let { keys, values, entries } = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象
