import { createApp } from "vue";
import router from "./router/index.js";
import store from "./store/index.js";
import App from "./App.vue";

createApp(App).use(router).use(store).mount("#app"); //创建vue应用，使用路由，使用store，挂载dom节点上
