/**
 * 节点类型
 */
import NodeItem from "@/components/flow/designer/NodeItem";

class NodeType {

    static START = 'start';
    static END = 'end';

    static CHECK = 'check';
    static CC = 'cc';
    static TRIGGER = 'trigger';
    static DELAY = 'delay';

    static PARALLEL_WRAP = 'parallel_wrap';
    static PARALLEL = 'parallel';

    static JUDGE_WRAP = 'judge_wrap';
    static JUDGE = 'judge';

    static #map = new Map();
    static #funcMap = new Map();

    /**
     * 节点名称
     */
    name;
    /**
     * 节点类型模式
     *
     * @type {'single'|'wrap'}
     */
    mode;
    /**
     * 组件名
     *
     * @type {string}
     */
    component;

    /**
     *
     * @param name
     * @param mode  {'single'|'wrap'}
     * @param component
     */
    constructor(name, mode, component) {
        this.name = name;
        this.mode = mode;
        this.component = component;
    }

    /**
     *
     * @param name {String} 节点
     * @param mode  {'single'|'wrap'} 节点类型模式
     * @param component {String} 组件名
     * @param createFunc {function():NodeItem|NodeType[]}
     */
    static registerNodeType(name, mode, component, createFunc = () => {
        throw new Error('【flow-designer】NodeType: 类型' + name + '不支持创建节点')
    }) {
        let nodeType = new NodeType(name, mode, component);
        this.#map.set(name, nodeType);
        this.#funcMap.set(name, createFunc);
        return nodeType;
    }

    /**
     * 获取节点类型
     * @param typeName
     * @return NodeType
     */
    static getNodeType(typeName) {
        return this.#map.get(typeName)
    }

    /**
     *
     * @param typeName
     * @return NodeItem
     */
    static createNode(typeName) {
        if (!this.#funcMap.has(typeName)) {
            throw new Error('【flow-designer】NodeType: 类型' + typeName + '不支持创建节点')
        }

        return this.#funcMap.get(typeName)();
    }

    /**
     *
     * @param typeName
     * @return NodeItem[]
     */
    static createWrap(typeName) {
        if (!this.#funcMap.has(typeName)) {
            throw new Error('【flow-designer】NodeType: 类型' + typeName + '不支持创建节点')
        }

        return this.#funcMap.get(typeName)();
    }

}


function initNodeTypes() {
    NodeType.registerNodeType(NodeType.START, "single", "StartNode")

    NodeType.registerNodeType(NodeType.CHECK, "single", "CheckNode",
        () => new NodeItem('审批人', '审批人', '请指定审批人', NodeType.CHECK));

    NodeType.registerNodeType(NodeType.CC, "single", "CheckNode",
        () => new NodeItem('抄送人', '抄送人', '请指定审批人', NodeType.CC));

    NodeType.registerNodeType(NodeType.TRIGGER, "single", "CheckNode",
        () => new NodeItem('触发器', '触发器', '请配置触发器', NodeType.TRIGGER));

    NodeType.registerNodeType(NodeType.DELAY, "single", "CheckNode",
        () => new NodeItem('延迟等待', '延迟等待', '请配置延时等待', NodeType.DELAY));

    NodeType.registerNodeType(NodeType.END, "single", "EndNode")

    NodeType.registerNodeType(NodeType.PARALLEL_WRAP, "wrap", "ParallelWrapNode",
        () => {
            return [
                new NodeItem('并行分支', '并行分支', '请配置延时等待', NodeType.PARALLEL_WRAP, null, null, []),
                new NodeItem('分支1', 'NodeHandler Automatic generated', '并行任务（同时进行）', NodeType.PARALLEL),
                new NodeItem('分支2', 'NodeHandler Automatic generated', '并行任务（同时进行）', NodeType.PARALLEL),
            ];
        })
    NodeType.registerNodeType(NodeType.PARALLEL, "single", "ParallelNode")

    NodeType.registerNodeType(NodeType.JUDGE_WRAP, "wrap", "ParallelWrapNode",
        () => {
            return [
                new NodeItem('条件分支', '条件分支', '请配置延时等待', NodeType.JUDGE_WRAP, null, null, []),
                new NodeItem('条件1', 'NodeHandler Automatic generated', '请设置条件', NodeType.JUDGE),
                new NodeItem('条件2', 'NodeHandler Automatic generated', '请设置条件', NodeType.JUDGE),
            ];
        })
    NodeType.registerNodeType(NodeType.JUDGE, "single", "ParallelNode")

}

initNodeTypes();

export default NodeType;
