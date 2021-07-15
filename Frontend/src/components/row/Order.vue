<template>
  <tr class="negative">
    <!-- reference -->
    <td>{{ reference }}</td>
    <!-- date -->
    <td>{{ date }}</td>
    <!-- Firstname -->
    <td>{{ firstname }}</td>
    <!-- Lastname -->
    <td>{{ lastname }}</td>
    <!-- Address -->
    <td>{{ address }}</td>
    <!-- City -->
    <td>{{ city }}</td>
    <!-- Country -->
    <td>{{ country }}</td>
    <!-- Status -->
    <td>{{ status }}</td>
    <!-- + Info button -->
    <td><i class="eye icon"></i></td>
  </tr>
</template>

<script>
export default {
  name: "Order",
  props: [
    "id",
    "reference",
    "date",
    "firstname",
    "lastname",
    "address",
    "city",
    "country",
    "status",
  ],
  components: {},

  data() {
    return {};
  },
  methods: {},
  created() {

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

/*.a:hover {
  opacity: 0.5;
  transition: opacity 0.5s ease-in;
}*/
</style>




