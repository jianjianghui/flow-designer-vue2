<template>
  <div>
    <div class="node" @click="click">
      <div :class="option.left?'':'disable'" class="node-left" @click.stop="toLeft">
        <span> <a-icon v-if="option.left" class="icon" type="left"/></span>
      </div>

      <div class="node-content">
        <div class="title">
          <span class="title-main" style="margin-right: 5px"> <a-icon type="sliders"/></span>
          <span class="title-main">{{ node.name }}</span>
          <span class="title-right">
            <a-icon class="close" type="close" @click.stop="close"/>
          </span>
        </div>
        <div class="content">
          <span class="content-main">
                  <span v-if="node.content">{{ node.content }}</span>
          <span v-else style="color: #666;">{{ defaultContent }}</span>
        </span>
        </div>
      </div>

      <div :class="option.right?'':'disable'" class="node-right" @click.stop="toRight">
        <span> <a-icon v-if="option.right" class="icon" type="right"/></span>
      </div>

    </div>
    <a-drawer
        :after-visible-change="change"
        :closable="true"
        :title="node.name"
        :visible="visible"
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

export default {
  name: "ParallelNode",
  props: {
    option: {left: Boolean, right: Boolean, index: Number},
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  data() {
    return {
      defaultContent: '无'
    }
  },
  setup() {

    // drawer support
    let visible = ref(false);
    let change = (val) => console.log('visible', val);
    let showDrawer = () => visible.value = true;
    let hideDrawer = () => visible.value = false;

    return {visible: visible, showDrawer, hideDrawer, change};
  },
  methods: {
    close() {
      this.nodeHandler.deleteNode(this.node.code)
    },
    click() {
      this.showDrawer()
    },
    toLeft() {
      this.nodeHandler.moveBranchNode(this.node.code, -1)
    },
    toRight() {
      this.nodeHandler.moveBranchNode(this.node.code, +1)
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@node-border-radius: 5px;
@node-bg-color: rgb(113, 141, 255);
.node {
  text-align: left;
  border: 1px solid transparent;
  border-radius: @node-border-radius;
  display: flex;

  .title .close {
    display: none;
    font-size: 16px;

    &:hover {
      color: #f00;

    }
  }

  .title .info {
    font-size: 14px;
    display: inline-block;
  }

  &:hover {
    border: 1px solid @node-bg-color;
    box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3)
  }

  &:hover .title .close {
    display: inline-block;

  }

  &:hover .title .info {
    display: none;
  }

  .node-left {
    margin-left: 1px;
    border-top-left-radius: @node-border-radius;
    border-bottom-left-radius: @node-border-radius;
  }

  .node-content {
    width: 190px;
  }

  .node-right {
    border-top-right-radius: @node-border-radius;
    border-bottom-right-radius: @node-border-radius;
  }

  .node-left, .node-right {
    width: 14px;
    display: flex;
    align-items: center;

    span {
      width: 14px;
      height: 14px;
    }

    .icon {

      display: none;
    }

    &:hover {
      background-color: #eaeaea;


      &:hover:is(.disable) {
        background-color: #fff;
      }
    }
  }
}

.node:hover .node-left:not(.disable),
.node:hover .node-right:not(.disable) {
  display: flex;

  .icon {
    display: inline-block;
  }
}

.title {

  padding: 5px 5px;
  font-size: 16px;


  .title-main {
    color: @node-bg-color;
  }

  .title-right {
    position: absolute;
    right: 10px;
    margin-right: 5px;
  }
}


.content {
  display: flex;
  padding: 18px 5px;
  border-bottom-left-radius: @node-border-radius;
  border-bottom-right-radius: @node-border-radius;


  .content-main {
    display: flex;
    align-items: center;
  }
}


</style>
