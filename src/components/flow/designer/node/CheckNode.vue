<template>
  <div>
    <div :class="node.error?'error':''" class="node" @click="click">
      <!--      <a-icon theme="filled" type="code"/>-->
      <!--      <a-icon theme="filled" type="control"/>-->
      <!--      &lt;!&ndash;  触发器    &ndash;&gt;-->
      <!--      <a-icon theme="filled" type="clock-circle"/>-->
      <!--      <a-icon theme="filled" type="smile"/>-->

      <div class="title">
        <span> <a-icon fill="" theme="filled" type="flag"/></span>
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
          <span style="padding-left: 5px">{{ node.name }}</span>
        </span>
        <span class="content-right" @click.stop="more">
          <a-popover v-model="visiblePopover" placement="rightTop" trigger="click">
            <template #title>
              <span>Title</span>
               <a slot="content" @click="hidePopover">Close</a>
            </template>
            <template #content>
              <p>Content</p>
              <p>Content</p>
            </template>
            <a-icon type="plus" @click.stop="more"/>
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

export default {
  name: "CheckNode",
  props: {
    node: NodeItem,
    nodeHandler: NodeHandler
  },
  setup() {

    // drawer support
    let visibleDrawer = ref(false);
    let change = (val) => console.log('visible', val);
    let showDrawer = () => visibleDrawer.value = true;
    let hideDrawer = () => visibleDrawer.value = false;
    const drawer = {visibleDrawer, showDrawer, hideDrawer, change};

    //  popover support
    let visiblePopover = ref(false);
    let hidePopover = () => visiblePopover.value = false;
    const popover = {visiblePopover, hidePopover};

    return {...drawer, ...popover};
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
    console.log(this.node)
  }
}
</script>

<style lang="less" scoped>
@node-border-radius: 5px;
@node-bg-color: rgb(255, 148, 62);


.node {
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
