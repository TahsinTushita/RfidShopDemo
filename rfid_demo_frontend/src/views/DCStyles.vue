<template>
  <div class="wrapper">
    <div>
      <form>
        <label>Name:</label>
        <input type="text" required v-model="name" />

        <label>Colour:</label>
        <input type="text" required v-model="colour" />

        <label>Size:</label>
        <input type="text" required v-model="sz" />

        <label>Price:</label>
        <input type="number" required v-model="price" />

        <label>Style:</label>
        <input type="text" required v-model="style" />

        <div class="submit">
          <button @click="createStyle">Create Style</button>
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

        <div class="wrapper1" v-for="style in styles" :key="style.id">
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
</template>

<script>

export default {
  data() {
    return {
      name: null,
      colour: null,
      sz: null,
      price: null,
      style: null,
      stock: 0,
    };
  },

  computed: {
    styles: {
      get() {
        return this.$store.getters.allStyles;
      },
    },
  },

  mounted() {
    this.$store.dispatch("getStyles");
  },

  methods: {
    createStyle() {
      if (this.style && this.name && this.colour && this.sz && this.price) {
        const data = {
          style: this.style,
          stock: this.stock,
          name: this.name,
          colour: this.colour,
          sz: this.sz,
          price: this.price,
        };
        this.$store.dispatch("createStyle", data);
        this.style = null;
        this.name = null;
        this.colour = null;
        this.sz = null;
        this.price = null;
      }
    },
  },
};
</script>
