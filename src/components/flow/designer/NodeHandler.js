import NodeItem from "@/components/flow/designer/NodeItem";
import NodeType from "@/components/flow/designer/NodeType";

class NodeHandler {

    static #codeIndex = {};
    /**
     * nodeMap
     * @type { Map<String,NodeItem> }
     */
    #nodeMap = new Map();

    /**
     * nodeMap
     * @type { Map<String,String> }
     */
    #preNodeMap = new Map();

    /**
     * parentNodeMap
     * @type { Map<String,String[]> }
     */
    #parentNodeMap = new Map();

    /**
     * 起始节点
     * @type {NodeItem}
     */
    #startNode;

    /**
     * 结束节点
     * @type {NodeItem}
     */
    #endNode;

    #refreshFunc;

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
            this.#nodeMap.set(node.code, node)
            if (node.nextNodeCode) {
                console.log(node.code)
                this.addPre(node)
            }
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

    setRefresh(func) {
        this.#refreshFunc = func;
    }

    refresh() {
        if (!this.#refreshFunc) {
            throw new Error('【flow-designer】NodeHandler刷新失败；未定义刷新方法')
        }
        this.#refreshFunc();
    }

    getMap() {
        return this.#nodeMap;
    }

    getPreMap() {
        return this.#preNodeMap;

    }

    #check(set, node) {
        if (node.type === NodeType.END) {
            return;
        }
        set.add(node.code);

        //child
        node.childNodeCodes && node.childNodeCodes.forEach(nodeCode => {
            let childNode = this.getNode(nodeCode);
            if (!childNode) {
                throw {success: false, msg: `node:${node.name}的子步骤不存在${nodeCode}`};
            }
            this.#check(set, childNode);
        })

        //next
        if (!node.nextNodeCode) {
            return;
        }
        let nextNode = this.getNode(node.nextNodeCode);
        if (node.nextNodeCode && !nextNode) {
            throw {success: false, msg: `node:${node.name}的后续步骤不存在${node.nextNodeCode}`};
        }

        if (set.has(nextNode.code)) {
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
    hasNextNode(nodeCode) {
        let node = this.#nodeMap.get(nodeCode);
        let nextNodeCode = node.nextNodeCode;
        return !!nextNodeCode;
    }

    /**
     * 获取指定节点的后续节点
     * @param nodeCode 节点编码
     * @return NodeItem
     */
    getNextNode(nodeCode) {
        let node = this.#nodeMap.get(nodeCode);
        if (!node) {
            throw new Error('【flow-designer】NodeHandler获取后续节点失败；指定节点不存在')
        }
        return this.getNode(node.nextNodeCode)
    }

    /**
     * 是否拥有节点
     * @return boolean
     */
    hasNode(nodeCode) {
        return this.#nodeMap.has(nodeCode)
    }

    /**
     * 获取指定节点
     * @param nodeCode
     * @return NodeItem
     */
    getNode(nodeCode) {
        return this.#nodeMap.get(nodeCode)
    }

    getPreNode(nodeCode) {
        return this.getNode(this.#preNodeMap.get(nodeCode));
    }


    addNode(node) {
        let code = node.code;
        while (this.#nodeMap.has(node.code)) {
            if (!NodeHandler.#codeIndex[code]) {
                NodeHandler.#codeIndex[code] = 0;
            }
            node.code = code + NodeHandler.#codeIndex[code]++;
        }

        this.#nodeMap.set(node.code, node);
        if (node.nextNodeCode) {
            this.addPre(node)
        }
    }

    addPre(node) {
        this.#preNodeMap.delete(node.nextNodeCode)
        if (node.nextNodeCode) {
            this.#preNodeMap.set(node.nextNodeCode, node.code);
        }

    }

    /**
     * 更新后续步骤
     * @param node {NodeItem}
     * @param nextNodeCode {string}
     */
    #updateNextNodeCode(node, nextNodeCode) {
        node.nextNodeCode = nextNodeCode;
        this.addPre(node)
    }

    /**
     * 插入节点
     * @desc 在 source 之后插入；
     * @param sourceCode  source节点名
     * @param option {Object} 操作
     */
    insertNode(sourceCode, option) {
        let source = this.getNode(sourceCode);
        if (!source) {
            throw new Error('【flow-designer】NodeHandler插入节点出错: source节点不存在')
        }

        let nextNodeCode = source.nextNodeCode;

        let target = this.getNode(nextNodeCode);

        let type = option.type;
        let nodeType = NodeType.getNodeType(type);

        if (nodeType.mode === 'single') {
            let node = NodeType.createNode(type);
            this.addNode(node);

            if (target) {
                this.#updateNextNodeCode(node, target.code);
            }

            this.#updateNextNodeCode(source, node.code);
        }

        if (nodeType.mode === 'wrap') {
            let nodes = NodeType.createWrap(type);

            let nodeWrap = nodes[0];

            this.addNode(nodeWrap);
            let nodeWrapCode = nodeWrap.code;
            for (let i = 1; i < nodes.length; i++) {
                let node = nodes[i];
                node.code = nodeWrapCode + node.name;
                this.addNode(node);
                nodeWrap.childNodeCodes.push(node.code)
            }

            if (target) {
                this.#updateNextNodeCode(nodeWrap, target.code);
            }
            this.#updateNextNodeCode(source, nodeWrapCode);
        }


        this.refresh();
    }

    /**
     * 包装这个节点
     * @desc 对source节点进行一次包装
     * @param sourceCode source节点名
     * @param option {Object} 操作
     */
    wrapNode(sourceCode, option) {
        let source = this.getNode(sourceCode);
        if (!source) {
            throw new Error('【flow-designer】NodeHandler包装节点出错: source节点不存在')
        }

        let type = option.type;
        let nodeType = NodeType.getNodeType(type);
        if (nodeType.mode !== 'wrap') {
            throw new Error('【flow-designer】NodeHandler包装节点出错: 包装节点类型的模式必须为包装；非预期:' + nodeType.mode)
        }

        let nodes = NodeType.createWrap(type);
        let nodeWrap = nodes[0];
        let node1 = nodes[1];

        this.addNode(nodeWrap);
        let nodeWrapCode = nodeWrap.code;
        for (let i = 1; i < nodes.length; i++) {
            let node = nodes[i];
            node.code = nodeWrapCode + node.name;
            this.addNode(node);
            nodeWrap.childNodeCodes.push(node.code)
        }
        let sourcePreNode = this.getPreNode(sourceCode);

        let lastNode = null;
        // 只能有个结束节点，尝试寻找后续节点为结束类型,并设置为null
        {
            let code = sourceCode;
            // eslint-disable-next-line no-constant-condition
            while (true) {
                let nextNode = lastNode = this.getNextNode(code);
                if (!nextNode) {
                    break;
                }
                if (nextNode.type === NodeType.END) {
                    this.#updateNextNodeCode(this.getNode(code), null);
                    break;
                }
                code = nextNode.code;
            }

        }
        this.#updateNextNodeCode(sourcePreNode, nodeWrapCode);
        this.#updateNextNodeCode(nodeWrap, lastNode?.code);
        this.#updateNextNodeCode(node1, source.code);


        this.refresh()
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
        // this.deleteNode(nodeName);
        this.#nodeMap.set(node.code, node)
    }

    /**
     * 删除节点
     * @param nodeName
     */
    deleteNode(nodeName) {
        //删除源节点
        this.#nodeMap.delete(nodeName)
    }

}

export default NodeHandler;
