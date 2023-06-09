<template>
  <section class="jjh-workflow-container">

    <div class="zoom-box">
      <a-affix :offset-top="30">
        <div style="display:flex;align-items: center;">
          <a-button :disabled="zoomScale >= 150" shape="circle" @click="zoom(+10)">
            +
          </a-button>
          <div style="margin: 10px">{{ zoomScale }}%</div>
          <a-button :disabled="zoomScale <= 40" shape="circle" @click="zoom(-10)">
            -
          </a-button>
        </div>

      </a-affix>
    </div>
    <div :style="'transform: scale('+zoomScale/100+'); transform-origin: 50% 0px 0px;'" class="box-scale">
      <node-wrap v-if="done" :node-config="{node:nodeHandler.getStartNode()}" :node-handler="nodeHandler"/>
    </div>
  </section>
</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap";
import {ref} from "vue";
import BusinessAdapter from "@/components/flow/BusinessAdapter";

export default {
  name: "NodeContainer",
  components: {NodeWrap},
  props: {
    nodeData: Array,
    businessAdapter: BusinessAdapter
  },
  data() {
    return {
      zoomScale: 100
    }
  },
  setup(props) {
    /**
     *
     * @type {NodeHandler}
     */
    let nodeHandler = new NodeHandler(props.nodeData);
    let done = ref(false);

    return {nodeHandler, done};
  },
  methods: {
    zoom(num) {
      this.zoomScale += num;
    }
  },
  mounted() {
    this.nodeHandler.setRefresh(() => {
    });

    this.done = true
  }
}
</script>

<style lang="less">
@bg-color: #f6f8f9;
@line-color: #ccc;
@node-border-radius: 5px;

.jjh-workflow-container {
  position: relative;
  background-color: @bg-color;
  overflow-x: auto;
  width: 100%;

  .box-scale {
    text-align: center;
    display: inline-block;
    position: relative;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    min-width: min-content;
  }

  .zoom-box {
    position: absolute;
    z-index: 999;
    top: 30px;
    right: 20px;
  }

  .node-wrap {
    text-align: center;
    display: inline-flex;
    width: 100%;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .node-box {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 220px;
    min-height: 72px;
    max-height: 120px;
    flex-shrink: 0;
    background: rgb(255, 255, 255);
    border-radius: @node-border-radius;
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  }

  .start-node-box {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 220px;
    min-height: 72px;
    flex-shrink: 0;
    background: rgb(255, 255, 255);
    border-radius: @node-border-radius;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
  }

  .node-box::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: rgb(202, 202, 202) transparent transparent;
    background: @bg-color;
  }

  .wrap-box {
    display: inline-flex;
    width: 100%;
  }

  .add-node-btn-box {
    width: 240px;
    display: inline-flex;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
  }

  .add-node-btn-box:before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: rgb(202, 202, 202);
  }

  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 32px 0px 32px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .add-node-btn span {
  }

  .branch-wrap {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    min-height: 180px;
    width: 100%;
    flex-shrink: 0;
  }

  .branch-box {
    display: flex;
    overflow: visible;
    min-height: 180px;
    height: auto;
    border-bottom: 2px solid @line-color;
    border-top: 2px solid @line-color;
    position: relative;
  }

  .branch-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: @bg-color;

    &::after {
      position: absolute;
      margin: auto;
      height: 100%;
      content: '';
      display: inline-block;
      width: 2px;
      background: @line-color;
    }
  }

  .branch-item-line {
    height: 40px;
    background-color: @line-color;
    width: 2px;
  }

  .add-branch {
    justify-content: center;
    padding: 0 10px;
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: center center;
    z-index: 1;
    display: inline-flex;
    align-items: center;
  }


  .top-left-cover-line, .top-right-cover-line {
    position: absolute;
    height: 3px;
    width: 50%;
    background-color: @bg-color;
    top: -2px;
  }

  .bottom-left-cover-line, .bottom-right-cover-line {
    position: absolute;
    height: 3px;
    width: 50%;
    background-color: @bg-color;
    bottom: -2px;
  }

  .top-left-cover-line {
    left: -1px;
  }

  .top-right-cover-line {
    right: -1px;
  }

  .bottom-left-cover-line {
    left: -1px;
  }

  .bottom-right-cover-line {
    right: -1px;
  }


}


.add-node-box {
  width: 350px;
  text-align: center;
  display: block;
}

.add-node-item {
  display: inline-flex;
  align-items: center;
  margin: 5px 5px;
  cursor: pointer;
  padding: 10px 15px;
  border: 1px solid #f8f9f9;
  background-color: #f8f9f9;
  border-radius: 10px;
  width: 150px;
  position: relative;

  &:hover {
    background-color: #fff;
    box-shadow: 0 0 15px 0 #ccc;
  }

  .icon {
    display: inline-flex;
    font-size: 25px;
    padding: 5px;
    border: 1px solid #dedfdf;
    border-radius: 14px;
    margin-right: 10px;
  }
}

</style>
