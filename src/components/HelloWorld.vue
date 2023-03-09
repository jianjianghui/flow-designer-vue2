<template>
  <div>
    <NodeContainer :node-data="nodeData"/>
  </div>
</template>

<script>
import NodeContainer from "@/components/flow/designer/NodeContainer";

export default {
  name: 'HelloWorld',
  components: {NodeContainer},
  props: {
    msg: String
  },
  setup: (props) => {
    console.log(props)

    let nodeData = [{
      name: '起始节点',
      type: 'start',
      nextNodeName: '审批节点',
    }, {
      name: '审批节点',
      type: 'check',
      nextNodeName: '并行wrap001',
    }, {
      name: '并行wrap001',
      type: 'parallel_wrap',
      nextNodeName: '结束节点',
      childNodeNames: [
        '并行wrap001-001',
        '并行wrap001-002',
        '并行wrap001-003',
        '并行wrap001-004',
        '并行wrap001-005',
        '并行wrap001-006',
        '并行wrap001-007',
      ]
    }, {
      name: '并行wrap001-001',
      type: 'parallel',
    }, {
      name: '并行wrap001-002',
      type: 'parallel',
      nextNodeName: 'xx',
    }, {
      name: 'xx',
      type: 'parallel',
      nextNodeName:'并行wrap003'
    },
      {
        name: '并行wrap003',
        type: 'parallel_wrap',
        childNodeNames: [
          '并行wrap003-001',
          '并行wrap003-002',
          '并行wrap003-003',
        ]
      },
      {
        name: '并行wrap003-001',
        type: 'parallel',
      }, {
        name: '并行wrap003-002',
        type: 'parallel',
      }, {
        name: '并行wrap003-003',
        type: 'parallel',
      },
      {
      name: '并行wrap001-003',
      type: 'parallel',
    }, {
      name: '并行wrap001-004',
      type: 'parallel',
    }, {
      name: '并行wrap001-005',
      type: 'parallel',
    }, {
      name: '并行wrap001-006',
      type: 'parallel',
    }, {
      name: '并行wrap001-007',
      type: 'parallel',
    }, {
      name: '并行wrap001-008',
      type: 'parallel',
    }, {
      name: '并行wrap001-009',
      type: 'parallel',
    },
      {
        name: '结束节点',
        type: 'end'
      }
    ];

    return {nodeData};
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
