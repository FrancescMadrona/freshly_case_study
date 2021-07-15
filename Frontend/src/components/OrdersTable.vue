<template>
  <div class="container">
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Referencia</th>
          <th>Fecha</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Dirección</th>
          <th>Ciudad</th>
          <th>
            <select class="ui dropdown">
              <option value="" @click="countryFilter()">
                Todos los Países
              </option>
              <option value="1" @click="countryFilter(countries[0].name)">
                País ({{ countries[0].name }})
              </option>
              <option value="2" @click="countryFilter(countries[1].name)">
                País ({{ countries[1].name }})
              </option>
              <option value="3" @click="countryFilter(countries[2].name)">
                País ({{ countries[2].name }})
              </option>
              <option value="4" @click="countryFilter(countries[3].name)">
                País ({{ countries[3].name }})
              </option>
              <option value="5" @click="countryFilter(countries[4].name)">
                País ({{ countries[4].name }})
              </option>
              <option value="6" @click="countryFilter(countries[5].name)">
                País ({{ countries[5].name }})
              </option>
              <option value="7" @click="countryFilter(countries[6].name)">
                País ({{ countries[6].name }})
              </option>
              <option value="7" @click="countryFilter(countries[7].name)">
                País ({{ countries[7].name }})
              </option>
              <option value="7" @click="countryFilter(countries[8].name)">
                País ({{ countries[8].name }})
              </option>
            </select>
          </th>
          <th>
            <select class="ui dropdown">
              <option value="" @click="statusFilter(status[2].name)">
                Estado ({{ status[2].name }})
              </option>
              <option value="1" @click="statusFilter()">
                Todos los Estados
              </option>
              <option value="2" @click="statusFilter(status[0].name)">
                Estado ({{ status[0].name }})
              </option>
              <option value="3" @click="statusFilter(status[1].name)">
                Estado ({{ status[1].name }})
              </option>
              <option value="4" @click="statusFilter(status[3].name)">
                Estado ({{ status[3].name }})
              </option>
              <option value="5" @click="statusFilter(status[4].name)">
                Estado ({{ status[4].name }})
              </option>
              <option value="6" @click="statusFilter(status[5].name)">
                Estado ({{ status[5].name }})
              </option>
              <option value="7" @click="statusFilter(status[6].name)">
                Estado ({{ status[6].name }})
              </option>
              <option value="8" @click="statusFilter(status[7].name)">
                Estado ({{ status[7].name }})
              </option>
            </select>
          </th>
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
          v-on:triggerInfo="triggerInfo"
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
      countries: [],
      currentCountry: "none",
      currentStatus: "none",
    };
  },
  methods: {
    //Get all orders from DB
    getOrders(status, country) {
      const uri = `http://localhost:3000/api/orders/${status}/${country}`;
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
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },

    getAllCountries() {
      const uri = "http://localhost:3000/api/countries/";
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
            this.countries = data.data;
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    countryFilter(country) {
      console.log(country);
      if (country == null) {
        country = "none";
        this.currentCountry = "none";
      } else {
        this.currentCountry = country;
      }
      this.getOrders(this.currentStatus, country);
    },
    statusFilter(status) {
      console.log(status);
      if (status == null) {
        status = "none";
        this.currentStatus = "none";
      } else {
        this.currentStatus = status;
      }
      this.getOrders(status, this.currentCountry);
    },
    triggerInfo(id){
      console.log("parent1->" , id)
      this.$emit("triggerInfo", id)
    }
  },
  created() {
    this.getAllCountries();
    this.getAllStatus();
    this.getOrders("preparacion en proceso", this.currentCountry);
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




