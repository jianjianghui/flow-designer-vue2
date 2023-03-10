<a-icon type="plus"/>
<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <div class="add-node-popover-body">
        <a-popover v-model="visible" placement="rightTop" trigger="click">
          <template #title>
            <span style="font-size: 18px">添加流程节点</span>
            <!--            <a slot="content" @click="hide">Close</a>-->
          </template>
          <template #content>
            <div class="add-node-box">
              <div v-for="(node,index)   of nodes" :key="index" class="add-node-item" @click="addNode(node.type)">
                <div :style="'color:'+node.color+';'" class="icon">
                  <a-icon v-if="node.icon?.component" :component="node.icon.component"/>
                  <a-icon v-if="node.icon?.type" :type="node.icon.type"/>
                </div>
                <span>{{ node.name }}</span>
              </div>
            </div>
          </template>
          <a-button icon="plus" shape="circle" type="primary"/>
        </a-popover>

      </div>
    </div>
  </div>
</template>

<script>
import NodeType from "@/components/flow/designer/NodeType";
import NodeItem from "@/components/flow/designer/NodeItem";
import NodeHandler from "@/components/flow/designer/NodeHandler";

export default {
  name: "AddNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    hide() {
      this.visible = false;
    },
  },
  /**
   *
   * @param node {NodeItem}
   * @param nodeHandler {NodeHandler}
   */
  setup({node, nodeHandler}) {
    // icon;
    let checkIcon = {
      template: `
          <svg  viewBox="0 0 1024 1024">
            <path fill=" currentColor" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path>
          </svg>
      `
    };

    let nodes = [
      {name: '审批人', type: NodeType.CHECK, icon: {component: checkIcon}, color: 'rgb(255, 148, 62)'},
      {name: '抄送人', type: NodeType.CC, icon: {type: 'mail'}, color: 'rgb(50, 150, 250);'},
      {name: '触发器', type: NodeType.TRIGGER, icon: {type: 'control'}, color: 'rgb(0,152,31)'},
      {name: '延迟等待', type: NodeType.DELAY, icon: {type: 'clock-circle'}, color: 'rgb(242, 86, 67)'},
      {name: '条件分支', type: NodeType.JUDGE_WRAP, icon: {type: 'apartment'}, color: 'rgb(21, 188, 131)'},
      {name: '并行分支', type: NodeType.PARALLEL_WRAP, icon: {type: 'sliders'}, color: 'rgb(113, 141, 255)'},
    ];

    let addNode = function (type) {
      nodeHandler.insertNode(node.code, {type: type})
    }
    return {nodes, addNode};
  }
}
</script>

<style lang="less" scoped>

</style>
