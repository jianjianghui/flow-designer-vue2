<template>
  <div class="end-node">
    <div class="end-node-circle"></div>
    <div class="end-node-text"> {{node.name}}</div>
  </div>
</template>

<script>
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeHandler from "@/components/flow/designer/NodeHandler";

export default {
  name: "EndNode",
  props: {
    nodeConfig: {
      node: NodeItem
    },
    nodeHandler: NodeHandler
  },
  setup(props) {
    /**
     * @type {NodeItem}
     */
    let node = props.nodeConfig.node;
    return {node}
  }
}
</script>

<style scoped>
.end-node {
  color: rgba(25, 31, 37, 0.4);
  font-size: 14px
}
.end-node-circle{
  width: 10px;
  height: 10px;
  margin: auto;
  border-radius: 50%;
  background: #dbdcdc;
}
.end-node-text {
  margin-top: 5px;
  text-align: center;
}

</style>
