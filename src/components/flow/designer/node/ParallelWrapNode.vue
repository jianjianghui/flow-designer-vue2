<template>
  <div>
    <div class="branch-wrap">
      <div class="branch-box">
        <div class="add-parallel" >add</div>
        <template v-for="(childNodeName,index) of childNodeNames">
          <div :key="childNodeName" class="branch-item">
            <div class="branch-item-line"></div>
            <component :is="NodeWrap"
                       v-if="nodeHandler.hasNode(childNodeName)"
                       :node-config="{node:nodeHandler.getNode(childNodeName)}"
                       :node-handler="nodeHandler"/>
            <div class="top-left-cover-line" v-if="index===0"></div>
            <div class="bottom-left-cover-line" v-if="index===0"></div>
            <div class="top-right-cover-line" v-if="index===childNodeNames.length-1"></div>
            <div class="bottom-right-cover-line" v-if="index===childNodeNames.length-1"></div>
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

    return { childNodeNames}
  }
}
</script>

<style scoped>

.add-parallel {justify-content: center;padding: 0px 10px;position: absolute;top: -16px;left: 50%;transform: translateX(-50%);transform-origin: center center;z-index: 1;display: inline-flex;align-items: center;}
</style>
