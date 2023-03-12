<template>
  <div>
    <NodeContainer :business-adapter="businessAdapter" :node-data="nodeData"/>
  </div>
</template>

<script>
import NodeContainer from "@/components/flow/designer/NodeContainer";
import BusinessAdapter from "@/components/flow/BusinessAdapter";

export default {
  name: 'HelloWorld',
  components: {NodeContainer},
  props: {
    msg: String
  },
  setup: () => {
    // JSON.stringify([...nodeHandler.map().node.values()])
    let businessAdapter = BusinessAdapter.getBusinessAdapter();
    let nodeData = businessAdapter.getNodeData({workflowId: 'xxx'});
    return {nodeData, businessAdapter};
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
