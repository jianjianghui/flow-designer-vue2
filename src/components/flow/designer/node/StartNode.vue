<template>
  <div>{{ node.name }}</div>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";

export default {
  name: "StartNode",
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
