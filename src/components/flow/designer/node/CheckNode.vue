<template>
  <div>{{ node.name }}</div>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";

export default {
  name: "CheckNode",
  props: {
    nodeConfig: {
      node: NodeItem
    },
    nodeHandler: NodeHandler
  },
  setup(props) {
    let node = props.nodeConfig.node;
    return {node}
  }
}
</script>

<style scoped>

</style>
