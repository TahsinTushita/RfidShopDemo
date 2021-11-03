import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
// import path from "path";
// import axios from "axios";
// require("dotenv").config({
//   path: path.resolve(__dirname, "../.env"),
// });

// const baseURL = process.env.baseURL;
// if (typeof baseURL !== "undefined") {
//   Vue.axios.defaults.baseURL = baseURL;
// }

createApp(App).use(store).use(router).mount("#app");
