<a-icon type="plus"/>
<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <div class="add-node-popover-body">
        <a-popover v-model="visible" placement="right" trigger="click">
          <template #title>
            <span>Title</span>
            <a slot="content" @click="hide">Close</a>
          </template>
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>

          <a-button icon="plus" shape="circle" type="primary"/>
        </a-popover>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNode",
  data() {
    return {
      visible: false
    }
  },
  methods: {
    hide() {
      console.log(111);
      this.visible = false;
    },
  },
}
</script>

<style scoped>

</style>
