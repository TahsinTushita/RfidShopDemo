<template>
  <div id="nav">
    <router-link to="/">DC Styles</router-link> |
    <router-link to="/dcTags">DC Tags</router-link> |
    <router-link to="/transferToShop">Ongoing To Shop</router-link> |
    <router-link to="/shop1">Shop 1</router-link> |
    <router-link to="/shop">Shop</router-link>
  </div>
  <router-view />
</template>

<script>
import "./assets/tailwind.css"

export default {
  
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
