<template>
  <tr>
    <td>{{product}}</td>
    <td>{{quantity}}</td>
  </tr>
</template>

<script>
export default {
  name: "Products",
  props: ["id", "product", "quantity"],
  components: {},

  data() {
    return {};
  },
  methods: {},
  created() {
      console.log("products->>", product)
  },
  updated() {
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
</style>




