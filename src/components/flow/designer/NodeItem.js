import NodeType from "@/components/flow/designer/NodeType";

/**
 * 节点
 */
class NodeItem {

    /**
     * 标题/名称；
     * @type {String}
     */
    name;


    /**
     * 编码/全局唯一
     */
    code;

    /**
     * 内容
     * @desc 该节点需要的数据都在这里，由节点自己维护
     * @type {Object}
     */
    content;

    /**
     * 节点类型
     * @desc 该值应该为 NodeType中已注册的名字
     * @type {String}
     */
    type;

    /**
     * 业务数据
     * @type {Object}
     */
    data;


    /**
     * 后续节点
     * @type {'nodeCode'}
     */
    nextNodeCode;

    /**
     * 子节点
     * @desc wrap类型的节点才会需要该字段，该字段是有意义的
     * @type { 'nodeCode'[]}
     */
    childNodeCodes;


    /**
     * 节点错误内容
     * @type {string}
     */
    error;

    constructor(name, code, content, type, data, nextNodeCode, childNodeCodes) {
        this.name = name;
        this.code = code;
        this.content = content;
        this.type = type;
        this.data = data;
        this.nextNodeCode = nextNodeCode;
        this.childNodeCodes = childNodeCodes;
    }

    /**
     * 解析
     * @param obj
     * @return NodeItem
     */
    static parse(obj) {
        if (obj?.constructor === NodeItem) {
            return obj;
        }

        return new NodeItem(obj.name, obj.code, obj.content, obj.type, obj.data, obj.nextNodeCode, obj.childNodeCodes);
    }


    isBranchNode() {
        return [NodeType.JUDGE, NodeType.PARALLEL].includes(this.type);
    }

    isHeadNode() {
        return [NodeType.START, NodeType.JUDGE, NodeType.PARALLEL].includes(this.type);
    }

    isFootNode() {
        return this.type === NodeType.END || !this.nextNodeCode;
    }

    /**
     * 是否为包装节点、网关
     */
    isWrapNode() {
        return [NodeType.PARALLEL_WRAP, NodeType.JUDGE_WRAP].includes(this.type);
    }

}

export default NodeItem;
