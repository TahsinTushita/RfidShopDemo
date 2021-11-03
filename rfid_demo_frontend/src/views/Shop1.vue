<template>
  <div class="wrapper">
      <div>
          <form @submit.prevent="reciveTagsInShop">
        <label>Tid:</label>
        <input type="text" v-model="tid" v-on:keydown.enter.prevent="addTid(tid.length)" />

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
            <!-- <div class="wrapper1">
                <div class="bold">Name</div>
                <div class="bold">Colour</div>
                <div class="bold">Size</div>
                <div class="bold">Price</div>
                <div class="bold">StyleId</div>
                <div class="bold">Tid</div>
            </div> -->
            <table>
                <tr>
                    <th colspan="3">Name</th>
                    <th colspan="1">Colour</th>
                    <th colspan="1">Size</th>
                    <th colspan="1">Price</th>
                    <th colspan="2">Style</th>
                    <th colspan="4">Tid</th>
                </tr>
                <div v-if="shopTids.length">
                    <tr v-for="shopTid in shopTids" :key="shopTid.tid">
                        <td colspan="3">{{ shopTid.name }}</td>
                        <td colspan="1">{{ shopTid.colour }}</td>
                        <td colspan="1">{{ shopTid.sz }}</td>
                        <td colspan="1">{{ shopTid.price }}</td>
                        <td colspan="2">{{ shopTid.style }}</td>
                        <td colspan="4">{{ shopTid.tid }}</td>
                    </tr>
                </div>
            </table>

            <!-- <div v-if="shopTids.length">
                <div class="wrapper1" v-for="shopTid in shopTids" :key="shopTid.tid">
                    <div>{{ shopTid.name }}</div>
                    <div>{{ shopTid.colour }}</div>
                    <div>{{ shopTid.sz }}</div>
                    <div>{{ shopTid.price }}</div>
                    <div>{{ shopTid.style }}</div>
                    <div>{{ shopTid.tid }}</div>
                </div>
            </div> -->
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
import Modal from "../components/Modal.vue"

export default {
    data() {
        return {
            tid: null,
            justTids: [],
            tempTids: null,
            shop: "shop1",
            btnDisabled: true,
            showModal: false,
            message: "Tags recieved in Shop 1"
        };
    },

    components: { Modal },
    
    mounted() {
        this.$store.dispatch('getFromShop', this.shop);
    },

    computed: {
        shopTids: {
            get() {
                return this.$store.getters.shopTids
            }
        }
    },

    methods: {
        addTid(tidLength) {
            if(tidLength === 24 && !this.justTids.includes(this.tid)) {
                this.shopTids.filter(shopTid => {
                    if(shopTid.tid == this.tid) {
                        this.justTids.push(this.tid);
                    }
                })
            }
            if(this.justTids.length === this.shopTids.length) {
                this.btnDisabled = false
            }

            this.tid = null
        },

        toggleModal() {
            this.shopModal = false
            window.location.reload()
        },

        reciveTagsInShop() {
            this.$store.dispatch('registerTidsToShop1', this.shopTids)
            this.showModal = true
        }
    }
}
</script>

<style>

</style>