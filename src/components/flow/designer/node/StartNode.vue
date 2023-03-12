<template>
  <div>
    <div :class="node.error?'error':''" class="node" @click="click">
      <div class="title">
        <span> <a-icon fill="" theme="filled" type="flag"/></span>
        <span> {{ node.name }}</span>
        <!--        <span v-if="false" class="title-right"> <a-icon class="close" type="close" @click="close"/></span>-->
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
        <!--        <span v-if="false" class="content-right" @click.stop="more"> <a-icon type="right"/></span>-->
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
  name: "StartNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  data() {
    return {
      defaultContent: '请设置上报人'
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
  min-height: 72px;
  text-align: left;
  border: 1px solid transparent;
  border-radius: @node-border-radius;

  &:is(.error) {
    border: 1px solid #f00;
    box-shadow: 0 0 5px 0 #f56c6c;

    .error-tooltip {
      display: inline-block;
    }
  }

  .title .close {
    display: none;
    color: #fff;

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
  position: relative;
  display: flex;
  padding: 18px;
  font-size: 15px;
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
