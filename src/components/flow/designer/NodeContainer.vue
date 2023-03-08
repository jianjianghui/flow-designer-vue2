<template>
  <div>
    <div class="zoom-box">zoom</div>
    <node-wrap :node-config="{node:startNode}" :node-handler="nodeHandler"/>
    <end-node/>
  </div>

</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap";
import EndNode from "@/components/flow/designer/node/EndNode";

export default {
  name: "NodeContainer",
  components: {EndNode, NodeWrap},
  props:{
    nodeData:Object
  },
  setup(props) {
    let nodeHandler = new NodeHandler(props.nodeData);
    let startNode = nodeHandler.getStartNode();
    return {nodeHandler,startNode};
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
