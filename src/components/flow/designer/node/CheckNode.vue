<template>
  <div>
    <a-button type="primary" @click="showDrawer">
      Open
    </a-button>
    <a-drawer
        :after-visible-change="afterVisibleChange"
        :closable="false"
        :visible="visible"
        :width="720"
        placement="right"
        title="Basic Drawer"
        @close="onClose"
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
  methods: {
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
  },
  setup() {
    let visible = false;
    return {visible: ref(visible)}
  }
}
</script>

<style scoped>

</style>
