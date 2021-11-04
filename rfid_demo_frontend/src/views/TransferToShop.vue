<template>
  <div class="wrapper">
    <div>
      <form @submit.prevent="transferToShop">
        <label>Shop:</label>
        <select v-model="shop">
          <option v-for="shop in shops" :value="shop.shop" :key="shop.id">
            {{ shop.value }}
          </option>
        </select>

        <label>Tid:</label>
        <input
          type="text"
          v-model="tid"
          v-on:keydown.enter.prevent="addTid(tid.length)"
        />

        <li v-for="tid in justTids" :key="tid" class="x-pill">
          <span>
            {{ tid }}
          </span>
        </li>

        <div>
          <button type="submit">Transfer to Shop</button>
        </div>
      </form>
    </div>
    <div>
      <div class="card">
        <div class="wrapper1">
          <div class="bold">Name</div>
          <div class="bold">Colour</div>
          <div class="bold">Size</div>
          <div class="bold">Price</div>
          <div class="bold">StyleId</div>
          <div class="bold">Stock</div>
        </div>

        <div v-if="styles.length">
          <div class="wrapper1" v-for="style in styles" :key="style.style">
            <div>{{ style.name }}</div>
            <div>{{ style.colour }}</div>
            <div>{{ style.sz }}</div>
            <div>{{ style.price }}</div>
            <div>{{ style.style }}</div>
            <div>{{ style.stock }}</div>
          </div>
        </div>

        <div v-else>
          <div v-if="transferStyles.length">
            <div v-for="style in transferStyles" :key="style" class="wrapper1">
              <div>{{ style.name }}</div>
              <div>{{ style.colour }}</div>
              <div>{{ style.sz }}</div>
              <div>{{ style.price }}</div>
              <div>{{ style.style }}</div>
              <div>{{ style.stock }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal">
    <Modal :header="header" :text="text" @close="toggleModal">
      <h3>{{ message }}</h3>
    </Modal>
  </div>
</template>

<script>
import Modal from "../components/Modal.vue";

export default {
  data() {
    return {
      shops: [
        { id: 1, value: "Shop 1", shop: "shop1" },
        { id: 2, value: "Shop 2", shop: "shop2" },
      ],
      shop: null,
      justTids: [],
      tempTids: [],
      tid: null,
      lastStyle: null,
      showModal: false,
      message: "Tags transferred to shop",
      styleAmount: [],
      styles: [],
    };
  },
  components: { Modal },

  mounted() {
    this.$store.dispatch("getTids");
    this.$store.dispatch("getOngoingShops");
    // this.$store.dispatch("getAllStock");
  },

  computed: {
    tids: {
      get() {
        return this.$store.getters.allTids;
      },
    },

    ongoingShops: {
      get() {
        return this.$store.getters.ongoingShops;
      },
    },

    // allStock: {
    //   get() {
    //     return this.$store.getters.allStock;
    //   },
    // },

    transferStyles: {
      get() {
        return this.$store.getters.transferStyles;
      },
    },
  },

  methods: {
    addTid(tidLength) {
      if (this.tid) {
        if (tidLength === 24) {
          this.tids.filter((tid) => {
            if (tid.tid == this.tid) {
              console.log(tid);
              if (
                !this.justTids.includes(this.tid) &&
                !this.ongoingShops.includes(this.tid)
              ) {
                this.justTids.push(this.tid);
                this.tempTids.push(tid);
                if (this.styles.length) {
                  let match = false;
                  this.styles.filter((style) => {
                    if (tid.style == style.style) {
                      match = true;
                    }
                  });
                  if (match == false) {
                    // this.allStock.filter((stock) => {
                    //   if (tid.style == stock.style) {
                    //     this.styles.push({
                    //       name: tid.name,
                    //       colour: tid.colour,
                    //       sz: tid.sz,
                    //       price: tid.price,
                    //       style: tid.style,
                    //       stock: stock.stock,
                    //     });
                    //   }
                    // });
                    this.styles.push({
                          name: tid.name,
                          colour: tid.colour,
                          sz: tid.sz,
                          price: tid.price,
                          style: tid.style,
                          stock: tid.stock,
                        });
                  }
                } else {
                  // this.allStock.filter((stock) => {
                  //   if (tid.style == stock.style) {
                  //     this.styles.push({
                  //       name: tid.name,
                  //       colour: tid.colour,
                  //       sz: tid.sz,
                  //       price: tid.price,
                  //       style: tid.style,
                  //       stock: stock.stock,
                  //     });
                  //   }
                  // });

                  this.styles.push({
                          name: tid.name,
                          colour: tid.colour,
                          sz: tid.sz,
                          price: tid.price,
                          style: tid.style,
                          stock: tid.stock,
                        });
                }

                if (this.styleAmount.length) {
                  this.styleAmount.filter((style) => {
                    if (style.style == tid.style) {
                      style.stock--;
                    } else {
                      // this.allStock.filter((stock) => {
                      //   if (stock.style == tid.style) {
                      //     let amount = stock.stock - 1;
                      //     this.styleAmount.push({
                      //       stock: amount,
                      //       style: stock.style,
                      //     });
                      //   }
                      // });
                      let amount = tid.stock - 1;
                          this.styleAmount.push({
                            stock: amount,
                            style: tid.style,
                          });
                    }
                  });
                } else {
                  // this.allStock.filter((stock) => {
                  //   if (stock.style == tid.style) {
                  //     let amount = stock.stock - 1;
                  //     this.styleAmount.push({
                  //       stock: amount,
                  //       style: stock.style,
                  //     });
                  //   }
                  // });

                  let amount = tid.stock - 1;
                      this.styleAmount.push({
                        stock: amount,
                        style: tid.style,
                      });
                }
              }
            }
          });
        }
      }

      this.tid = null;
    },

    transferToShop() {
      if (this.shop && this.tempTids) {
        const data = {
          tidsArray: this.tempTids,
          shop: this.shop,
          styleAmount: this.styleAmount,
          transferStyles: this.styles,
        };
        this.$store.dispatch("registerTidsToOngoingShop", data);
        this.showModal = true;
      }
    },

    toggleModal() {
      this.showModal = false;
      window.location.reload();
    },
  },
};
</script>
