<template>
  <div>
      <div>{{id}}</div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["id"],
  components: {},

  data() {
    return {};
  },
  methods: {},
  created() {
      console.log("POPUP->", this.id)
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
  background-color: #c0c1ce !important;
}
tr.myRow {
  text-align: center !important;
}
</style>




