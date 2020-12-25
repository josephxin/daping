import { MessageBox } from 'element-ui'
import util from '../util/util'
import openLeft from '../assets/image/openLeft.png'
import openRight from '../assets/image/openRight.png'
import api from "@/api/design"
import projectApi from "@/api/project"

export default {

    state: {

        pageId: '', // 页面唯一编号
        status: '1', // 页面状态 1为编辑状态；2为发布状态
        pageIdMsg: {
            name: '',
            description: '',
            image: ''
        },

        //token
        token: '',
        // 导航栏组件 （顶部）
        nav: {
            idName: '',
            height: 60
        },
        // 组件列表组件 （左边）
        comList: {
            idName: 'comListPanel',
            width: 160,
            height: 0,
            left: 0,
            switchLeft: 0,
            background: 'url(' + openLeft + ')',
            openState: true,
            switchInfo: '关闭'
        },
        // 预览组件（中间）
        preview: {
            idName: 'preview',
            width: 0,
            height: 0,
            preWidth: 0,
            preHeight: 0,
            margin: 0,
            padding: 0,
            scale: 0,
            stepSize: 0.3,
            screenWidth: 1920,
            screenHeight: 1080,
            baseWidth: 1360, //PC端默认最大宽度
            baseHeight: 0, //PC端默认计算出的最大高度
            background: '#1C2B3D', //url('+bgImg+')
            showGrid: false,
            backgroundImage: '' //背景图片
        },
        //全局参数，只在服务模式下生效
        globalParams: [], //设计时
        previewParams: {}, //预览时
        //是否开启日志功能
        isShowLog: window.debug,
        // 控制缩放组件（底部）
        controlZoom: {
            idName: '',
            height: 30,
            width: 0,
            left: 0,
            min: 0.2,
            max: 5
        },
        // 属性面板 （右边）
        prop: {
            idName: '',
            width: 460,
            right: 0,
            switchRight: 0,
            background: 'url(' + openRight + ')',
            openState: true,
            switchInfo: '关闭'
        }

    },
    getters: {
        getZoom: (state, getters, rootState) => () => {
            return state.preview.scale
        }
    },
    mutations: {
        // 页面初始化
        initPage(state) {
            const comListWith = state.comList.width,
                propWidth = state.prop.width;
            state.comList.switchLeft = comListWith;
            state.prop.switchRight = propWidth;
            state.controlZoom.left = comListWith;
            state.comList.height = 'calc(100vh - ' + state.nav.height + 'px)';
        },

        initPreviewSize(state, zoom) {
            if (!util.isBigScreen) {
                this.commit('setBaseHeight');
            }
            const height = document.querySelector('body').clientHeight - state.nav.height - state.controlZoom.height;
            const width = document.querySelector('body').clientWidth -
                (state.comList.width + state.comList.left + state.prop.width + state.prop.right);
            let preWidth = util.isBigScreen ? state.preview.screenWidth : state.preview.baseWidth;
            let preHeight = util.isBigScreen ? state.preview.screenHeight : state.preview.baseHeight;
            if (!zoom) {
                let zoomHeight = height / preHeight;
                let zoomWidth = width / preWidth;

                zoom = zoomWidth;
                if (zoomHeight < zoomWidth) {
                    zoom = zoomHeight;
                }

            }
            state.preview.scale = zoom;
            state.preview.width = width;
            state.preview.height = height;

            preWidth = parseInt(preWidth * zoom);

            preHeight = parseInt(preHeight * zoom);

            state.preview.preWidth = preWidth;
            state.preview.preHeight = preHeight;
            let isCalcTopPadding = false,
                isCalcLeftPadding = false,
                topPadding = 50,
                leftPadding = topPadding;

            const toolBarWidth = 5; // padding 必须舍去滚动条的宽度才能在隐藏滚动条时正常隐藏（margin不存在这个问题）
            if (preHeight < height - toolBarWidth) {
                topPadding = parseInt((height - preHeight - toolBarWidth) / 2);
                isCalcTopPadding = true;
            }
            leftPadding = 0
            if (preWidth < width - toolBarWidth) {
                leftPadding = parseInt((width - preWidth - toolBarWidth) / 2);
                isCalcLeftPadding = true;
            }

            if (isCalcTopPadding || isCalcLeftPadding) {
                const spaceError = 0; // 留白误差，为了防止在垂直或水平滚动条存在时，另一个不出现（因为滚动条高度变相增加了宽或高）
                if (isCalcLeftPadding && !isCalcTopPadding) {
                    leftPadding += spaceError;
                }
                if (isCalcTopPadding && !isCalcLeftPadding) {
                    topPadding += spaceError;
                }
                state.preview.padding = topPadding + "px " + leftPadding;
                // state.preview.padding = topPadding + "px " + 0;
            } else {
                // state.preview.padding = topPadding;
                state.preview.padding = topPadding + "px " + leftPadding;
            }
            state.controlZoom.width = 'calc(100vw - ' +
                (state.prop.switchRight + state.comList.switchLeft) + 'px)';
        },
        switchComListDisplayState(state) {
            let comList = state.comList

            if (comList.openState) {

                comList.left = -comList.width;
                comList.switchLeft = 0;
                comList.background = 'url(' + openLeft + ')';
                comList.openState = false;
                comList.switchInfo = '展开';
            } else {
                comList.left = 0;
                comList.switchLeft = comList.width;
                comList.background = 'url(' + openRight + ')';
                comList.openState = true;
                comList.switchInfo = '关闭';
            }

        },
        switchPropDisplayState(state) {
            let prop = state.prop

            if (prop.openState) {
                prop.right = -prop.width;
                prop.switchRight = 0;
                prop.background = 'url(' + openRight + ')';
                prop.openState = false;
                prop.switchInfo = '展开';
            } else {
                prop.right = 0;
                prop.switchRight = prop.width;
                prop.background = 'url(' + openLeft + ')';
                prop.openState = true;
                prop.switchInfo = '关闭';
            }
        },
        setScreenWidth(state, width) {
            state.preview.screenWidth = parseInt(width);
        },
        // 设置是否显示方格
        setScreenGridShow(state, flag) {
            state.preview.showGrid = flag
        },
        setScreenHeight(state, height) {
            state.preview.screenHeight = parseInt(height);
        },
        setBaseHeight(state, height) {
            state.preview.baseHeight = parseInt(state.preview.baseWidth / state.preview.screenWidth * state.preview.screenHeight);
        },
        changeBg(state, bg) {
            state.preview.background = bg;
        },
        initPreview(state, screen) {
            state.preview = screen;
        },
        changePageId(state, value) {
            state.pageId = value;
        },
        setPageInfo(state, value) {
            state.pageId = value.pageId;
            value.status && (state.status = value.status);
        },
        pidMsg(state, v) {
            state.pageIdMsg.name = v.name;
            state.pageIdMsg.description = v.description;
            state.pageIdMsg.image = v.image;
        },
        clearPidMsg(state) {
            state.pageId = '';
            state.pageIdMsg.name = '';
            state.pageIdMsg.description = '';
            state.pageIdMsg.image = '';
        },
        changeBackgroundImage(state, backgroundImage) {
            state.preview.backgroundImage = backgroundImage;
        },
        changeGlobalParams(state, data) {
            state.globalParams = data;
        },
        changePreviewParams(state, data) {
            state.previewParams = data;
        },
        changeLog(state, data) {
            state.isShowLog = data;
            window.debug = data;
        },
    },
    actions: {
        async getPageDetail({ commit, state, rootState }, version) {
            let pageId = state.pageId;
            if (pageId) {
                let res;
                if (version) { //新版本
                    res = await projectApi.getPageDetail(pageId);
                    //console.log("getPageDetail -> res", res)
                    if (res.code != 200) {
                        MessageBox.alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {
                                commit('initPage');
                                commit('initPreviewSize');
                            }
                        });
                        return false
                    }
                } else { //旧版本
                    res = await api.getEditDetail(`${util.appServerURL()}open/${pageId}`);
                    console.log("getPageDetail -> res", res)
                    if (res.state == 0) {
                        MessageBox.alert(res.message, '提示', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: action => {
                                commit('initPage');
                                commit('initPreviewSize');
                            }
                        });
                        return false
                    }
                }

                let data = res.data;
                if (!data || !data.conf || data.status) {
                    commit('initPage');
                    commit('initPreviewSize');
                    return;
                }
                let conf;
                try {
                    conf = JSON.parse(data.conf);
                } catch (error) {
                    console.error("getPageDetail -> error", error)
                    commit('initPage');
                    commit('initPreviewSize');
                    commit('setPageInfo', { pageId: pageId, status: data.state });
                    commit('pidMsg', data);
                    return;
                }
                console.log("getPageDetail -> conf", conf)
                commit('initPreview', conf[rootState.preview.screen.idName]); //screen
                let map = {};
                map['map'] = conf[rootState.preview.components.idName]; //compList
                map['index'] = conf[rootState.preview.components.indexName]; //compIndex
                // 初始化数据
                let compData = conf[rootState.preview.compData.idName]; //compData
                // 这里处理的是数据集数据的初始化
                for (let m in map.map) {
                    if (map.map[m].data && map.map[m].data.datasource && ['dataset', 'gisSet'].includes(map.map[m].data.datasource.type) && this._vm.$dm._checkRequireFields(map.map[m])) {
                        let cd = await this._vm.$dm.parseData(map.map[m])
                        let resData = []
                        cd.forEach(item => {
                            if (item.data) {
                                resData.push(item.data.dataValues)
                            } else {
                                resData.push(null)
                            }
                        })
                        compData[m] = resData
                    }
                }
                //console.log(map);
                commit('initCompData', compData);
                commit('initComponents', map);
                commit('initPage');
                commit('initPreviewSize');
                commit('setPageInfo', { pageId: pageId, status: data.state });
                commit('pidMsg', data);

                let globalParams = conf.globalParams;
                if (globalParams && Array.isArray(globalParams) && globalParams.length) {
                    commit('changeGlobalParams', globalParams);
                }
                commit('changeLog', conf.isShowLog)
                    // 初始化事件总线
                conf.eventsRelations && this._vm.$evtBus.initialize(conf.eventsRelations)
            } else {
                commit('initPage');
                commit('initPreviewSize');
            }
        },
        switchComListDisplayState({ commit }) {
            commit('switchComListDisplayState');
            commit('initPreviewSize');
        },
        zoom({ commit, state }, newZoom) {
            const min = state.controlZoom.min,
                max = state.controlZoom.max;
            let zoom = state.preview.scale;
            if (newZoom >= min && newZoom <= max) {
                zoom = newZoom;
            } else {
                console.warn('已经缩放到最大或最小值');
                if (Math.abs(newZoom - min) < 1) {
                    zoom = min;
                } else {
                    zoom = max;
                }
            }
            commit('initPreviewSize', zoom);
        },
        zoomIn({ state, dispatch }) {
            let zoom = state.preview.scale + state.preview.stepSize;
            dispatch('zoom', zoom);
        },
        zoomOut({ state, dispatch }) {
            let zoom = state.preview.scale - state.preview.stepSize;
            dispatch('zoom', zoom);
        },
        initPreviewSize({ commit }) {
            commit('initPreviewSize')
        },
        switchPropDisplayState({ commit }) {
            commit('switchPropDisplayState')
            commit('initPreviewSize')
        },
        clickPreviewPanel({ commit, state }, event) {
            commit('cleanAllActive');
            commit('cleanAllHighLayer')
        },
        setScreenSize({ dispatch, state, commit }, obj) {
            let value = obj.value;
            if (util.isNum(value)) {
                commit(obj.setFun, value);
                commit('initPreviewSize');
            }
        },

        setScreenWidth({ dispatch }, value) {
            dispatch('setScreenSize', { 'value': value, 'property': 'screenWidth', 'setFun': 'setScreenWidth' })
        },

        setScreenHeight({ dispatch }, value) {
            dispatch('setScreenSize', { 'value': value, 'property': 'screenHeight', 'setFun': 'setScreenHeight' })
        },
        changeBg({ commit }, value) {
            commit('changeBg', value);
        },
        changeBackgroundImage({ commit }, value) {
            commit('changeBackgroundImage', value);
        }

    }
}