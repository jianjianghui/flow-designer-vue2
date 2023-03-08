<template>
  <div>
    <div>{{ node.name }}</div>
    <div style="    display: flex;
    align-content: center;
    justify-content: center;">
      <template v-for="childNodeName of childNodeNames">
        <span :key="childNodeName">
        <component :is="NodeWrap"
                   v-if="nodeHandler.hasNode(childNodeName)"
                   :node-config="{node:nodeHandler.getNode(childNodeName)}"
                   :node-handler="nodeHandler"/>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap.vue";

export default {
  name: "ParallelWrapNode",
  computed: {
    NodeWrap() {
      return NodeWrap
    }
  },
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
    let childNodeNames = node.childNodeNames;

    return {node, childNodeNames}
  }
}
</script>

<style scoped>

</style>
