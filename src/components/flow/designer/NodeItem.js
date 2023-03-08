/**
 * 节点
 */
class NodeItem {

    /**
     * 标题/名称；全局唯一
     * @type {String}
     */
    name;

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
     * @type {'nodeName'[]}
     */
    nextNodeNames;

    constructor(name,content,type,data,nextNodeNames) {
       this.name = name;
       this.content = content;
       this.type = type;
       this.data = data;
       this.nextNodeNames = nextNodeNames;
    }

    /**
     * 解析
     * @param obj
     * @return NodeItem
     */
    static parse(obj) {
        if(obj.constructor === NodeItem) {
            return obj;
        }

        return new NodeItem(obj.name,obj.content,obj.type,obj.data,obj.nextNodeNames);
    }
}

export default NodeItem;
