<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Ciudad</th>
          <th>País</th>
          <th>
            <select class="ui dropdown">
              <option value="" @click="filterByStatus(status[2].name)">Estado ({{status[2].name}})</option>
              <option value="1" @click="getAllOrders()">Todos los Estados</option>
              <option value="2" @click="filterByStatus(status[0].name)">Estado ({{ status[0].name }})</option>
              <option value="3" @click="filterByStatus(status[1].name)">Estado ({{ status[1].name }})</option>
              <option value="4" @click="filterByStatus(status[3].name)">Estado ({{ status[3].name }})</option>
              <option value="5" @click="filterByStatus(status[4].name)">Estado ({{ status[4].name }})</option>
              <option value="6" @click="filterByStatus(status[5].name)">Estado ({{ status[5].name }})</option>
              <option value="7" @click="filterByStatus(status[6].name)">Estado ({{ status[6].name }})</option>
              <option value="8" @click="filterByStatus(status[7].name)">Estado ({{ status[7].name }})</option>
            </select>
          </th>
          <th>+ Info</th>
        </tr>
      </thead>
      <tbody v-for="order in orders" v-bind:key="order.id">
        <Order
          v-bind:id="order.id_order"
          v-bind:reference="order.reference"
          v-bind:date="order.date_add"
          v-bind:firstname="order.firstname"
          v-bind:lastname="order.lastname"
          v-bind:address="order.address1"
          v-bind:city="order.city"
          v-bind:country="order.country"
          v-bind:status="order.current_state"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import Order from "./row/Order.vue";
export default {
  name: "OrdersTable",
  components: {
    Order,
  },

  data() {
    return {
      orders: [],
      status: [],
    };
  },
  methods: {
    //Get all orders from DB
    getAllOrders() {
      const uri = "http://localhost:3000/api/orders/";
      fetch(uri)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (data) {
            this.orders = data.data;
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    //Get all status from DB for the Filter functionality.
    getAllStatus() {
      const uri = "http://localhost:3000/api/status/";
      fetch(uri)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (data) {
            this.status = data.data;
            console.log(this.status);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },

    filterByStatus(status) {
      const uri = `http://localhost:3000/api/orders/status/${status}`;
      fetch(uri)
        .then(async (response) => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response statusText
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          if (data) {
            this.orders = data.data;
            console.log(this.status);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
  created() {
    this.getAllStatus();
    this.filterByStatus("preparacion en proceso");

    //
  },
  updated() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.row {
  margin-left: 4rem;
  margin-right: 5rem;
}


</style>




