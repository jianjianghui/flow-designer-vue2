<template>
  <div class="jjh-workflow-container">
    <div class="zoom-box">zoom</div>
    <div class="box-scale">
      <node-wrap :node-config="{node:nodeHandler.getStartNode()}" :node-handler="nodeHandler"/>
    </div>
  </div>

</template>

<script>
import NodeHandler from "@/components/flow/designer/NodeHandler";
import NodeWrap from "@/components/flow/designer/NodeWrap";

export default {
  name: "NodeContainer",
  components: {NodeWrap},
  props: {
    nodeData: Array
  },
  setup(props) {
    let nodeHandler = new NodeHandler(props.nodeData);
    return {nodeHandler};
  }
}
</script>

<style lang="less">
@bg-color:#f6f8f9;
@line-color:#ccc;

.jjh-workflow-container {
  position: relative;
  .box-scale {
    background-color: @bg-color;
    display: inline-block;position: relative;width: 100%;align-items: flex-start;justify-content: center;flex-wrap: wrap;min-width: min-content;
  }

  .zoom-box {
    z-index: 999;
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .node-wrap {display: inline-flex;width: 100%;flex-flow: column wrap;justify-content: flex-start;align-items: center;position: relative;z-index: 1;}
  .node-box {display: inline-flex;flex-direction: column;position: relative;width: 220px;min-height: 72px;flex-shrink: 0;background: rgb(255, 255, 255);border-radius: 4px;cursor: pointer;box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);}
  .start-node-box {display: inline-flex;flex-direction: column;position: relative;width: 220px;min-height: 72px;flex-shrink: 0;background: rgb(255, 255, 255);border-radius: 4px;cursor: pointer;box-shadow: 0 2px 5px 0 rgba(0,0,0,.1);}
  .node-box::before {content: "";position: absolute;top: -12px;left: 50%;transform: translateX(-50%);width: 0px;border-style: solid;border-width: 8px 6px 4px;border-color: rgb(202, 202, 202) transparent transparent;background: @bg-color;}
  .wrap-box {display: inline-flex;width: 100%;}
  .add-node-btn-box {width: 240px;display: inline-flex;flex-shrink: 0;position: relative;z-index: 1;}
  .add-node-btn-box:before {content: "";position: absolute;top: 0px;left: 0px;right: 0px;bottom: 0px;z-index: -1;margin: auto;width: 2px;height: 100%;background-color: rgb(202, 202, 202);}
  .add-node-btn {user-select: none;width: 240px;padding: 32px 0px 32px;display: flex;justify-content: center;flex-shrink: 0;flex-grow: 1;}
  .add-node-btn span {}

  .parallel-wrap{
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    min-height: 180px;
    width: 100%;
    flex-shrink: 0;
  }
  .parallel-box{
    display: flex;
    overflow: visible;
    min-height: 180px;
    height: auto;
    border-bottom: 2px solid @line-color;
    border-top: 2px solid @line-color;
    position: relative;
  }
  .parallel-item{
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
  .parallel-item-line{
    height: 40px;
    background-color:@line-color;
    width: 2px;
  }


  .top-left-cover-line, .top-right-cover-line {position: absolute;height: 3px;width: 50%;background-color: @bg-color;top: -2px;}
  .bottom-left-cover-line, .bottom-right-cover-line {position: absolute;height: 3px;width: 50%;background-color: @bg-color;bottom: -2px;}
  .top-left-cover-line {left: -1px;}
  .top-right-cover-line {right: -1px;}
  .bottom-left-cover-line {left: -1px;}
  .bottom-right-cover-line {right: -1px;}


}


</style>
