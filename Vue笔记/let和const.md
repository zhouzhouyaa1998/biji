# let 和 const

## 变量提升

```js
var tmp = new Date();

function f() {
  console.log(tmp);
  if (false) {
    var tmp = "hello world";
  }
}

f(); // undefined

var tmp;
tmp = new Date();

function f() {
  var tmp;
  console.log(tmp);
  if (false) {
    tmp = "hello world";
  }
}

f(); // undefined

var s = "hello";

for (var i = 0; i < s.length; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

console.log(i);

var s = "hello";
var i;
for (i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i);
```
