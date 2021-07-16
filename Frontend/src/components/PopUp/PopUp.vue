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
                    Estado
                </th>
                <th>Precio Total</th>
                </thead>
                <tbody>
                    <tr>
                    <td>
                        <select v-model="selected">
                            <option value="" selected disabled >{{this.selected}}</option>
                            <option v-for="state in status" v-bind:key="state.name">
                                {{ state.name }}
                            </option>
                        </select>
                    </td>
                    <td>
                       {{order.total_paid}} €
                    </td>
                    </tr>
                </tbody>
            </table>
        </p>
            <div class="ui buttons">
                <button class="ui button" @click="closePopUp()">Cancel</button>
                <div class="or"></div>
                <button class="ui positive button" @click="updateStatusDB(selected)">Save</button>
            </div>
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
      selected: "preparacion en proceso",
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
            this.selected = this.order.current_state;
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
    selectStatusId(status){
        switch(status){
            case "Pago pendiente":
                return 1;
            case "Pago aceptado":
                return 2;
            case "Preparación en proceso":
                return 3;
            case "Enviado":
                return 4;
            case "Entregado":
                return 5;
            case "Cancelado":
                return 6;
            case "Reembolso":
                return 7;
            default: //"error en el pago"
                return 8;
        }

    },
    async updateStatusDB(status) {
      const status_id = this.selectStatusId(status);
      const order_id = this.id;
      const obj = { id: status_id };
      const uri = `http://localhost:3000/api/order/new_status/${order_id}`;
      const result = await fetch(uri, {
        method: "put",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (result.status === 200) {
        alert(
          `PEDIDO CON REFERENCIA ${this.order.reference} ha sido actualizado a ${status}`
        );
        this.$emit("updateOrders");
      } else {
        alert("¡ATENCION! ¡No hemos podido actualizar el pedido!");
      }
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




