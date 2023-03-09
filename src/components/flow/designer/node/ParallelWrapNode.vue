<template>
  <div>
    <div class="branch-wrap">
      <div class="branch-box">
        <div class="add-branch">
          <a-button shape="round" size="small" style="background-color: #42b983;border-color: #42b983;" type="primary">
            添加并行
          </a-button>
        </div>
        <template v-for="(childNodeName,index) of childNodeNames">
          <div :key="childNodeName" class="branch-item">
            <div class="branch-item-line"></div>
            <component :is="NodeWrap"
                       v-if="nodeHandler.hasNode(childNodeName)"
                       :node-config="{node:nodeHandler.getNode(childNodeName)}"
                       :node-handler="nodeHandler"/>
            <div v-if="index===0" class="top-left-cover-line"></div>
            <div v-if="index===0" class="bottom-left-cover-line"></div>
            <div v-if="index===childNodeNames.length-1" class="top-right-cover-line"></div>
            <div v-if="index===childNodeNames.length-1" class="bottom-right-cover-line"></div>
          </div>
        </template>
      </div>
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
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  setup(props) {
    /**
     * @type {NodeItem}
     */
    let node = props.node;
    let childNodeNames = node.childNodeNames;

    return {childNodeNames}
  }
}
</script>

<style scoped>


</style>
