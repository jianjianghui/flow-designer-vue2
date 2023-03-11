<template>
  <div>
    <div :class="node.error?'error':''" class="node" @click="click">
      <div class="title">
        <span> <a-icon :component="icon"/></span>
        <span> {{ node.name }}</span>
        <span class="title-right"> <a-icon class="close" type="close" @click.stop="close"/></span>
      </div>
      <div class="content">
        <span class="content-main">
           <span class="error-tooltip">
          <a-tooltip>
            <template slot="title">
              {{ node.error }}
            </template>
            <a-icon theme="filled" type="warning"/>
          </a-tooltip>
        </span>
            <span v-if="node.content" style="padding-left: 5px">{{ node.content }}</span>
          <span v-else style="padding-left: 5px;color: #666;">{{ defaultContent }}</span>
        </span>
        <span class="content-right">
          <a-popover v-model="visiblePopover" placement="rightTop" trigger="click">
             <template #title>
            <span style="font-size: 18px">追加分支</span>
          </template>
          <template #content>
            <div class="add-node-box">
              <div v-for="(node,index) of nodes" :key="index" class="add-node-item" @click="wrapNode(node.type)">
                <div :style="'color:'+node.color+';'" class="icon">
                  <a-icon v-if="node.icon?.component" :component="node.icon.component"/>
                  <a-icon v-if="node.icon?.type" :type="node.icon.type"/>
                </div>
                <span>{{ node.name }}</span>
              </div>
            </div>
          </template>
            <a-icon type="plus" @click.stop="()=>{}"/>
          </a-popover>
        </span>
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
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";
import {ref} from "vue";
import NodeType from "@/components/flow/designer/NodeType";

export default {
  name: "CheckNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  data() {
    return {
      defaultContent: '请选择'
    }
  },
  setup({node, nodeHandler}) {

    // icon;
    let icon = {
      template: `
          <svg  viewBox="0 0 1024 1024">
            <path fill=" currentColor" d="M288 320a224 224 0 1 0 448 0 224 224 0 1 0-448 0zm544 608H160a32 32 0 0 1-32-32v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 0 1-32 32z"></path>
          </svg>
      `
    };

    // drawer support
    let visibleDrawer = ref(false);
    let change = (val) => console.log('visible', val);
    let showDrawer = () => visibleDrawer.value = true;
    let hideDrawer = () => visibleDrawer.value = false;
    const drawer = {visibleDrawer, showDrawer, hideDrawer, change};

    //  popover support
    let visiblePopover = ref(false);
    let hidePopover = () => visiblePopover.value = false;
    let showPopover = () => visiblePopover.value = true;
    const popover = {visiblePopover, showPopover, hidePopover};

    // wrapNode
    let nodes = [
      {name: '条件分支', type: NodeType.JUDGE_WRAP, icon: {type: 'apartment'}, color: 'rgb(21, 188, 131)'},
      {name: '并行分支', type: NodeType.PARALLEL_WRAP, icon: {type: 'sliders'}, color: 'rgb(113, 141, 255)'},
    ];

    let wrapNode = function (type) {
      nodeHandler.wrapNode(node.code, {type: type})
    }
    let wrapNodeR = {nodes, wrapNode};

    return {icon, ...drawer, ...popover, ...wrapNodeR};
  },
  methods: {
    close() {
      this.nodeHandler.deleteNode(this.node.code)
    },
    click() {
      this.showDrawer()
    },
    more() {
      this.showPopover()
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
@node-border-radius: 5px;
@node-bg-color: rgb(255, 148, 62);


.node {
  min-height: 72px;
  text-align: left;
  border: 1px solid transparent;
  border-radius: @node-border-radius;

  &:is(.error) {
    border: 1px solid #f00;
    box-shadow: 0 0 15px 0 rgb(255 0 0);

    .error-tooltip {
      display: inline-block;
    }
  }

  .title .close {
    display: none;
    color: #fff;
    font-size: 16px;

    &:hover {
      color: #f00;
    }
  }

  &:hover {
    border: 1px solid @node-bg-color;
    box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3)
  }

  &:hover .title .close {
    display: inline-block;

  }

  &:hover .content .content-right {
    display: flex;
  }

}

.title {
  border-top-left-radius: @node-border-radius;
  border-top-right-radius: @node-border-radius;
  padding: 5px 15px;
  background-color: @node-bg-color;
  color: white;
  font-size: 12px;

  .title-right {
    position: absolute;
    right: 10px;
  }
}


.content {
  background-color: white;
  position: relative;
  display: flex;
  font-size: 15px;
  padding: 18px;
  border-bottom-left-radius: @node-border-radius;
  border-bottom-right-radius: @node-border-radius;


  .content-right {
    position: absolute;
    align-items: center;
    top: 0;
    right: 5px;
    height: 54px;
    color: #ccc;
    display: none;
  }

  .content-right:hover {
    color: #000;
  }

  .content-main {
    display: flex;
    align-items: center;
  }
}

.error-tooltip {
  margin-left: 5px;
  color: #f24815;
  display: none;
}

</style>
