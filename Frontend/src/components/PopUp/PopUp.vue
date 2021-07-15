<template>
  <div class="disable-outside-clicks">
    <div class="ui card">
      <div class="content">
        <i class="right floated close icon" @click="closePopUp()"></i>
        <div class="header">REFERENCE: {{ order.reference }}</div>
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
                        Fran
                    </td>
                    <td>
                        Madrona
                    </td>
                    <td>
                        21/05/32
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
                        calle lorem
                    </td>
                    <td>
                        Madrona
                    </td>
                    <td>
                        21/05/32
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
export default {
  name: "PopUp",
  props: ["id"],
  components: {},

  data() {
    return {
      order: [],
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
            console.log(this.order);
          }
        })
        .catch((error) => {
          this.errorMessage = error;
          console.error("There was an error!", error);
        });
    },
  },
  created() {
    console.log("POPUP->", this.id);
    this.getOrder(this.id);
  },
  updated() {
    //this.getOrder(this.id);
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
  top: 50%;
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




