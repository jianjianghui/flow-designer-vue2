<template>
  <div class="node-wrap">
    <div>
      <div :class="uiStyle[type]">
        <component :is="component" :node="node" :nodeHandler="nodeHandler"/>
      </div>

      <div v-if="type !== NodeType.END">
       <add-node/>
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
import AddNode from "@/components/flow/designer/AddNode";

export default {
  name: "NodeWrap",
  computed: {
    NodeType() {
      return NodeType
    }
  },
  components: {AddNode, ...Nodes},
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

    const uiStyle = {};
    [NodeType.START].forEach(o=>uiStyle[o] = 'start-node-box');
    // [NodeType.END].forEach(o=>uiStyle[o] = '');
    [NodeType.CHECK,NodeType.PARALLEL,NodeType.JUDGE].forEach(o=>uiStyle[o] = 'node-box');
    [NodeType.PARALLEL_WRAP,NodeType.JUDGE_WRAP].forEach(o=>uiStyle[o] = 'wrap-box');

    return {mode, type, component, node: ref(node),uiStyle};
  }
}
</script>

<style scoped>
</style>
