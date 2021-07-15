<template>
  <div id="app">
    <OrdersTable v-on:triggerInfo="triggerInfo" />
    <div v-if="isPopUp">
      <PopUp v-bind:id="id" />
    </div>
  </div>
</template>

<script>
import OrdersTable from "./components/OrdersTable.vue";
import PopUp from "./components/PopUp/PopUp.vue";

export default {
  name: "App",
  components: {
    OrdersTable,
    PopUp,
  },
  data() {
    return {
      id: -1,
      isPopUp: false,
    };
  },
  methods: {
    triggerInfo(id) {
      console.log("App: ", id);
      this.id = id;
      this.isPopUp = true;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
