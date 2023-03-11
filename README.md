# flow-designer 设计器

> 仿钉钉/企业微信工作流设计器

## 主要功能

* 尽可能复刻钉钉/企业微信工作流样式和交互
* 支持自定义节点类型
* 支持序列化/反序列化
* 提供适配接口

## 设计思路

1. 只有一个起始节点和结束节点；用户交互操作只是插入；
2. 整体节点渲染模式就两种，单节点、节点包装（放节点的容器、网关）；例如：审批节点就是单节点；条件节点、并行网关就是节点包装；而并行网关这个概念似乎是尝试解释这种节点包装渲染模式而被强行赋予的概念
3. 除了结束节点，其他所有节点都会额外有个<b>添加节点</b>
4. 渲染方式是自上而下的、垂直对齐的
5. 头节点有3种情况 分别为 发起节点（工作流的第一步），分支节点（条件节点、并行节点） ；分支节点存储分支网关节点
6. 尾节点有2种情况 分别为 结束节点，以及 null ，其中根据第1条设计原则，只有一个节点的后续节点为结束，其余都属于分支节点尾节点

## 技术细节

1. 基于vue2的，antd
2. 支持序列化/反序列化;(json) 扁平化
3. 提供适配器对接其他工作流模型；
4. 抽象出操作API，经可能保证页面与逻辑分离，以便支持其他mvvm框架
6. 样式 与 行为 彻底分离，以便支持其他mvvm框架

## package-info

* ``src/components/flow/designer/node`` 目录存储所有已定义的节点
* ``src/components/flow/designer/NodeContainer.vue``为工作流渲染器容器，业务组件应该引用此组件
* ``src/components/flow/designer/NodeHandler.js``定义所有的逻辑行为
* ``src/components/flow/designer/package-info.js`` 额外信息

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 参考

感谢以下开源项目提供设计上的思路

* [scui](https://gitee.com/lolicode/scui)
* [Workflow](https://github.com/StavinLi/Workflow)

