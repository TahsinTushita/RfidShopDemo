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
    shopTids: [],
    shop1Tids: [],
    stockByStyles: [],
    allStock: [],
    tagStyle: null,
    transferStyles: [],
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

    SET_SHOP_TIDS(state, shopTids) {
      state.shopTids = shopTids;
    },

    SET_SHOP_TIDS_TO_NULL(state) {
      state.shopTids = [];
    },

    SET_SHOP1_TIDS(state, shop1Tids) {
      state.shop1Tids = shop1Tids;
    },

    SET_STOCK_BY_STYLES(state, stockByStyles) {
      state.stockByStyles = stockByStyles;
    },

    SET_ALL_STOCK(state, allStock) {
      state.allStock = allStock;
    },

    SET_TAG_STYLE(state, tagStyle) {
      state.tagStyle = tagStyle;
    },

    SET_TRANSFER_STYLES(state, transferStyles) {
      state.transferStyles = transferStyles;
    },
  },
  actions: {
    getStyles({ commit }) {
      axios.get("/dc_inventory").then((res) => {
        commit("SET_STYLES", res.data);
        const tagStyle = JSON.parse(localStorage.getItem("tagStyle"));
        commit("SET_TAG_STYLE", tagStyle);
        console.log(res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    getStockByStyles({ commit }, styles) {
      axios.get("/dc_inventory/getStockByStyles", styles).then((res) => {
        console.log(res.data);
        commit("SET_STOCK_BY_STYLES", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    getProductByStyle({ commit }, style) {
      axios.get("/dc_inventory/getByStyle/" + style).then((res) => {
        console.log(res.data);
        const transferStyles = this.getters.transferStyles;
        transferStyles.push(res.data);
        commit("SET_TRANSFER_STYLES", transferStyles);
      });
    },

    getTids({ commit }) {
      axios.get("/dc_tags").then((res) => {
        // commit("SET_TIDS", res.data);
        const justTids = [];
        // const styles = [];
        let lastTidId = 0;

        for (const tid of res.data) {
          justTids.push(tid.tid);
          // if (!styles.includes(tid.style)) {
          //   styles.push(tid.style);
          // }
          if (tid.id > lastTidId) {
            lastTidId = tid.id;
          }
        }

        // console.log("styless:    ", styles);

        commit("SET_JUST_TIDS", justTids);
        commit("SET_TIDS", res.data);
        commit("SET_LAST_TID_ID", lastTidId);
        // this.dispatch("getStockByStyles", styles);
      }),
        (error) => {
          console.log(error);
        };
    },

    getAllStock({ commit }) {
      axios.get("/dc_inventory/allStock").then((res) => {
        console.log(res.data);
        commit("SET_ALL_STOCK", res.data);
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
      const tagStyle = data.tagStyle;
      const payload = { stock: stock, style: style };
      for (const item of data.tidsArray) {
        values.push([tidId, item, style, name, colour, sz, price]);
        tidId++;
      }

      axios.post("/dc_tags/bulkCreate", values).then((res) => {
        console.log(res);
        this.dispatch("getTids");
        this.dispatch("updateStyleStock", payload);
        localStorage.setItem("tagStyle", JSON.stringify(tagStyle));
      }),
        (error) => {
          console.log(error);
        };
    },

    registerTidsToOngoingShop({ commit }, data) {
      const values = [];
      // const style = data.style;
      // const amount = data.amount;
      const shop = data.shop;
      const styleAmount = data.styleAmount;
      const transferStyles = data.transferStyles;
      // const stock = this.getters.stock[0].stock;
      // const total = stock - amount;
      // console.log(
      //   "amount: " + amount + "   stock: " + stock + "  total: " + total
      // );
      // const payload = { stock: total, style: style };

      for (const item of data.tidsArray) {
        values.push([
          shop,
          item.tid,
          item.style,
          item.name,
          item.colour,
          item.sz,
          item.price,
        ]);
      }

      axios.post("/ongoing_to_shop/bulkCreate", values).then((res) => {
        console.log(res.data);
        for (let style of styleAmount) {
          this.dispatch("updateStyleStock", style);
        }

        for (let tr of transferStyles) {
          for (let st of styleAmount) {
            if (tr.style == st.style) {
              tr.stock = st.stock;
            }
          }
        }

        localStorage.setItem("transferStyles", JSON.stringify(transferStyles));
        // this.dispatch("updateStyleStock", payload);
        // commit("SET_STOCK_TO_NULL");
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
        const ongoingShopsTids = [];
        for (let item of res.data) {
          ongoingShopsTids.push(item.tid);
        }

        commit("SET_ONGOING_SHOPS", ongoingShopsTids);
        const transferStyles = JSON.parse(
          localStorage.getItem("transferStyles")
        );
        commit("SET_TRANSFER_STYLES", transferStyles);
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

    getFromShop({ commit }, shop) {
      axios.get("/ongoing_to_shop/" + shop).then((res) => {
        console.log(res.data);
        commit("SET_SHOP_TIDS", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteFromShop({ commit }, shop) {
      axios.delete("/ongoing_to_shop/deleteFromShop/" + shop).then((res) => {
        console.log(res.data);
        commit("SET_SHOP_TIDS_TO_NULL");
      }),
        (error) => {
          console.log(error);
        };
    },

    registerTidsToShop1({ commit }, data) {
      const values = [];
      const shop = "shop1";

      for (const item of data) {
        values.push([
          item.tid,
          item.style,
          item.name,
          item.colour,
          item.sz,
          item.price,
        ]);
      }

      axios.post("/shop1/bulkCreate", values).then((res) => {
        console.log(res);
        this.dispatch("deleteFromShop", shop);
      }),
        (error) => {
          console.log(error);
        };
    },

    getTidsFromShop1({ commit }) {
      axios.get("/shop1").then((res) => {
        console.log(res.data);
        commit("SET_SHOP1_TIDS", res.data);
      }),
        (error) => {
          console.log(error);
        };
    },

    deleteTidFromShop1({ commit }, tid) {
      axios.delete("/shop1/delete/" + tid).then((res) => {
        console.log(res.data);
        this.dispatch("deleteFromDcTags", tid);
        this.dispatch("getTidsFromShop1");
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

    shopTids: (state) => {
      return state.shopTids;
    },

    shop1Tids: (state) => {
      return state.shop1Tids;
    },

    allStock: (state) => {
      return state.allStock;
    },

    tagStyle: (state) => {
      return state.tagStyle;
    },

    transferStyles: (state) => {
      return state.transferStyles;
    },
  },

  modules: {},
});
