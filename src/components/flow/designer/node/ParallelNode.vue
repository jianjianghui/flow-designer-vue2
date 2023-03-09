<template>
  <div style="color: #718dff">{{ node.name }}</div>

</template>

<script>
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeHandler from "@/components/flow/designer/NodeHandler";

export default {
  name: "ParallelNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  setup() {
  }
}
</script>

<style scoped>

</style>
