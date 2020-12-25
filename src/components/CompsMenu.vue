<template>
    <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        active-text-color="#fff"
        class="topMenu"
        mode="horizontal"
    >
        <el-submenu :popper-append-to-body="true" v-if="item.hasMulti" v-for="item in menu" :key="item.name"
                    :index="item.name" popper-class="dropMenu">
            <template slot="title">
                <i :class="'iconfont '+item.icon "></i>{{ item.name }}
            </template>
            <el-submenu v-for="ch in item.children" :key="ch.name" :index="ch.name">
                <template slot="title">
                    <i :class="'iconfont '+ch.icon "></i>{{ ch.name }}
                </template>
                <el-menu-item :index="leaf.name" v-for="leaf in ch.children" :key="leaf.name">
                    <img alt="" :src="leaf.img"/>{{ leaf.alias }}
                </el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-submenu v-if="!item.hasMulti" v-for="item in menu" :key="item.name" :index="item.name"
                    popper-class="panelMenu">
            <template slot="title">
                <i :class="'iconfont '+item.icon "></i>{{ item.name.replace('1', '') }}
            </template>
            <el-menu-item :index="leaf.name" v-for="leaf in item.children" :key="leaf.name">
                <img alt="" :src="leaf.img"/>{{ leaf.alias }}
            </el-menu-item>
        </el-submenu>
        <el-submenu :popper-append-to-body="true" index="自定义" popper-class="panelMenu">
            <template slot="title">
                <i class="iconfont icon-custom"></i>自定义
            </template>
            <el-menu-item index>
                <!-- <a href="./custom/index.html" target="_blank"> -->
                <a href="/custom/" target="_blank">
                    <img alt="" src="../assets/image/thumb/customAdd.png"/>
                </a>
                <span class="name">新建</span>
            </el-menu-item>
            <el-menu-item :index="'custom-'+item.caseId " :key="item.caseId" v-for="(item) in caseList">
                <img :src="item.img" alt=""/>
                <span class="name">{{ item.caseName }}</span>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import io from "@/util/io";
import {menu} from '@/config/MenuConf'

export default {
    data() {
        return {
            activeIndex: "1",
            activeIndex2: "1",
            selectItem: null,
            caseList: [],
            menu
        };
    },
    props: [],
    mounted() {
        // let temp = localStorage.getItem("caseList");
        // this.caseList = temp ? JSON.parse(temp) : [];
        this.getCustomTempList();
        window.addEventListener("storage", this.attachStorage);
    },
    beforeDestroy() {
        window.removeEventListener("storage", this.attachStorage);
    },
    computed: {
        ...mapGetters({getToken: "getToken"})
    },
    methods: {
        ...mapActions(["addComp"]),
        /**
         * 匹配localstorage中自定义模板数据
         */
        attachStorage() {
            // console.log("event", event);
            if (event.key === "caseList") {
                let newVal = event.newValue;
                if (newVal) {
                    this.caseList = JSON.parse(newVal);
                } else {
                    this.caseList = [];
                }
            }
        },
        /**
         * 获取自定义模板数据
         */
        getCustomTempList() {

            io.get("http://10.10.50.190:7300/mock/5d27ea83bb4f7d194f0f1a62/datav/getCustomTemplates")
                .then(response => {
                    if (response.state == 1) {
                        this.caseList = response.data.tempList;
                        //console.log("获取自定义模板列表成功", response, this.caseList);
                    } else {
                        // console.log("获取自定义模板列表失败", response);
                        this.$alert("获取自定义模板列表失败", "提示", {
                            confirmButtonText: "确定",
                            type: "error"
                        });
                    }
                })
                .catch(e => {
                    // console.log("获取自定义模板列表失败", e);
                });
        },
        addComs: function (comsType) {
            //console.log("comsType", comsType)
            if (!comsType) {
                return;
            }
            this.addComp(comsType);
        },
        handleSelect(key, keyPath) {
            if (!key) return false;
            if (this.addComsTimer) clearTimeout(this.addComsTimer)
            this.addComsTimer = setTimeout(() => {
                if (key.indexOf("custom-") >= 0) {
                    this.addComs(key.split("-"));
                } else {
                    this.addComs(key);
                }
            }, 300)
        }
    }
};
</script>
<style lang="scss">
.topMenu {
    top: 0;
    left: 20px;
    background: transparent !important;
    border: none !important;

    .is-opened {
        background: #fff !important;
        border: 1px solid #2bf !important;
        box-shadow: 0 0 5px 2px rgba(100, 100, 100, 0.7);
    }

    .el-submenu .el-submenu__title {
        border: none !important;
        color: #666 !important;
        font-weight: 500;

        i {
            color: #666 !important;

            &.iconfont {
                &.icon-other {
                    &::before {
                        font-weight: normal;
                        color: #bbb !important;
                        font-size: 15px;
                    }
                }

                &::before {
                    font-weight: normal;
                    color: #bbb !important;
                    margin-right: 5px;
                }
            }
        }
    }

}

.dropMenu {
    .el-menu--popup-bottom-start {
        width: 140px;
        margin-top: -1px !important;
        margin-left: -1px !important;
        min-width: 0 !important;
        padding: 1px;
        border-bottom: 1.5px solid #2bf;
        border-left: 1.5px solid #2bf;
        border-right: 1.5px solid #2bf;

        .el-submenu {
            .el-submenu__title {
                color: #666 !important;

                .iconfont {
                    color: #999 !important;

                    &::before {
                        color: #999 !important;
                        margin-right: 5px;
                        font-size: 16px;
                    }
                }
            }
        }

        .el-submenu.is-active {
            .el-submenu__title {
                color: #666 !important;

                .iconfont {
                    &::before {
                        color: #999 !important;
                        margin-right: 5px;
                        font-size: 16px;
                    }
                }
            }
        }

        .el-submenu.is-opened {
            .el-submenu__title {
                i {
                    .iconfont {
                        color: #666 !important;

                        &::before {
                            color: #bbb;
                            margin-right: 5px;
                            font-size: 16px;
                        }
                    }
                }

                &:hover {
                    background-image: linear-gradient(to bottom right, rgb(85, 155, 255), rgb(105, 189, 255)) !important;
                    color: #fff !important;

                    i {
                        &.iconfont {
                            color: #fff !important;
                        }

                        &::before {
                            color: #fff !important;
                        }
                    }
                }
            }
        }

        .el-menu--popup-right-start {
            max-height: 424px;
            margin-left: -1px;
            margin-top: -4px;
            overflow-y: auto;
            border: 2px solid #2bf !important;
            display: flex;
            background: #fff;
            flex-wrap: wrap;
            padding: 15px 20px 20px 20px;
            width: 440px;
            min-width: 440px;

            li.el-menu-item {
                line-height: normal;
                height: auto;
                min-width: 118px;
                text-align: center;
                justify-content: center;
                padding: 0;
                width: 118px;
                display: flex;
                flex-direction: column;
                background: none !important;
                border: none;
                margin: 10px 13px 4px 13px;
                color: #666 !important;

                &:hover {
                    border: none;
                    background: none !important;
                }

                img {
                    width: 118px;
                    height: 83px;
                    margin-bottom: 10px;
                    border: 2px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 1px 6px 7px -4px rgba(100, 100, 100, 0.7);
                }

            }
        }
    }

}

.panelMenu {
    max-height: 424px;
    overflow-y: auto;
    border: 2px solid #2bf !important;


    .el-menu--popup-bottom-start {
        margin-top: -2px !important;
        display: flex;
        background: #fff;
        flex-wrap: wrap;
        padding: 15px 20px 20px 20px;
        width: 440px;
        min-width: 440px;

        li.el-menu-item {
            line-height: normal;
            height: auto;
            min-width: 118px;
            text-align: center;
            justify-content: center;
            padding: 0;
            width: 118px;
            display: flex;
            flex-direction: column;
            background: none !important;
            border: none;
            margin: 10px 13px 4px 13px;
            color: #666 !important;

            &:hover {
                border: none;
                background: none !important;
            }

            img {
                width: 118px;
                height: 83px;
                margin-bottom: 10px;
                border: 2px solid rgba(255, 255, 255, 0.15);
                box-shadow: 1px 6px 7px -4px rgba(100, 100, 100, 0.7);
            }

        }
    }
}
</style>
