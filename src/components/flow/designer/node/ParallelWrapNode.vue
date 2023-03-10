<template>
  <div>
    <div class="branch-wrap">
      <div class="branch-box">
        <div class="add-branch">
          <!--          <a-button shape="round" size="small" style="background-color: #42b983;border-color: #42b983;"-->
          <a-button shape="round" style="color: #1890ff;">
            添加并行
          </a-button>
        </div>
        <template v-for="(childNodeCode,index) of childNodeCodes">
          <div :key="childNodeCode" class="branch-item">
            <div class="branch-item-line"></div>
            <component :is="NodeWrap"
                       v-if="nodeHandler.hasNode(childNodeCode)"
                       :node-config="{node:nodeHandler.getNode(childNodeCode)}"
                       :node-handler="nodeHandler"/>
            <div v-if="index===0" class="top-left-cover-line"></div>
            <div v-if="index===0" class="bottom-left-cover-line"></div>
            <div v-if="index===childNodeCodes.length-1" class="top-right-cover-line"></div>
            <div v-if="index===childNodeCodes.length-1" class="bottom-right-cover-line"></div>
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
    let childNodeCodes = node.childNodeCodes;

    return {childNodeCodes}
  }
}
</script>

<style scoped>


</style>
