<template>
  <div>
    <div class="node" @click="click">
      <div class="node-left">

      </div>

      <!--      <a-icon theme="filled" type="code"/>-->
      <!--      <a-icon theme="filled" type="control"/>-->
      <!--      &lt;!&ndash;  触发器    &ndash;&gt;-->
      <!--      <a-icon theme="filled" type="clock-circle"/>-->
      <!--      <a-icon theme="filled" type="smile"/>-->
      <div class="node-content">
        <div class="title">
          <span> <a-icon fill="" theme="filled" type="flag"/></span>
          <span> 上报人</span>
          <span v-if="false" class="title-right"> <a-icon class="close" type="close" @click="close"/></span>
        </div>
        <div class="content">
          <span class="content-left" @click.stop="more"> <a-icon type="left"/></span>
          <span class="content-main">
          <span style="padding-left: 5px">{{ node.name }}</span>
        </span>
          <span class="content-right" @click.stop="more"> <a-icon type="right"/></span>
        </div>
      </div>

      <div class="node-right">
        <span @click.stop="more"> <a-icon type="right"/></span>
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
    node: NodeItem,
    nodeHandler: NodeHandler
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
      console.log(1)
    },
    click() {
      this.showDrawer()
    },
    more() {
      console.log(3)
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
@node-border-radius: 5px;
@node-bg-color: #576a95;
.node {
  text-align: left;
  border: 1px solid transparent;
  border-radius: @node-border-radius;

  .title .close {
    display: none;
    color: #fff;

    &:hover {
      color: #ccc;

    }
  }

  &:hover {
    border: 1px solid @node-bg-color;
    box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3)
  }

  &:hover .title .close {
    display: inline-block;

  }

}

.title {
  border-top-left-radius: @node-border-radius;
  border-top-right-radius: @node-border-radius;
  padding: 5px 15px;
  background-color: @node-bg-color;
  color: white;
  font-size: xx-small;

  .title-right {
    position: absolute;
    right: 10px;
  }
}


.content {
  display: flex;
  padding: 18px;
  border-bottom-left-radius: @node-border-radius;
  border-bottom-right-radius: @node-border-radius;


  .content-right {
    position: absolute;
    display: flex;
    align-items: center;
    right: 5px;
    height: 54px;
    color: #ccc;

  }

  .content-right:hover {
    color: #000;
  }

  .content-main {
    display: flex;
    align-items: center;
  }
}


</style>
