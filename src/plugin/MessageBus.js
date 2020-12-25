import util from "@/util/util";
import store from "@/store/store";
import _ from 'lodash';
import { logDecorator } from "@/plugin/LogFactory";

let MessageBus = {
    initComplete: false, //预览页事件初始化状态
    totalHandlerCount: 0, //事件总线中所有的接收事件数量，用来统计和计算初始化是否完成
    totalCycleRegister: 0, //统计总线中所有的参与轮播配置的组件，用来统计和计算轮播组件是否加载完成，用于预览页轮播状态
    timer: null, //默认触发事件缓冲队列计时器 延迟所有默认触发事件至事件总线初始化完成 initComplete=true
    eventCols: {}, //事件关联关系 键 事件名 值：事件对象 -》内涵evtHandler 接收事件列表
    waitChain: [], //默认触发事件延迟队列
    cycleTree: {}, //轮播树结构
    cycleList: {}, //轮播组件列表
    cycleTimer: {}, //轮播计时器列表 键：轮播树ID 值：timer
    //事件执行
    async: function(args, handler) {
        setTimeout(() => {
            handler.apply(handler, [args])
        }, 10)
    },
    @logDecorator("plugin/MessageBus.js")
    _checkComplete() {
        if (this.timer) {
            return;
        }
        let that = this
        this.timer = setInterval(() => {
            //组件全部初始化完成后释放队列中缓存的默认事件
            if (store.getters.getPreviewState && that.initComplete) {
                that.waitChain.forEach((item) => {
                        that.emit(item.name, item.dt)
                    })
                    // store.commit('changeEventLoaded', true) //事件加载完成
                clearInterval(that.timer)
                that.timer = null;
                setTimeout(() => {
                    that.waitChain = [];
                }, 5000)
            }
        }, 200)
    },
    //获取事件列表
    @logDecorator("plugin/MessageBus.js")
    getEvents: function() {
        let eventCanSelect = [];
        for (let key in this.eventCols) {
            if (this.eventCols[key].explosive) {
                eventCanSelect.push(this.eventCols[key])
            }
        }
        return eventCanSelect;
    },
    //保存设计时总线事件关联关系
    @logDecorator("plugin/MessageBus.js")
    getSaveRels() {
        let saveObj = {};
        for (let key in this.eventCols) {
            saveObj[key] = {
                id: this.eventCols[key].id,
                name: this.eventCols[key].name,
                source: this.eventCols[key].source,
                evtData: this.eventCols[key].evtData,
                evtType: this.eventCols[key].evtType,
                explosive: this.eventCols[key].explosive,
                ctrlShow: this.eventCols[key].ctrlShow,
                def: this.eventCols[key].def,
                evtHandler: {}
            }
            let evtHandler = this.eventCols[key].evtHandler;
            for (let e in evtHandler) {
                saveObj[key].evtHandler[e] = { _source: evtHandler[e]._source }
            }
        }
        return { evtCols: saveObj, cycle: Object.keys(this.cycleList).length }
    },
    //获取事件对象
    @logDecorator("plugin/MessageBus.js", ['sourceComp', 'evtType'])
    getEvtObj(sourceComp, evtType) {
        let evtName = [sourceComp, evtType].join(":")
        return this.eventCols[evtName]
    },
    //根据保存的关联关系还原事件总线 通知各组件重新注册 =>运行时调用
    @logDecorator("plugin/MessageBus.js", ['busStore'])
    initialize(busStore) {
        // store.commit('changeEventLoaded', false)
        this.totalHandlerCount = 0 //初始化待绑定组件数量
        let evtRels = busStore.evtCols
        this.totalCycleRegister = busStore.cycle
        this.initComplete = false;
        let evtRevs = {};
        for (let key in evtRels) {
            let evtHandler = evtRels[key].evtHandler;
            this.eventCols[key] = {
                id: evtRels[key].id, //事件id
                name: evtRels[key].name, //事件名
                source: evtRels[key].source, //事件原始配置
                evtData: evtRels[key].evtData, //触发事件元数据
                evtType: evtRels[key].evtType, //事件类型
                explosive: evtRels[key].explosive, //对外暴露
                ctrlShow: evtRels[key].ctrlShow, //显隐控制
                def: evtRels[key].def, //默认触发配置
                evtHandler: {} //接收事件列表
            }
            for (let e in evtHandler) {
                this.totalHandlerCount++;
                let targetId = e.split(":")[0]
                if (evtRevs.hasOwnProperty(targetId)) {
                    evtRevs[targetId].push(evtHandler[e]._source)
                } else {
                    evtRevs[targetId] = [evtHandler[e]._source]
                }
            }
        }
        for (let key in evtRevs) {
            store.commit('modifyValueByCompId', {
                attrs: [key, 'linkage', 'linkRevEvents'],
                value: []
            })
            store.commit('modifyValueByCompId', {
                attrs: [key, 'linkage', 'linkRevEvents'],
                value: evtRevs[key]
            })
        }
    },
    //组件删除 组件数据配置更改 触发关联事件移除 （触发、接收）
    @logDecorator("plugin/MessageBus.js", ['compId'])
    destroy(compId) {
        let compConf = store.getters.getCompConf(compId);
        let linkageConf = compConf.linkage;
        if (linkageConf && linkageConf.linkEvents) {
            let tempSLinks = _.cloneDeep(linkageConf.linkEvents)
            for (let i = 0; i < tempSLinks.length; i++) {
                let evtConf = tempSLinks[i];
                let evtTrigger = this.eventCols[evtConf.evtName];
                for (let key in evtTrigger.evtHandler) {
                    let targetCompId = key.split(":")[0]
                    let targetCompConf = store.getters.getCompConf(targetCompId);
                    let targetLinkageConf = targetCompConf.linkage;
                    if (targetLinkageConf && targetLinkageConf.linkRevEvents) {
                        let tempTRevLinks = _.cloneDeep(targetLinkageConf.linkRevEvents)
                        for (let j = 0; j < tempTRevLinks.length; j++) {
                            if (tempTRevLinks[j].evtName === evtConf.evtName) {
                                tempTRevLinks.splice(j, 1)
                                break;
                            }
                        }
                        store.commit('modifyValueByCompId', {
                            attrs: [targetCompId, 'linkage', 'linkRevEvents'],
                            value: tempTRevLinks
                        })
                    }
                }
                this.unregister(...evtConf.evtName.split(":"))
            }
        }
        if (linkageConf && linkageConf.linkRevEvents) {
            let tempSRevLinks = _.cloneDeep(linkageConf.linkRevEvents)
            tempSRevLinks.forEach(evt => {
                this.un(evt.evtName, compId)
            })
        }
        if (linkageConf && linkageConf.cycleEvents && Object.keys(linkageConf.cycleEvents).length > 0) {
            this.removeCycleNode(linkageConf.cycleEvents)
        }
        store.commit('modifyValueByCompId', {
            attrs: [compId, 'linkage', 'linkRevEvents'],
            value: []
        })
        store.commit('modifyValueByCompId', {
            attrs: [compId, 'linkage', 'linkEvents'],
            value: []
        })
        store.commit('modifyValueByCompId', {
            attrs: [compId, 'linkage', 'cycleEvents'],
            value: {}
        })
    },
    //注册组件触发事件
    @logDecorator("plugin/MessageBus.js", ['evtObj'])
    register(evtObj) {
        let id = [evtObj.sourceComp, evtObj.evtType, util.guid()].join("$")
        let name = [evtObj.sourceComp, evtObj.evtType].join(":")
        if (!this.eventCols.hasOwnProperty(name)) {
            this.eventCols[name] = {
                id: id,
                name: name,
                source: evtObj.sourceComp,
                evtData: evtObj.evtData,
                evtType: evtObj.evtType,
                explosive: evtObj.explosive,
                ctrlShow: evtObj.ctrlShow,
                def: evtObj.def,
                evtHandler: {}
            }
        } else {
            //处理重复注册
            this.eventCols[name].evtData = evtObj.evtData;
            this.eventCols[name].explosive = evtObj.explosive;
            this.eventCols[name].ctrlShow = evtObj.ctrlShow;
            this.eventCols[name].def = evtObj.def;
        }
        return name;
    },
    //注册组件接收事件
    @logDecorator("plugin/MessageBus.js", ['evtObj', 'func'])
    on(evtObj, func) {
        let evtTrigger = this.eventCols[evtObj.evtName];
        if (evtTrigger) {
            let evtHandler = evtTrigger.evtHandler;
            let name = [evtObj.targetComp, evtObj.evtName.split(":")[1]].join(":")
            evtHandler[name] = {
                method: func, //接收事件方法
                target: evtObj.targetComp, //接收事件组件id
                refType: evtObj.refType, //事件数据关联方式
                refData: evtObj.refData, //接收组件数据元数据
                _source: evtObj //接收事件原始配置
            }
        }
        this.totalHandlerCount--;
        if (store.getters.getPreviewState && this.totalHandlerCount === 0) {
            this.initComplete = true;
        }
    },
    //取消注册接收事件
    @logDecorator("plugin/MessageBus.js", ['evtName', 'targetComp'])
    un(evtName, targetComp) {
        let evtTrigger = this.eventCols[evtName];
        if (evtTrigger) {
            let name = [targetComp, evtName.split(":")[1]].join(":");
            let evtHandler = evtTrigger.evtHandler;
            if (evtHandler.hasOwnProperty(name)) {
                delete this.eventCols[evtName].evtHandler[name]
            }
        }
    },
    //取消注册组件触发事件
    @logDecorator("plugin/MessageBus.js", ['sourceComp', 'evtType'])
    unregister(sourceComp, evtType) {
        let evtName = [sourceComp, evtType].join(":")
        let evtTrigger = this.eventCols[evtName];
        if (evtTrigger) {
            delete this.eventCols[evtName]
        }
    },
    //触发事件调用
    @logDecorator("plugin/MessageBus.js", ['evtName', 'evtData'])
    emit(evtName, evtData) {
        if (store.getters.getPreviewState && !this.initComplete) {
            this.waitChain.push({ name: evtName, dt: _.cloneDeep(evtData) });
            this._checkComplete();
        } else {
            let evtTrigger = this.eventCols[evtName];
            if (evtTrigger) {
                let evtHandler = evtTrigger.evtHandler;
                for (let key in evtHandler) {
                    let eventObj = {
                        name: evtName,
                        ctrlShow: evtTrigger.ctrlShow,
                        refType: evtHandler[key].refType,
                        refData: evtHandler[key].refData,
                        source: evtTrigger.source,
                        target: evtHandler[key].target,
                        data: evtData.data,
                        switchVisible: evtData.switchVisible
                    }
                    this.async(eventObj, evtHandler[key].method)
                }
            }
        }
    },
    //注册轮播节点，构建目录树
    @logDecorator("plugin/MessageBus.js", ['cycleConf'])
    registerCycle(cycleConf) {
        if (!cycleConf.sid) {
            return;
        }
        let chainObj = {
                active: cycleConf.active, //轮播状态
                pid: cycleConf.pid, //父组件id
                sid: cycleConf.sid, //当前组件id
                sname: cycleConf.sname, //组件名
                index: 0, //轮播索引、游标
                type: cycleConf.type, //轮播方式
                refEvt: cycleConf.refEvt, //轮播关联事件名
                interval: cycleConf.interval, //轮播间隔 秒
                next: cycleConf.next, //轮播下一个方法
                reset: cycleConf.reset, //轮播重置方法
            }
            //检查注册对象是否存在且是否重复注册
        if (this.cycleList.hasOwnProperty(cycleConf.sid)) {
            let diffKeys = [];
            let oldNode = this.cycleList[cycleConf.sid]
            for (let k in oldNode) {
                //cid ：轮播树id ，isLeaf：是否为叶子节点  childs：轮播树节点子节点列表  deep:节点层级
                if (oldNode[k] !== chainObj[k] && ['cid', 'isLeaf', 'childs', 'deep', 'index'].indexOf(k) === -1) {
                    diffKeys.push(k)
                }
            }
            //仅active变化的 不需要更新轮播树,
            if (diffKeys.indexOf('active') !== -1 && diffKeys.length === 1) {
                this._modifyCycleState(chainObj);
                return;
            }
            //无变化字段的 也不更新轮播树
            if (diffKeys.length === 0) {
                return;
            }
        }
        this.cycleList[cycleConf.sid] = chainObj
        this.cycleTree = {};
        this._buildCycleTree();
        //预览页首次加载时还原轮播状态
        if (store.getters.getPreviewState && this.totalCycleRegister === Object.keys(this.cycleList).length) {
            for (let k in this.cycleTree) {
                let tree = this.cycleTree[k]
                this._modifyCycleState(tree[Object.keys(tree)[0]])
            }
            //编辑页首次加载还原轮播状态
        } else if (!store.getters.getPreviewState) {
            // 去掉totalCycleRegister判断是因为第一次保存时 为0 无法满足条件
            // } else if (!store.getters.getPreviewState && this.totalCycleRegister === Object.keys(this.cycleList).length) {

            for (let k in this.cycleTree) {
                // 这里的逻辑应该是判断轮播状态为active时先清掉轮播链上的每一个轮播 然后开启轮播链，轮播链上可能只有1个轮播或多个轮播
                let tree = this.cycleTree[k]
                if (Object.keys(tree).length === 1 && tree[Object.keys(tree)[0]].active && k === chainObj.cid) {
                    this.stopCycle(tree)
                    this.startCycle(tree)
                } else if (Object.keys(tree).length > 1 && tree[Object.keys(tree)[0]].active) {
                    this.stopCycle(tree)
                    this.startCycle(tree)
                }
            }
        }
        return chainObj;
    },
    //销毁轮播
    @logDecorator("plugin/MessageBus.js", ['node'])
    removeCycleNode(node) {
        let nodeObj = this.cycleList[node.sid]
        let tree = this.cycleTree[nodeObj.cid];
        if (tree) {
            for (let k in this.cycleTree) {
                this.stopCycle(this.cycleTree[k])
            }
            //清理父节点是当前待删除节点的节点
            let delSid = nodeObj.sid
            delete this.cycleList[node.sid]
            this.cycleTree = {};
            for (let k in this.cycleList) {
                let node = this.cycleList[k]
                if (node.pid === delSid) {
                    node.pid = "";
                    store.commit('modifyValueByCompId', {
                        attrs: [node.sid, 'linkage', 'cycleEvents', 'pid'],
                        value: ''
                    })
                }
                store.commit('modifyValueByCompId', {
                    attrs: [node.sid, 'linkage', 'cycleEvents', 'active'],
                    value: false
                })
            }
            this._buildCycleTree();
        }
    },
    //获取轮播父节点列表
    getChainsNodes(compId) {
        let chainNode = [];
        for (let k in this.cycleList) {
            let node = this.cycleList[k]
            if (node.pid !== compId && node.sid !== compId) {
                chainNode.push(_.cloneDeep(this.cycleList[k]))
            }
        }
        return chainNode
    },
    // 执行轮播
    courseExe(leaf) {
        for (let i = 0; i < leaf.length; i++) {
            if (leaf[i].index === -1) {
                leaf[i].waiting = true;
                if (!_.isEmpty(leaf[i].pid)) {
                    //处理父节点状态
                    this._processParent(leaf[i])
                } else {
                    //无父节点直接还原
                    leaf[i].index = leaf[i].reset();
                }
                continue;
            }
            leaf[i].index = leaf[i].next();
        }
    },
    //开启轮播
    startCycle(tree) {
        let leaf = [];
        //轮播开始时第一次状态设置
        for (let k in tree) {
            if (tree[k].isLeaf) {
                leaf.push(tree[k])
            } else {
                tree[k].index = tree[k].next()
            }
        }
        let interval = 0;
        for (let i = 0; i < leaf.length; i++) {
            if (leaf[i].interval > interval) {
                interval = leaf[i].interval;
            }
        }
        if (this.cycleTimer.hasOwnProperty(leaf[0].cid)) {
            return;
        }
        this.courseExe(leaf)
        this.cycleTimer[leaf[0].cid] = setInterval(() => {
            this.courseExe(leaf)
                // for (let i = 0; i < leaf.length; i++) {
                //     if (leaf[i].index === -1) {
                //         leaf[i].waiting = true;
                //         if (!_.isEmpty(leaf[i].pid)) {
                //             this._processParent(leaf[i])
                //         } else {
                //             leaf[i].index = leaf[i].reset();
                //         }
                //         continue;
                //     }
                //     leaf[i].index = leaf[i].next();
                // }
        }, interval * 1000)
    },
    //停止轮播
    stopCycle(tree) {
        let k = tree[Object.keys(tree)[0]].cid
        let timer = this.cycleTimer[k]
        if (timer) {
            clearInterval(timer)
            delete this.cycleTimer[k]
            for (let k in tree) {
                tree[k].reset()
            }
        }
    },
    //递归处理父节点
    _processParent(leaf) {
        let tree = this.cycleTree[leaf.cid]
        let parNode = tree[leaf.pid];
        //检查子节点状态
        let ready = this._checkChild(tree, parNode)
        if (ready) {
            if (parNode.index === -1 && !_.isEmpty(parNode.pid)) {
                parNode.waiting = true
                this._processParent(parNode)
                return;
            } else if (parNode.index === -1 && _.isEmpty(parNode.pid)) {
                parNode.index = parNode.reset();
                return;
            } else {
                for (let i = 0; i < parNode.childs.length; i++) {
                    let chd = tree[parNode.childs[i]]
                    chd.index = chd.reset()
                    delete tree[parNode.childs[i]]['waiting']
                }
            }
            parNode.index = parNode.next();
        }

    },
    _checkChild(tree, parNode) {
        let chIndexes = []
        let chFlag = []
            //收集子节点轮播状态index
        for (let i = 0; i < parNode.childs.length; i++) {
            chIndexes.push(tree[parNode.childs[i]].index)
                //子节点处于waiting状态 说明在等待兄弟节点完成轮播
            if (tree[parNode.childs[i]].waiting) {
                chFlag.push(1)
            }
        }
        //当等待节点小于兄弟节点总个数 状态检查返回未完成 父节点状态不变更
        if (chFlag.length < parNode.childs.length) {
            return false
        }
        let ready = true;
        //当所有子节点全部完成轮播 状态检查返回真 父节点进行处理
        for (let i = 0; i < chIndexes.length; i++) {
            if (chIndexes[i] !== -1) {
                ready = false
                break;
            }
        }
        return ready
    },
    //修改轮播状态
    _modifyCycleState(node) {
        for (let k in this.cycleTree) {
            let tree = this.cycleTree[k];
            let open = [],
                close = []
            if (tree.hasOwnProperty(node.sid)) {
                for (let key in tree) {
                    if (tree[key].active) {
                        open.push(true)
                    } else {
                        close.push(false)
                    }
                }
                let st = open.length < close.length
                if (store.getters.getPreviewState && open.length === Object.keys(tree).length) {
                    st = true
                } else if (store.getters.getPreviewState && close.length === Object.keys(tree).length) {
                    st = false;
                }
                if (st) {
                    this.startCycle(tree)
                } else {
                    this.stopCycle(tree)
                }
                for (let key in tree) {
                    tree[key].active = st;
                    this.cycleList[key].active = st;
                    store.commit('modifyValueByCompId', {
                        attrs: [key, 'linkage', 'cycleEvents', 'active'],
                        value: st
                    })
                }
            }
        }
    },
    //构建轮播树
    _buildCycleTree() {
        for (let k in this.cycleList) {
            let node = this.cycleList[k];
            if (_.isEmpty(node.pid)) {
                let chainId = util.guid();
                node.cid = chainId;
                node.deep = 0;
                this.cycleTree[chainId] = {
                    [node.sid]: node
                };
                this._findChildNode(this.cycleTree[chainId], node.sid, chainId, 0)
            }
        }
        for (let k in this.cycleTree) {
            let nodes = this.cycleTree[k];
            if (Object.keys(nodes).length === 1) {
                nodes[Object.keys(nodes)[0]].isLeaf = true;
                continue;
            }
            let pids = [];
            for (let t in nodes) {
                pids.push(nodes[t].pid)
            }
            for (let t in nodes) {
                nodes[t].isLeaf = pids.indexOf(nodes[t].sid) === -1 && !_.isEmpty(nodes[t].pid);
            }
        }
    },
    //查找轮播树子节点
    _findChildNode(tree, pid, chainId, deep) {
        if (pid) {
            deep++;
            let childs = [];
            for (let k in this.cycleList) {
                let node = this.cycleList[k];
                if (node.pid === pid) {
                    node.cid = chainId;
                    node.deep = deep
                    tree[node.sid] = node;
                    let dep = deep
                    this._findChildNode(tree, node.sid, chainId, dep)
                    childs.push(node.sid);
                }
            }
            tree[pid].childs = childs;
        }
    },
    clearCycle() {
        for (let k in this.cycleTimer) {
            clearInterval(this.cycleTimer[k])
        }
    }
}

export default MessageBus;