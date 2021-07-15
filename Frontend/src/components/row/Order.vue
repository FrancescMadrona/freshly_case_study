<template>
  <tr class="negative myRow" @click="displayInfo()">
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
  methods: {
    displayInfo(){
      console.log("hello")
    }
  },
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

tr.myRow:hover {
  opacity: 1;
  background-color:#c0c1ce !important;
}
tr.myRow{
  text-align: center !important;

}

</style>




