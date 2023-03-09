<template>
  <div>
    <div class="node">
      <!--      <a-icon theme="filled" type="code"/>-->
      <!--      <a-icon theme="filled" type="control"/>-->
      <!--      &lt;!&ndash;  触发器    &ndash;&gt;-->
      <!--      <a-icon theme="filled" type="clock-circle"/>-->
      <!--      <a-icon theme="filled" type="smile"/>-->

      <div class="title">
        <span> <a-icon fill="" theme="filled" type="flag"/></span>
        <span> 上报人</span>
        <span class="title-right"> <a-icon class="close" type="close" @click="close"/></span>
      </div>
      <div class="content">
        <span class="content-main">
          <span style="padding-left: 5px">1234</span>
        </span>
        <span class="content-right"> <a-icon type="right"/></span>
      </div>
    </div>
  </div>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeItem from "@/components/flow/designer/NodeItem";

export default {
  name: "StartNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  setup() {
  },
  methods: {
    close() {
      console.log(1)
    }
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

    &:hover {
      color: red;
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
  height: 18px;
  border-top-left-radius: @node-border-radius;
  border-top-right-radius: @node-border-radius;
  padding-left: 15px;
  background-color: @node-bg-color;
  color: white;
  font-size: 12px;

  .title-right {
    position: absolute;
    right: 10px;
  }
}


.content {
  display: flex;
  height: 54px;
  border-bottom-left-radius: @node-border-radius;
  border-bottom-right-radius: @node-border-radius;


  .content-right {
    position: absolute;
    display: flex;
    align-items: center;
    right: 5px;
    height: 54px;

  }

  .content-main {
    display: flex;
    align-items: center;
  }
}


</style>
