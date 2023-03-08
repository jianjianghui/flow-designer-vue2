import NodeItem from "@/components/flow/designer/NodeItem";
import NodeType from "@/components/flow/designer/NodeType";

class NodeHandler {
    /**
     * nodeMap
     * @type { Map<String,NodeItem> }
     */
    #nodeMap = new Map();

    /**
     * @type {NodeItem}
     */
    #startNode;

    /**
     * @type {NodeItem}
     */
    #endNode;

    constructor(nodeData) {
        nodeData.forEach(nodeItem => {
            let node = NodeItem.parse(nodeItem);
            if (node.type === NodeType.START) {
                if (this.#startNode) {
                    throw new Error('【flow-designer】NodeHandler创建失败；只能有一个起始节点')
                }
                this.#startNode = node;
            }

            if (node.type === NodeType.END) {
                if (this.#endNode) {
                    throw new Error('【flow-designer】NodeHandler创建失败；只能有一个结束节点')
                }
                this.#endNode = node;
            }

            //core
            this.#nodeMap.set(node.name, node)
        })

        if (!this.#startNode) {
            throw new Error('【flow-designer】NodeHandler创建失败；没有起始节点')
        }
        if (!this.#endNode) {
            throw new Error('【flow-designer】NodeHandler创建失败；没有结束节点')
        }

        let node = this.#startNode;
        let set = new Set();
        try {
            this.#check(set, node)
        } catch (result) {
            if (result.msg) {
                throw new Error('【flow-designer】NodeHandler创建失败；' + result.msg)
            }
            throw new Error('【flow-designer】NodeHandler创建失败；' + result)
        }

        window.nodeHandler = this;

    }

    getMap() {
        return this.#nodeMap;
    }

    #check(set, node) {
        if (node.type === NodeType.END) {
            return;
        }
        set.add(node.name);

        //child
        node.childNodeNames && node.childNodeNames.forEach(nodeName => {
            this.#check(set, this.getNode(nodeName));
        })

        //next
        if (!node.nextNodeName) {
            return;
        }
        let nextNode = this.getNode(node.nextNodeName);
        if (node.nextNodeName && !nextNode) {
            throw {success: false, msg: `node:${node.name}的后续步骤不存在${node.nextNodeName}`};
        }

        console.log(node, node.nextNodeName, nextNode)
        if (set.has(nextNode.name)) {
            throw {success: false, msg: '不支持循环节点:' + nextNode.name};
        }
        if (nextNode) {
            this.#check(set, nextNode);
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
    hasNextNode(nodeName) {
        let node = this.#nodeMap.get(nodeName);
        let nextNodeName = node.nextNodeName;
        return !!nextNodeName;
    }

    /**
     * 获取指定节点的后续节点
     * @param nodeName 节点名称
     * @return NodeItem
     */
    getNextNode(nodeName) {
        let node = this.#nodeMap.get(nodeName);
        if (!node) {
            throw new Error('【flow-designer】NodeHandler获取后续节点失败；指定节点不存在')
        }
        return this.getNode(node.nextNodeName)
    }

    /**
     * 是否拥有节点
     * @return boolean
     */
    hasNode(nodeName) {
        return this.#nodeMap.has(nodeName)
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
    insertNode(sourceName, targetName, option) {
        let source = this.getNode(sourceName);
        if (!source) {
            throw new Error('【flow-designer】NodeHandler插入节点出错: source节点不存在')
        }

        let nextNodeNames = source.nextNodeName;
        if (!nextNodeNames.includes(targetName)) {
            throw new Error('【flow-designer】NodeHandler插入节点出错：无法在两个不相邻的节点中插入')
        }

        let target = this.getNode(targetName);
        if (target) {
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
    updateNode(nodeName, node) {
        if (!node) {
            throw new Error('【flow-designer】NodeHandler更新节点出错: 更新内容不存在')
        }
        let original = this.getNode(nodeName);
        if (original) {
            throw new Error('【flow-designer】NodeHandler更新节点出错: 要更新的节点不存在:' + nodeName)
        }

        //TODO 更新操作
        this.deleteNode(nodeName);
        this.#nodeMap.set(node.name, node)
    }

    deleteNode(nodeName) {
        this.#nodeMap.delete(nodeName)
    }

}

export default NodeHandler;
