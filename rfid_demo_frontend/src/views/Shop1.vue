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
          <div v-if="shopTids.length">
        <table>
          <thead>
            <tr class="bg-gray-200">
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Name</th>
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Colour</th>
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Size</th>
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Price</th>
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Style</th>
                <th class="w-1/5 px-4 py-4 text-center border border-gray-400">Tid</th>
            </tr>
          </thead>
            <tbody>
                <tr v-for="tempTid in tempTids" :key="tempTid.tid" :class="getClassColour(tempTid.recieved)">
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.name }}</td>
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.colour }}</td>
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.sz }}</td>
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.price }}</td>
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.style }}</td>
                    <td class="w-1/5 px-4 py-4 text-center border border-gray-400">{{ tempTid.tid }}</td>
                </tr>
            </tbody>
        </table>
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
      tid: null,
      justTids: [],
      tempTids: [],
      shop: "shop1",
      btnDisabled: true,
      showModal: false,
      message: "Tags recieved in Shop 1",
    };
  },

  components: { Modal },

  mounted() {
    this.$store.dispatch("getFromShop", this.shop);
    this.setShopTidsToTempTids()
  },

  computed: {
    shopTids: {
      get() {
        return this.$store.getters.shopTids;
      },
    },
    
    shopToTempTids() {
        return this.setShopTidsToTempTids(this.shopTids)
    }
  },

  methods: {
    addTid(tidLength) {
      if (tidLength === 24 && !this.justTids.includes(this.tid)) {
        this.shopTids.filter((shopTid) => {
          if (shopTid.tid == this.tid) {
            this.justTids.push(this.tid);
            this.tempTids.filter(temp => {
                if(this.tid == temp.tid) {
                    temp.recieved = true
                }
            })
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

    setShopTidsToTempTids() {
        if(this.shopTids) {
            for(let item of this.shopTids) {
                this.tempTids.push({name: item.name, colour: item.colour, style: item.style,
                 sz: item.sz, price: item.price, tid: item.tid, recieved: false})
            }
        }
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
