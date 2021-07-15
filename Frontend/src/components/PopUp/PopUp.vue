<template>
  <div class="disable-outside-clicks">
    <div class="ui card">
      <div class="content">
        <i class="right floated close icon" @click="closePopUp()"></i>
        <div class="header">REFERENCIA: {{ order.reference }}</div>
        <div class="description">
          <p>
            <table class="ui celled table">
                <thead>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha</th>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        {{order.firstname}}
                    </td>
                    <td>
                        {{order.lastname}}
                    </td>
                    <td>
                        {{order.date_add}}
                    </td>
                    </tr>
                </tbody>
            </table>
          </p>
        <p>
            <table class="ui celled table">
                <thead>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Pais</th>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        {{order.address1}}
                    </td>
                    <td>
                        {{order.city}}
                    </td>
                    <td>
                        {{order.country}}
                    </td>
                    </tr>
                    <tr>
                    <td>
                        {{order.address2}}
                    </td></tr>
                </tbody>
            </table>
        </p>
        <p>
            <table class="ui celled table">
                <thead>
                <th>Producto</th>
                <th>Cantidad</th>
                </thead>
                <tbody v-for="product in products" v-bind:key="product.id">
                    <Products
                    v-bind:id="product.id"
                    v-bind:product="product.product"
                    v-bind:quantity="product.quantity"
                    />
                </tbody>
            </table>
        </p>
        <p> 
            <table class="ui celled table">
                <thead>
                <th>
                    <div class="ui compact menu">
                        <div class="ui simple dropdown item">
                            Estado
                            <i class="dropdown icon"></i>
                            <div class="menu">
                            <div class="item"updateStatus()>{{status[0].name}}</div>
                            <div class="item">{{status[1].name}}</div>
                            <div class="item">{{status[2].name}}</div>
                            <div class="item">{{status[3].name}}</div>
                            <div class="item">{{status[4].name}}</div>
                            <div class="item">{{status[5].name}}</div>
                            <div class="item">{{status[6].name}}</div>
                            <div class="item">{{status[7].name}}</div>
                            </div>
                        </div>
                    </div>
                </th>
                <th>Precio Total</th>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        {{order.current_state}}
                    </td>
                    <td>
                       {{order.total_paid}} €
                    </td>
                    </tr>
                </tbody>
            </table>
        </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Products from "./Products.vue";
export default {
  name: "PopUp",
  props: ["id"],
  components: {
    Products,
  },

  data() {
    return {
      order: [],
      products: [],
      status: [],
    };
  },
  methods: {
    closePopUp() {
      this.$emit("closePopUp");
    },
    getOrder(id) {
      const uri = `http://localhost:3000/api/order/${id}`;
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
            this.order = data.data[0];
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    getProducts(id) {
      const uri = `http://localhost:3000/api/products/order/${id}`;
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
            this.products = data.data;
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
    getAllStatus() {
      const uri = `http://localhost:3000/api/status`;
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
  },
  created() {
    this.getAllStatus();
    this.getOrder(this.id);
    this.getProducts(this.id);
  },
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

.card {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  /* top: 50%; */
}

.disable-outside-clicks {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>




