<template>
  <div>
    <NodeContainer :node-data="nodeData"/>
  </div>
</template>

<script>
import NodeContainer from "@/components/flow/designer/NodeContainer";

export default {
  name: 'HelloWorld',
  components: {NodeContainer},
  props: {
    msg: String
  },
  setup: () => {
    //TODO API
    let nodeData = [];
    return {nodeData};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
