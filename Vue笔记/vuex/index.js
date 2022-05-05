// vue中创建store实例对象的方法createStore()按需引入
import { createStore } from "vuex";
//引入user模块
import user from "./user";

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
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      console.log(context);
      console.log(store);
      context.commit("increment");
    },
  },
  modules: {
    user,
  },
});

export default store;
//对store进行暴露
