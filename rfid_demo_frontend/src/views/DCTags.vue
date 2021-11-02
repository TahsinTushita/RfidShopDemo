
<template>
  <form @submit.prevent="registerTags">

    <label>Style:</label>
    <select v-model="style">
      <option v-for="style in styles" :value="style" :key="style.id">
        {{ style.style }}
      </option>
    </select>

    <label>Tid:</label>
    <input type="text" v-model="tid" v-on:keydown.enter.prevent="addTid(tid.length)" />

    <li v-for="tid in tempTids" :key="tid" class="x-pill">
      <span @click="deleteTid(tid)">
        {{ tid }}
      </span>
    </li>

    <div >
      <button type="submit">Regiter Tags</button>
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
  name: "DCTags",
  components:{ Modal },
  data() {
    return {
      regTids: [],
      tid: null,
      tempTids: [],
      style: null,
      values: [],
      message: "Tags registered",
      showModal: false
    };
  },

  mounted() {
    this.$store.dispatch('getStyles')
    this.$store.dispatch('getTids')
  },

  computed: {
      styles: {
          get() {
            return this.$store.getters.allStyles
          }
      },

      tids: {
        get() {
          return this.$store.getters.justTids
        }
      }
  },

  methods: {

    addTid(tidLength) {
      if (this.tid) {
        if (!this.tempTids.includes(this.tid) && !this.tids.includes(this.tid)) {
          console.log(tidLength);
          console.log(this.tid);
          if (tidLength === 24) {
            this.tempTids.push(this.tid);
          }
        }

        this.tid = "";
      }
    },

    deleteTid(tid) {
      this.tempTids = this.tempTids.filter((item) => {
        return tid !== item;
      });
    },

    registerTags() {
      if(this.tempTids.length && this.style) {
        const stock = this.style.stock + this.tempTids.length
        const data = {tidsArray: this.tempTids, style: this.style.style, name: this.style.name, colour: this.style.colour, sz: this.style.sz, price: this.style.price, stock: stock}
        this.$store.dispatch('registerTids', data)
        this.showModal = true
      }
      
    },

    toggleModal() {
      this.showModal = false
      window.location.reload()
    }
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 3px 6px gray;
  border: 1px solid gray;
}

label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

input,
select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  background: white;
}

input[type="checkbox"] {
  display: inline-block;
  width: 16px;
  margin: 0 10px 0 0;
  position: relative;
  top: 2px;
}

input, select:focus {
  outline: none;
}

.pill {
  display: inline-block;
  margin: 20px 10px 0 0;
  padding: 6px 12px;
  background: #eee;
  border-radius: 20px;
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #777;
  cursor: pointer;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}

button:disabled {
  background: gray;
}

.submit {
  text-align: center;
}

</style>

