<template>
  <div class="wrapper">
    <div>
      <form @submit.prevent="registerTags">
        <label>Style:</label>
        <select v-model="style">
          <option v-for="style in styles" :value="style" :key="style.id">
            {{ style.style }}
          </option>
        </select>

        <label>Tid:</label>
        <input
          type="text"
          v-model="tid"
          v-on:keydown.enter.prevent="addTid(tid.length)"
        />

        <li v-for="tid in tempTids" :key="tid" class="x-pill">
          <span @click="deleteTid(tid)">
            {{ tid }}
          </span>
        </li>

        <div>
          <button type="submit">Regiter Tags</button>
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
              <th class="w-1/5 px-4 py-4 text-center">Stock</th>
            </tr>
          </thead>
          <tbody v-if="style">
            <tr>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.name }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.colour }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.sz }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.price }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.style }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ style.stock }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-if="tagStyle">
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.name }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.colour }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.sz }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.price }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.style }}</td>
              <td class="w-1/5 px-4 py-4 text-center">{{ tagStyle.stock }}</td>
            </tr>
          </tbody>
        </table>
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
  name: "DCTags",
  components: { Modal },
  data() {
    return {
      tid: null,
      tempTids: [],
      values: [],
      message: "Tags registered",
      showModal: false,
      style: null,
    };
  },

  mounted() {
    this.$store.dispatch("getStyles");
    this.$store.dispatch("getTids");
  },

  computed: {
    styles: {
      get() {
        return this.$store.getters.allStyles;
      },
    },

    tids: {
      get() {
        return this.$store.getters.justTids;
      },
    },

    tagStyle: {
      get() {
        return this.$store.getters.tagStyle;
      },
    },
  },

  methods: {
    addTid(tidLength) {
      if (this.tid) {
        if (
          !this.tempTids.includes(this.tid) &&
          !this.tids.includes(this.tid)
        ) {
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
      if (this.tempTids.length && this.style) {
        const stock = this.style.stock + this.tempTids.length;
        this.style.stock = stock;
        const data = {
          tidsArray: this.tempTids,
          style: this.style.style,
          stock: stock,
          tagStyle: this.style,
        };
        this.$store.dispatch("registerTids", data);
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
  /* color: #aaa; */
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

input,
select:focus {
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

.card {
  max-width: 900px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 3px 6px gray;
  border: 1px solid gray;
}

.card1 {
  max-width: 450px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 3px 6px gray;
  border: 1px solid gray;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.wrapper > div {
  flex: 1 1 150px;
  height: 500px;
  margin: 10px;
  padding: 10px;
}

.wrapper1 {
  display: flex;
  flex-wrap: wrap;
}

.wrapper1 > div {
  flex: 1 1 50px;
  height: 10px;
  margin: 10px;
  padding: 10px;
}

.bold {
  font-weight: bold;
}
</style>
