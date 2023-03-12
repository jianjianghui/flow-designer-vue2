/**
 * 业务适配器
 * @desc 调用方应先实现该方法，并在合理的地方调用
 */
class BusinessAdapter {


    /**
     * @return {BusinessAdapter}
     */
    static getBusinessAdapter() {

        //TODO your BusinessAdapter;
        class Business extends BusinessAdapter {
            static getBusinessAdapter() {
                return new Business();
            }

            getNodeData(params) {
                params;
                return [];
            }

            verifyNodeData(nodes) {
                super.verifyNodeData(nodes);
            }

            verifyNode(node) {
                super.verifyNode(node);
            }

            saveNode(node) {
                super.saveNode(node);
            }

            saveNodeData(nodes) {
                super.saveNodeData(nodes);
            }
        }

        return Business.getBusinessAdapter();
    }

    /**
     * 获取 nodeData 数据
     * @desc 返回的数组泛型应为 {@link NodeItem} 的object版本；
     * @desc 该方法被NodeContainer.vue 使用
     * @param params any
     * @return  {Object[]}
     */
    getNodeData(params) {
        params;
        throw new Error('【BusinessAdapter】 Not supported, Please override the method');
    }

    /**
     * 校验数据
     * @desc 校验不通过时应填充{@link NodeItem#error} 信息
     * @param nodes {NodeItem[]}
     */
    verifyNodeData(nodes) {
        nodes;
        throw new Error('【BusinessAdapter】 Not supported, Please override the method');
    }

    /**
     * 校验数据
     * @desc 校验不通过时应填充{@link NodeItem#error} 信息
     * @param node {NodeItem}
     * @return {{code:number,msg:string}}
     */
    verifyNode(node) {
        node;
        throw new Error('【BusinessAdapter】 Not supported, Please override the method');
    }

    /**
     * 保存数据
     * @desc 校验不通过时应填充{@link NodeItem#error} 信息
     * @param nodes {NodeItem[]}
     * @return VoidFunction
     */
    saveNodeData(nodes) {
        nodes;
        throw new Error('【BusinessAdapter】 Not supported, Please override the method');
    }

    /**
     * 保存数据 (单条)
     * @desc 校验不通过时应填充{@link NodeItem#error} 信息
     * @param node {NodeItem}
     * @return VoidFunction
     */
    saveNode(node) {
        node;
        throw new Error('【BusinessAdapter】 Not supported, Please override the method');
    }

}

export default BusinessAdapter;
