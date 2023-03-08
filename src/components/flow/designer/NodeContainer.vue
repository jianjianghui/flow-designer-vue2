<template>
  <div>
    <div class="zoom-box">zoom</div>
    <node-wrap :node-config="{node:nodeHandler.getStartNode()}" :node-handler="nodeHandler"/>
  </div>

</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap";

export default {
  name: "NodeContainer",
  components: {NodeWrap},
  props: {
    nodeData: Object
  },
  setup(props) {
    let nodeHandler = new NodeHandler(props.nodeData);
    return {nodeHandler};
  }
}
</script>

<style scoped>
.zoom-box {
  position: fixed;
  top: 20px;
  right: 20px;
}

</style>
