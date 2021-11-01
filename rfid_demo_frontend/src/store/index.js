import { createStore } from "vuex";
import axios from "axios";
// import path from "path";
// require("dotenv").config({
//   path: path.resolve(__dirname, "../../.env"),
// });

axios.defaults.baseURL = "http://localhost:3000";

export default createStore({
  state: {
    styles: [],
    tids: [],
    justTids: [],
    lastTidId: null,
    stock: null,
    ongoingShops: [],
  },
  mutations: {
    SET_STYLES(state, styles) {
      state.styles = styles;
    },

    SET_TIDS(state, tids) {
      state.tids = tids;
    },

    SET_JUST_TIDS(state, justTids) {
      state.justTids = justTids;
    },

    SET_LAST_TID_ID(state, lastTidId) {
      state.lastTidId = lastTidId;
    },

    SET_STOCK(state, stock) {
      state.stock = stock;
    },

    SET_STOCK_TO_NULL(state) {
      state.stock = null;
    },

    SET_ONGOING_SHOPS(state, ongoingShops) {
      state.ongoingShops = ongoingShops;
    },
  },
  actions: {
    getStyles({ commit }) {
      axios.get("/dc_inventory").then((res) => {
        commit("SET_STYLES", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    getTids({ commit }) {
      axios.get("/dc_tags").then((res) => {
        // commit("SET_TIDS", res.data);
        const justTids = [];
        let lastTidId = 0;

        for (const tid of res.data) {
          justTids.push(tid.tid);
          if (tid.id > lastTidId) {
            lastTidId = tid.id;
          }
        }

        commit("SET_JUST_TIDS", justTids);
        commit("SET_TIDS", res.data);
        commit("SET_LAST_TID_ID", lastTidId);
      }),
        (error) => {
          console.log(error);
        };
    },

    createStyle({ commit }, data) {
      axios.post("/dc_inventory/create", data).then((res) => {
        console.log(res.data);
        this.dispatch("getStyles");
      }),
        (error) => {
          console.log(error);
        };
    },

    updateStyleStock({ commit }, data) {
      axios.put("/dc_inventory/update", data).then((res) => {
        console.log(res.data);
        this.dispatch("getStyles");
      }),
        (error) => {
          console.log(error);
        };
    },

    registerTids({ commit }, data) {
      const values = [];
      let tidId = this.getters.lastTidId + 1;
      const style = data.style;
      const name = data.name;
      const colour = data.colour;
      const sz = data.sz;
      const price = data.price;
      const stock = data.stock;
      const payload = { stock: stock, style: style };
      for (const item of data.tidsArray) {
        values.push([tidId, item, style, name, colour, sz, price]);
        tidId++;
      }

      axios.post("/dc_tags/bulkCreate", values).then((res) => {
        console.log(res);
        this.dispatch("getTids");
        this.dispatch("updateStyleStock", payload);
      }),
        (error) => {
          console.log(error);
        };
    },

    registerTidsToOngoingShop({ commit }, data) {
      const values = [];
      const style = data.style;
      const amount = data.amount;
      const shop = data.shop;
      const stock = this.getters.stock[0].stock;
      const total = stock - amount;
      console.log(
        "amount: " + amount + "   stock: " + stock + "  total: " + total
      );
      const payload = { stock: total, style: style };

      for (const item of data.tidsArray) {
        values.push([
          shop,
          item.tid,
          style,
          item.name,
          item.colour,
          item.sz,
          item.price,
        ]);
      }

      axios.post("/ongoing_to_shop/bulkCreate", values).then((res) => {
        console.log(res.data);
        this.dispatch("updateStyleStock", payload);
        commit("SET_STOCK_TO_NULL");
      }),
        (error) => {
          console.log(error);
        };
    },

    getStock({ commit }, style) {
      axios.get("/dc_inventory/getStock/" + style).then((res) => {
        console.log(res.data);
        commit("SET_STOCK", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    getOngoingShops({ commit }) {
      axios.get("/ongoing_to_shop").then((res) => {
        commit("SET_ONGOING_SHOPS", res.data);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    setStockToNull({ commit }) {
      commit("SET_STOCK_TO_NULL");
    },

    deleteStyle({ commit }, style) {
      axios.delete("/dc_inventory/delete/" + style).then((res) => {
        console.log(res.data);
        this.dispatch("getStyles");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteFromDcTags({ commit }, tid) {
      axios.delete("/dc_tags/delete/" + tid).then((res) => {
        console.log(res.data);
        this.dispatch("getTids");
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteFromOngoingShop({ commit }, tid) {
      axios.delete("/ongoing_to_shop/delete/" + tid).then((res) => {
        console.log(res.data);
        this.dispatch("getOngoingShops");
        this.dispatch("deleteFromDcTags", tid);
      }),
        (error) => {
          console.log(error);
        };
    },
  },

  getters: {
    allStyles: (state) => {
      return state.styles;
    },

    allTids: (state) => {
      return state.tids;
    },

    justTids: (state) => {
      return state.justTids;
    },

    lastTidId: (state) => {
      return state.lastTidId;
    },

    stock: (state) => {
      return state.stock;
    },

    ongoingShops: (state) => {
      return state.ongoingShops;
    },
  },

  modules: {},
});
