<template>
  <div>
    <div>
      <component :is="component" :nodeConfig="nodeConfig" :nodeHandler="nodeHandler"/>
      <div v-if="type !== NodeType.END">
        +
      </div>
    </div>
    <node-wrap v-if="nodeHandler.hasNextNode(node.name)" :node-config="{node:nodeHandler.getNextNode(node.name)}"
               :node-handler="nodeHandler"/>
  </div>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeType from "@/components/flow/designer/NodeType";
import {ref} from "vue";
import Nodes from "@/components/flow/designer/node";

export default {
  name: "NodeWrap",
  computed: {
    NodeType() {
      return NodeType
    }
  },
  components: {...Nodes},
  props: {
    nodeConfig: Object,
    nodeHandler: NodeHandler
  },
  setup(props) {
    let nodeConfig = props.nodeConfig;
    let node = NodeItem.parse(nodeConfig.node);

    let type = node.type;
    let nodeType = NodeType.getNodeType(type);
    let mode = nodeType.mode;
    let component = nodeType.component;
    return {mode, type, component, node: ref(node)};
  }
}
</script>

<style scoped>

</style>
