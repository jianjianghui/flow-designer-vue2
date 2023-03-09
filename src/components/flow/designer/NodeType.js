/**
 * 节点类型
 */
class NodeType {

    static START = 'start';
    static END = 'end';

    static CHECK = 'check';

    static PARALLEL_WRAP = 'parallel_wrap';
    static PARALLEL = 'parallel';

    static JUDGE_WRAP = 'judge_wrap';
    static JUDGE = 'judge';

    static #map = new Map();

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
     */
    static registerNodeType(name, mode, component) {
        let nodeType = new NodeType(name, mode, component);
        this.#map.set(name, nodeType);
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

}


function initNodeTypes() {
    NodeType.registerNodeType(NodeType.START, "single", "StartNode")
    NodeType.registerNodeType(NodeType.CHECK, "single", "CheckNode")
    NodeType.registerNodeType(NodeType.END, "single", "EndNode")
    NodeType.registerNodeType(NodeType.PARALLEL_WRAP, "wrap", "ParallelWrapNode")
    NodeType.registerNodeType(NodeType.PARALLEL, "single", "ParallelNode")

}

initNodeTypes();

export default NodeType;
