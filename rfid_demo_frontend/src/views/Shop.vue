<template>
  <div class="wrapper">
    <div>
      <form @submit.prevent="sellProduct">
        <label>Tid:</label>
        <input
          type="text"
          v-model="tid"
          v-on:keydown.enter.prevent="addTid(tid.length)"
        />

        <li class="space-y-2">
          <ul>
            Tid:{{
              tempTid
            }}
          </ul>
          <ul>
            Name:{{
              name
            }}
          </ul>
          <ul>
            Colour:{{
              colour
            }}
          </ul>
          <ul>
            Style:{{
              style
            }}
          </ul>
          <ul>
            Size:{{
              size
            }}
          </ul>
          <ul>
            Price:{{
              price
            }}
          </ul>
        </li>

        <div>
          <button type="submit">Sell</button>
        </div>
      </form>
    </div>

    <div>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th class="w-1/5 px-4 py-4 text-center">Name</th>
              <th class="w-1/5 px-4 py-4 text-center">Colour</th>
              <th class="w-1/5 px-4 py-4 text-center">Size</th>
              <th class="w-1/5 px-4 py-4 text-center">Price</th>
              <th class="w-1/5 px-4 py-4 text-center">StyleID</th>
              <th class="w-1/5 px-4 py-4 text-center">Tid</th>
            </tr>
          </thead>
          <tbody v-if="shop1Tids.length">
            <tr
              v-for="shopTid in shop1Tids"
              :key="shopTid.tid"
              :class="getClassColour(shopTid.selected)"
            >
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.name }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.colour }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.sz }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.price }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.style }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ shopTid.tid }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div v-if="sold" class="card1">
    <h1 class="text-lg">Product Sold!</h1>
    <li class="space-y-2">
      <ul>
        Tid:{{
          tempTid
        }}
      </ul>
      <ul>
        Name:{{
          name
        }}
      </ul>
      <ul>
        Colour:{{
          colour
        }}
      </ul>
      <ul>
        Style:{{
          style
        }}
      </ul>
      <ul>
        Size:{{
          size
        }}
      </ul>
      <ul>
        Price:{{
          price
        }}
      </ul>
    </li>
  </div>

  <!-- <div v-if="showModal">
    <Modal :header="header" :text="text" @close="toggleModal">
      <h3>{{ message }}</h3>
    </Modal>
  </div> -->
</template>

<script>
// import Modal from "../components/Modal.vue";

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
      sold: false,
    };
  },
  // components: { Modal },

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
              item.selected = true;
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
        this.sold = true;
      }
    },

    toggleModal() {
      this.showModal = false;
      window.location.reload();
    },

    getClassColour(selected) {
      if (selected == true) {
        return "bg-green-200";
      }
    },
  },
};
</script>

<style></style>
