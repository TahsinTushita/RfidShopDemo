<template>
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