# Vue-router

- 是级别，`是指的代码行```是代码块
- 安装：npm install vue-router。关于 npm 它是一个 NodeJS 包管理和分发工具。
- 使用
  - 创建 router 实例
    - 定义路由组件，`import Home from '../views/HomePage.vue'`
      - Home 是给组件的命名，HomePage.vue 是指具体的 vue 的文件。
    - 在 index.js 文件定义一些路由，配置组件和路由的映射关系，`const routes = [{ path: '/', name: 'Home', component: Home } ...]`
    - 创建路由实例并传递 `routes` 配置，`const router = createRouter({history: createWebHashHistory(), routes })`
  - 将 router 实例挂载到 vue 实例中，使用 use
  - 使用路由，`<router-link>`该标签是一个 vue-router 中已经内置的组件，它会被渲染成一个`<a>`标签。`<router-view>`：该标签会根据当前的路径，动态渲染出不同的组件。
    - 在 App.vue 文件 template 标签里写代码`<div><router-link to="/">Go to Home</router-link></div>` `<router-view></router-view>`
- 路由模式：history 和 hash

  - hash 模式是用 createWebHashHistory() 创建的，在 URL 之前使用了一个哈希字符 `#`，通过监听 hash 变化来达到路由跳转
  - 用 createWebHistory() 创建 HTML5 的 history 模式，vue-router 利用 HTML5 的 history api (去掉哈希字符 `#`)

  ```js
  // index.js 文件
  import {
    createRouter,
    //createWebHashHistory,
    createWebHistory,
  } from "vue-router";

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  ```

- 如何进行路由跳转
  - router-link 标签，最主要的属性 to：用于指定跳转的路径
  - 使用代码的形式进行跳转。最常用的是 push，形式有下面三种。还有 go, replace 等
    - `router.push('/xxx')`
    - `router.push({ path: '/xxx' })`
    - `router.push({ name: 'Xxx' })`
    - 带查询参数，结果是 /register?plan=private `router.push({ path: '/register', query: { plan: 'private' } })`
  - 实例（由 Two.vue 跳转到 One.vue 文件）

```js
 // Two.vue 文件
  methods: {
    toOne() {
      this.$router.push({ path: "/One", query: { plan: "id" } });
    },
  },
```

`<n-button @click="toOne">to one</n-button>`

```js
//One.vue文件
created() {
    console.log(this.$route);
    console.log(this.aa);//调用数据
    this.test();//调用方法
  },
```

`<div>{{ $route.query.plan }}</div>`显示传递的参数

- 动态路由，类似 index.js 文件`{ path: '/test/:id', component: Test }` App.vue`<router-link to="/test/123">Go to Test</router-link>` 这种形式，路径参数用冒号 : 表示，像 `/users/johnny` 和 `/users/jolyne` 这样的 URL 都会映射到 User 这个路由
- 路由懒加载：`const Home = () => import('../components/Home.vue')`，也就是只有当路由被访问时采去加载这个组件
  - 也可以这样写

```js
   {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
```

- 嵌套路由，使用路由中的 children 属性

  - 需要修改的文件

  ```js
  // index.js 文件
  {
    path: "/lianxi",
    name: "Lianxi",
    component: Lianxi,
    children: [
    {
      path: "test",
      name: "LianxiTest",
      component: Test,
    },
  ],
  ```

  App.vue`<router-link to="/lianxi/test">Go to Lianxi</router-link>`

  Lianxi.vue`<router-view></router-view>`

- 如何传递参数
  - 通过调用 push 方法时带上 params 或者 query 属性，来传递参数
  - 在到达的路由组件中，使用 $route 属性获取 params 或 query
- 导航守卫

  - 全局路由守卫：router.beforeEach 每一个路由进入前触发。router.afterEach 每一个路由进后前触发。
    - to 是指要跳转到的路由，from 是指从哪个路由要跳转的路由。

  ```js
  router.beforeEach((to, from) => {
    console.log(to);
    if (to.path === "/One") {
      return false;
    }
  });
  ```

  - 组件内路由守卫：beforeRouteEnter 当前路由进入前触发，beforeRouteUpdate 在当前路由改变，但是该组件被复用时调用，beforeRouteLeave 离开当前路由时触发
    - 是在 Xxx.vue 文件里写 beforeRouteEnter。

```js
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    console.log(13123131212);
    next(false);//false是不可跳转到某一个路由
  },
```
