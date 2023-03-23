<template>
  <div>
    <div class="branch-wrap">
      <div class="branch-box">
        <div class="add-branch">
          <a-button shape="round" style="color: #15bc83;" @click="addBranch">添加条件</a-button>
          <div class="wrap-more">
            <a-button icon="bars" type="primary" @click="showDrawer"/>
          </div>
        </div>
        <template v-for="(childNodeCode,index) of childNodeCodes">
          <div :key="childNodeCode" class="branch-item">
            <div class="branch-item-line"></div>
            <component :is="NodeWrap"
                       v-if="nodeHandler.hasNode(childNodeCode)"
                       :node-config="{node:nodeHandler.getNode(childNodeCode),option:{
                         left:index!==0,right:index !== childNodeCodes.length-1,index:index
                       }}"
                       :node-handler="nodeHandler"/>
            <div v-if="index===0" class="top-left-cover-line"></div>
            <div v-if="index===0" class="bottom-left-cover-line"></div>
            <div v-if="index===childNodeCodes.length-1" class="top-right-cover-line"></div>
            <div v-if="index===childNodeCodes.length-1" class="bottom-right-cover-line"></div>
          </div>
        </template>
      </div>
    </div>
    <a-drawer
        :after-visible-change="change"
        :closable="true"
        :title="node.name"
        :visible="visibleDrawer"
        :width="720"
        placement="right"
        @close="hideDrawer"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>

<script>
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap.vue";
import {ref} from "vue";

export default {
  name: "JudgeWrapNode",
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


    // drawer support
    let visibleDrawer = ref(false);
    let change = (val) => console.log('visible', val);
    let showDrawer = () => visibleDrawer.value = true;
    let hideDrawer = () => visibleDrawer.value = false;
    const drawer = {visibleDrawer, showDrawer, hideDrawer, change};

    return {childNodeCodes, ...drawer}
  },
  methods: {
    addBranch() {
      this.nodeHandler.addBranch(this.node.code, '条件')
    }
  }
}
</script>

<style lang="less" scoped>
.wrap-more {
  position: absolute;
  right: -30px;
  display: none;
}

.branch-wrap {
  &:hover > .branch-box > .add-branch > .wrap-more {
    display: inline-block;
  }
}

</style>
