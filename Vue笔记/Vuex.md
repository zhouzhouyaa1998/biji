# Vuex

## 安装

使用 npm: `npm install vuex@next --save`

## 使用

### 创建 Store

创建一个新的 store 实例

```js
import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
```

将 store 实例作为插件安装

```js
app.use(store);
```

在组件中使用，通过 $store 来访问对应的属性

```html
<script>
  export default {
    computed: {
      count() {
        // State 会暴露为 store.state
        return this.$store.state.count;
      },
      doubleCount() {
        // Getter 会暴露为 store.getters 对象，可以以属性的形式访问
        return this.$store.getters.doubleCount;
      },
    },
    methods: {
      increment() {
        // 使用 commit 的形式来提交一个变更
        this.$store.commit("increment");
        console.log(this.$store.state.count);
      },
      increment2() {
        // 使用 dispatch 的形式来分发一个动作
        this.$store.dispatch("increment");
        console.log(this.$store.state.count);
      },
    },
  };
</script>
```

- State：存储具体的状态
- Getter：相当于 store 的计算属性
- Mutation：更改 store 中的状态
- Action：提交 mutation，并且可以包含异步操作

## Module

将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

## Vue 生命周期

最常用的: create,mounted

- 生命周期：vue3 中 destory 相关被换成了 mount，组合式 api 中只需要在前面加上 on 就可以，并且 setup 函数代替了 create 和 beforeCreate
  - beforeCreate：在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。插件内部的 instanll 方法通过 Vue.use 方法安装时一般会选在 beforeCreate 这个钩子内执行，vue-router 和 vuex 就是这么干的
  - create：完成数据观测，属性和方法的运算，watch/event 回调，但是还没有挂载，$el还不可用，因此也访问不到$ref
  - beforeMount：挂载之前调用，相关的 render 函数首次被调用，实例已经完成模板编译，把 data 里的数据和模板生成 html，此时还没有挂载到 html 页面上
  - mounted：在 el 被新创建的 vm.$el 替换，并挂载之后调用，此时已经可以拿到具体 dom
  - beforeUpdate：数据更新时调用，发生在虚拟 dom 打 patch 之前，可以在更新前访问先有的 dom
  - updated：在由于数据更改导致的虚拟 dom 重新渲染和打补丁之后调用，调用时 dom 已经更新为最新，应该避免在这时再更改状态
  - beforeUnmount：在卸载组件前调用，实例还是可以正常访问的
  - unmounted：卸载组件实例之后调用，调用时，组件所有的指令都被解除绑定，事件侦听器都被移除，子组件实例也被卸载

## Vue 中的插槽 slot
