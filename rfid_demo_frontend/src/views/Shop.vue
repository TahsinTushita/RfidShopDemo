<template>
  <form @submit.prevent="sellProduct">
    <label>Tid:</label>
    <input
      type="text"
      v-model="tid"
      v-on:keydown.enter.prevent="addTid(tid.length)"
    />

    <li class="x-pill">
      <ul>
        Tid:
        {{
          tempTid
        }}
      </ul>
      <ul>
        Name:
        {{
          name
        }}
      </ul>
      <ul>
        Colour:
        {{
          colour
        }}
      </ul>
      <ul>
        Style:
        {{
          style
        }}
      </ul>
      <ul>
        Size:
        {{
          size
        }}
      </ul>
      <ul>
        Price:
        {{
          price
        }}
      </ul>
    </li>

    <div>
      <button type="submit">Sell</button>
    </div>
  </form>

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
      tid: null,
      name: null,
      colour: null,
      style: null,
      size: null,
      price: null,
      tempTid: null,
      showModal: false,
      message: "Product sold",
      shop: "shop1",
    };
  },
  components: { Modal },

  mounted() {
    this.$store.dispatch("getTidsFromShop1");
  },

  computed: {
    shop1Tids: {
      get() {
        return this.$store.getters.shop1Tids;
      },
    },
  },

  methods: {
    addTid(tidLength) {
      if (this.tid) {
        if (tidLength === 24) {
          this.shop1Tids.filter((item) => {
            if (item.tid == this.tid) {
              this.name = item.name;
              this.colour = item.colour;
              this.style = item.style;
              this.size = item.sz;
              this.price = item.price;
              this.tempTid = this.tid;
            }
          });
        }

        this.tid = null;
      }
    },

    sellProduct() {
      if (this.tempTid) {
        this.$store.dispatch("deleteTidFromShop1", this.tempTid);
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

<style></style>
