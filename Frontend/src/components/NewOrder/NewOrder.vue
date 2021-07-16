<template>
  <div class="disable-outside-clicks">
    <div class="ui card">
      <div class="content">
        <i class="right floated close icon" @click="closeNewOrder()"></i>
        <div class="header">REFERENCIA: #00000 </div>
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
                        Fastacar
                    </td>
                    <td>
                      Green
                    </td>
                    <td>
                      16/07/2021
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
                      Paseo Lorem
                    </td>
                    <td>
                      Framburgo
                    </td>
                    <td>
                      Canadá
                    </td>
                    </tr>
                    <tr>
                    <td>
                      IpsumN88
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
                <tbody >
                    <tr>
                    <td>
                      Instant Fresh Hand Sanitizer
                    </td>
                    <td>
                      3
                    </td>
                    </tr>

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
                      Nuevo Pedido
                    </td>
                    <td>
                       25 €
                    </td>
                    </tr>
                </tbody>
            </table>
        </p>
            <div class="ui buttons">
                <button class="ui button" @click="closeNewOrder()">Cancelar</button>
                <div class="or" data-text="o"></div>
                <button class="ui positive button" @click="sendToDB()">Enviar</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrder",
  props: [],
  components: {},

  data() {
    return {};
  },
  methods: {
    closeNewOrder() {
      this.$emit("closeNewOrder");
    },
    async sendToDB() {
      const obj = {
        reference: "000000",
        id_customer: "92",
        id_address: "92",
        total_paid: "25",
        date_add: "2021-03-27 00:00:00",
      };
      const uri = `http://localhost:3000/api/new_order`;
      const result = await fetch(uri, {
        method: "post",
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
          `EL NUEVO PEDIDO CON REFERENCIA #00000 HA SIDO CORRECTAMENTE REGISTRADO`
        );
        this.$emit("updateOrders");
      } else {
        alert("¡ATENCION! ¡hubo un problema al registrar el nuevo pedido!");
      }
    },
  },
  created() {},
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
  overflow-x: scroll;
  max-height: 100%;
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




