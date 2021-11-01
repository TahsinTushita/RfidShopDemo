<template>
  <form>
    <label>Name:</label>
    <input type="text" required v-model="name"/>

    <label>Colour:</label>
    <input type="text" required v-model="colour"/>

    <label>Size:</label>
    <input type="text" required v-model="sz"/>

    <label>Price:</label>
    <input type="number" required v-model="price"/>

    <label>Style:</label>
    <input type="text" required v-model="style"/>

    <div class="submit">
      <button @click="createStyle">Create Style</button>
    </div>
  </form>
</template>

<script>

export default {

  data () {
   return {
     name: null,
     colour: null,
     sz: null,
     price: null,
     style: null,
     stock: 0
   }; 
  },

  computed: {
    styles: {
      get() {
        return this.$store.getters.allStyles
      }
    }
  },

  mounted() {
    this.$store.dispatch('getStyles')
  },

  methods: {
    createStyle() {
      if(this.style && this.name && this.colour && this.sz && this.price) {
        const data = { style: this.style, stock: this.stock, name: this.name, colour: this.colour, sz: this.sz, price: this.price }
        this.$store.dispatch('createStyle', data)
        this.style = null
        this.name = null
        this.colour = null
        this.sz = null
        this.price = null
      }
    }
  }

};

</script>
