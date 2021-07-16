<template>
  <div id="app">
    <div v-if="isPopUp">
      <PopUp v-bind:id="id" v-on:closePopUp="closePopUp" v-on:updateOrders="updateOrders" />
    </div>
    <div class="container" v-bind:class="{shadow: isShadow}">
      <OrdersTable v-on:triggerInfo="triggerInfo" v-bind:updTable="updTable" v-on:initUpdTable="initUpdTable"/>
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
      isShadow: false,
      updTable: false,
    };
  },
  methods: {
    closePopUp() {
      this.isPopUp = false;
      this.isShadow = false;
    },
    triggerInfo(id) {
      this.id = id;
      this.isPopUp = true;
      this.isShadow = true;
    },
    updateOrders(){
      console.log("hello from APP")
      this.updTable = true;
    },
    initUpdTable(bool){
      console.log("i have initialized upd");
      this.updTable = bool;
    }
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

.shadow{
  opacity: 0.5;
}
</style>
