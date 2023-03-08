import NodeItem from "@/components/flow/designer/NodeItem";
import NodeType from "@/components/flow/designer/NodeType";
class NodeHandler {
    /**
     * nodeMap
     * @type { Map<String,NodeItem> }
     */
    #nodeMap = new Map();

    #startNode;

    #endNode;
    constructor(nodeData) {
        Object.keys(nodeData).forEach(nodeName=>{
            let node = NodeItem.parse(nodeData[nodeName]);
            if(node.type ===NodeType.START) {
                if(this.#startNode) {
                    throw new Error('【flow-designer】NodeHandler创建失败；只能有一个起始节点')
                }
                this.#startNode = node;
            }

            if(node.type ===NodeType.END) {
                if(this.#endNode) {
                    throw new Error('【flow-designer】NodeHandler创建失败；只能有一个结束节点')
                }
                this.#endNode = node;
            }

            let nextNodeNames = node.nextNodeNames;
            nextNodeNames.forEach(nextNodeName=>{
                if(this.#nodeMap.has(nextNodeName)) {
                    throw  new Error('【flow-designer】NodeHandler创建失败；后续节点不支持已被定义的节点')
                }
            })
            //core
            this.#nodeMap.set(nodeName,node)
        })

        if(!this.#startNode) {
            throw new Error('【flow-designer】NodeHandler创建失败；没有起始节点')
        }
        if(!this.#endNode) {
            throw new Error('【flow-designer】NodeHandler创建失败；没有结束节点')
        }
    }

    /**
     *
     * @return NodeItem
     */
    getStartNode() {
        return this.#startNode;
    }

    /**
     *
     * @return NodeItem
     */
    getEndNode() {
        return this.#endNode;

    }

    /**
     * 是否拥有后续节点
     * @return boolean
     */
    hasNextNodes(nodeName) {
        let node = this.#nodeMap.get(nodeName);
        console.log(node)
        let nextNodeNames = node.nextNodeNames;
        return !!nextNodeNames.length;
    }

    /**
     * 获取指定节点的后续节点
     * @param nodeName 节点名称
     * @return NodeItem
     */
    getNextNode(nodeName) {
        let node = this.#nodeMap.get(nodeName);
        if(!node) {
            throw new Error('【flow-designer】NodeHandler获取后续节点失败；指定节点不存在')
        }
        let nextNodeNames = node.nextNodeNames;
        if(!nextNodeNames.length) {
            return null;
        }

        if(nextNodeNames.length === 1) {
            return this.getNode(nextNodeNames[0])
        }

        // judge or parallel

    }

    /**
     * 获取指定节点
     * @param nodeName
     * @return NodeItem
     */
    getNode(nodeName) {
        return this.#nodeMap.get(nodeName)
    }

    /**
     * 插入节点
     * @desc 在 source 和 target之间插入；注意：必须是两个相邻的节点，否则报错
     * @param sourceName  source节点名
     * @param targetName target节点名
     * @param option {Object} 操作
     */
    insertNode(sourceName,targetName,option) {
        let source = this.getNode(sourceName);
        if(!source) {
            throw new Error('【flow-designer】NodeHandler插入节点出错: source节点不存在')
        }

        let nextNodeNames = source.nextNodeNames;
        if(!nextNodeNames.includes(targetName)) {
            throw new Error('【flow-designer】NodeHandler插入节点出错：无法在两个不相邻的节点中插入')
        }

        let target = this.getNode(targetName);
        if(target) {
            throw new Error('【flow-designer】NodeHandler插入节点出错: target节点不存在')
        }

        console.log(option)


    }

    /**
     * 更新node
     * @desc 更新节点的同时，回调所有的更新事件
     * @param nodeName 节点名
     * @param node 更新内容
     */
    updateNode(nodeName,node) {
        if(!node) {
            throw new Error('【flow-designer】NodeHandler更新节点出错: 更新内容不存在')
        }
        let original = this.getNode(nodeName);
        if(original) {
            throw new Error('【flow-designer】NodeHandler更新节点出错: 要更新的节点不存在')
        }

        //TODO 更新操作

    }

}

export default NodeHandler;
