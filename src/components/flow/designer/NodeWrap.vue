<template>
  <div>
    {{mode}}
    <div>{{node.name}}</div>
    <node-wrap v-if="nodeHandler.hasNextNodes(node.name)" :node-config="{node:nodeHandler.getNextNode(node.name)}" :node-handler="nodeHandler"/>
  </div>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeType from "@/components/flow/designer/NodeType";
import {ref} from "vue";

export default {
  name: "NodeWrap",
  props:{
    nodeConfig:Object,
    nodeHandler:NodeHandler
  },
  setup(props) {
    let nodeConfig = props.nodeConfig;

    let node = NodeItem.parse(nodeConfig.node);
    let type = node.type;
    let nodeType = NodeType.getNodeType(type);
    let mode = nodeType.mode;
    // setTimeout(()=>{
    //   node.name = node.name+'--df'
    //   console.log(node)
    // },3000)
    return {mode,node:ref(node)};
  }
}
</script>

<style scoped>

</style>
