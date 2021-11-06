<template>
  <div class="wrapper">
    <div>
      <form @submit.prevent="reciveTagsInShop">
        <label>Tid:</label>
        <input
          type="text"
          v-model="tid"
          v-on:keydown.enter.prevent="addTid(tid.length)"
        />

        <div v-if="justTids.length">
          <span>Recieved: {{ justTids.length }} / {{ shopTids.length }}</span>
        </div>

        <div>
          <button type="submit" :disabled="btnDisabled">Recieve</button>
        </div>
      </form>
    </div>
    <div>
      <div class="card">
          <!-- <div v-if="shopTids.length"> -->
        <table>
          <thead>
            <tr>
                <th class="w-1/5 px-4 py-4 text-center ">Name</th>
                <th class="w-1/5 px-4 py-4 text-center ">Colour</th>
                <th class="w-1/5 px-4 py-4 text-center ">Size</th>
                <th class="w-1/5 px-4 py-4 text-center ">Price</th>
                <th class="w-1/5 px-4 py-4 text-center ">StyleID</th>
                <th class="w-1/5 px-4 py-4 text-center ">Tid</th>
            </tr>
          </thead>
            <tbody v-if="shopTids.length">
                <tr v-for="shopTid in shopTids" :key="shopTid.tid" :class="getClassColour(shopTid.recieved)">
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.name }}</td>
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.colour }}</td>
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.sz }}</td>
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.price }}</td>
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.style }}</td>
                    <td class="w-1/5 px-4 py-4 text-center ">{{ shopTid.tid }}</td>
                </tr>
            </tbody>
        </table>
          <!-- </div> -->
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
      tid: null,
      justTids: [],
      shop: "shop1",
      btnDisabled: true,
      showModal: false,
      message: "Tags recieved in Shop 1",
    };
  },

  components: { Modal },

  mounted() {
    this.$store.dispatch("getFromShop", this.shop);
  },

  computed: {
    shopTids: {
      get() {
        return this.$store.getters.shopTids;
      },
    },
  },

  methods: {
    addTid(tidLength) {
      if (tidLength === 24 && !this.justTids.includes(this.tid)) {
        this.shopTids.filter((shopTid) => {
          if (shopTid.tid == this.tid) {
            this.justTids.push(this.tid);
            shopTid.recieved = true;
          }
        });
      }
      if (this.justTids.length === this.shopTids.length) {
        this.btnDisabled = false;
      }

      this.tid = null;
    },

    toggleModal() {
      this.shopModal = false;
      window.location.reload();
    },

    reciveTagsInShop() {
      this.$store.dispatch("registerTidsToShop1", this.shopTids);
      this.showModal = true;
    },

    getClassColour(recieved) {
        if(recieved == false) {
            return "bg-red-200"
        }
        else {
            return "bg-green-200"
        }
    }
  },
};
</script>

<style></style>
