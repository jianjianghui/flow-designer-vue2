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
    static #branchMap = new Map();

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
     * @param branchTypeName  分支类型名
     */
    static registerNodeType(name, mode, component, createFunc = () => {
        throw new Error('【flow-designer】NodeType: 类型' + name + '不支持创建节点')
    }, branchTypeName = '') {
        let nodeType = new NodeType(name, mode, component);
        this.#map.set(name, nodeType);
        this.#funcMap.set(name, createFunc);
        if (branchTypeName) {
            this.#branchMap.set(name, branchTypeName);
        }

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


    static getBranchType(wrapTypeName) {
        return this.#branchMap.get(wrapTypeName);
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
        () => new NodeItem('审批人', '审批人', null, NodeType.CHECK));

    NodeType.registerNodeType(NodeType.CC, "single", "CCNode",
        () => new NodeItem('抄送人', '抄送人', null, NodeType.CC));

    NodeType.registerNodeType(NodeType.TRIGGER, "single", "TriggerNode",
        () => new NodeItem('触发器', '触发器', null, NodeType.TRIGGER));

    NodeType.registerNodeType(NodeType.DELAY, "single", "DelayNode",
        () => new NodeItem('延迟等待', '延迟等待', null, NodeType.DELAY));

    NodeType.registerNodeType(NodeType.END, "single", "EndNode");

    NodeType.registerNodeType(NodeType.PARALLEL_WRAP, "wrap", "ParallelWrapNode",
        () => {
            return [
                new NodeItem('并行分支', '并行分支', 'gateway', NodeType.PARALLEL_WRAP, null, null, []),
                new NodeItem('分支', 'NodeHandler Automatic generated', '并行任务（同时进行）', NodeType.PARALLEL),
                new NodeItem('分支', 'NodeHandler Automatic generated', '并行任务（同时进行）', NodeType.PARALLEL)
            ];
        }, NodeType.PARALLEL);
    NodeType.registerNodeType(NodeType.PARALLEL, "single", "ParallelNode",
        () => new NodeItem('NodeHandler Automatic generated', 'NodeHandler Automatic generated', '并行任务（同时进行）', NodeType.PARALLEL));

    NodeType.registerNodeType(NodeType.JUDGE_WRAP, "wrap", "JudgeWrapNode",
        () => {
            return [
                new NodeItem('条件分支', '条件分支', 'gateway', NodeType.JUDGE_WRAP, null, null, []),
                new NodeItem('条件', 'NodeHandler Automatic generated', null, NodeType.JUDGE),
                new NodeItem('条件', 'NodeHandler Automatic generated', null, NodeType.JUDGE)
            ];
        }, NodeType.JUDGE);
    NodeType.registerNodeType(NodeType.JUDGE, "single", "JudgeNode",
        () => new NodeItem('NodeHandler Automatic generated', 'NodeHandler Automatic generated', null, NodeType.JUDGE));

}

initNodeTypes();

export default NodeType;
