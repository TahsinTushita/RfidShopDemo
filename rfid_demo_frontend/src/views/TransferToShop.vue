<template>
  <form @submit.prevent="transferToShop">

    <label>Shop:</label>
    <select v-model="shop">
      <option v-for="shop in shops" :value="shop.shop" :key="shop.id">
        {{ shop.value }}
      </option>
    </select>

    <label>Tid:</label>
    <input type="text" v-model="tid" v-on:keydown.enter.prevent="addTid(tid.length)" />

    <li v-for="tid in justTids" :key="tid" class="x-pill">
      <span>
        {{ tid }}
      </span>
    </li>

    <div >
      <button type="submit">Transfer to Shop</button>
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
      shops: [{id: 1, value: "Shop 1", shop: "shop1"},
            {id: 2, value: "Shop 2", shop: "shop2"}],
      shop: null,
      justTids: [],
      tempTids: [],
      tid: null,
      lastStyle: null,
      showModal: false,
      message: "Tags transferred to shop"
    };
  },
  components: { Modal },

  mounted() {
    this.$store.dispatch('getTids')
    this.$store.dispatch('getOngoingShops')
  },

  computed: {
      tids: {
        get() {
          return this.$store.getters.allTids
        }
      },

      ongoingShops: {
          get() {
              return this.$store.getters.ongoingShops
          }
      }
  },

  methods: {

      addTid(tidLength) {
          if(this.tid) {
              if(tidLength === 24) {
                  this.tids.filter(tid => {
                      if(tid.tid == this.tid) {
                          console.log(tid)
                          if(this.lastStyle) {
                              if(tid.style === this.lastStyle) {
                                if(!this.justTids.includes(this.tid) && !this.ongoingShops.includes(this.tid)) {
                                    this.justTids.push(this.tid)
                                    this.tempTids.push(tid)
                                }
                              }
                          }

                          else {
                              this.lastStyle = tid.style
                              this.$store.dispatch('getStock', tid.style)

                              if(!this.justTids.includes(this.tid)) {
                                    this.justTids.push(this.tid)
                                    this.tempTids.push(tid)
                              }
                          }

                      }
                  })
              }
          }

          this.tid = null
      },

    transferToShop() {
        if(this.shop && this.tempTids) {
            console.log(this.$store.getters.stock)
            const data = { tidsArray: this.tempTids, style: this.lastStyle, amount: this.tempTids.length, shop: this.shop }
            this.$store.dispatch('registerTidsToOngoingShop', data)
            this.showModal = true
        }

        // alert("transferring")
    },

    toggleModal() {
        this.showModal = false
        window.location.reload()
    }
  }
}
</script>