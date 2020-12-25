<template>
    <el-input
        ref="inputRef"
        class="form-input"
        :style="boxStyle"
        v-model="value"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :show-word-limit="showWordLimit"
        :clearable="clearable"
        :disabled="disabled"
    >
        <img
            slot="prefix"
            class="prefix-icon"
            v-if="prefix"
            :src="prefixIcon"
            :style="prefixStyle"
        />
        <img
            slot="suffix"
            class="suffix-icon"
            v-if="suffix"
            :src="suffixIcon"
            :style="suffixStyle"
        />
    </el-input>
</template>

<script>
import AbstractComp from "@/compLib/commons/AbstractComp";
import util from "@/util/util";
import { mapGetters } from "vuex";
import { onlyUpdateAttr } from "@/components/props/edit/EditCompReg";
export default {
    name: "formInput",
    mixins: [AbstractComp],
    components: {},
    data() {
        return {
            flag: false, //初始化时不让value监听内的代码执行；
            value: "",
        };
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        boxStyle() {
            return {
                width: this.box.width + "px",
                height: this.box.height + "px",
            };
        },
        valueStore() {
            return this.styleConf.value;
        },
        placeholder() {
            return this.styleConf.placeholder;
        },
        maxlength() {
            return this.styleConf.maxlength;
        },
        showWordLimit() {
            return this.styleConf.showWordLimit;
        },
        clearable() {
            return this.styleConf.clearable;
        },
        disabled() {
            return this.styleConf.disabled;
        },
        prefix() {
            return this.styleConf.prefix;
        },
        prefixIcon() {
            return this.styleConf.prefixIcon;
        },
        prefixStyle() {
            let width = this.styleConf.prefixWidth;
            let height = this.styleConf.prefixHeight;
            return {
                width: width ? width + "px" : "",
                height: height ? height + "px" : "",
            };
        },
        suffix() {
            return this.styleConf.suffix;
        },
        suffixIcon() {
            return this.styleConf.suffixIcon;
        },
        suffixStyle() {
            let width = this.styleConf.suffixWidth;
            let height = this.styleConf.suffixHeight;
            return {
                width: width ? width + "px" : "",
                height: height ? height + "px" : "",
            };
        },
    },
    watch: {
        valueStore: {
            handler(newVal, oldVal) {
                //console.log('valueStore->', newVal, oldVal);
                this.value = newVal;
            },
        },
        value: {
            handler(newVal, oldVal) {
                //console.log('value->', newVal, oldVal);
                if (this.flag) {
                    //此处需要注意，使用modifyValueByCompId，不能使用onlyUpdateAttr；modifyValueByCompId方法只有在设计时才有效，预览时components.js中的compMap为{}，预览时不需要改变状态中的值
                    this.$store.commit("modifyValueByCompId", {
                        attrs: [this.compId, "style", "value"],
                        value: newVal,
                    });
                    this.loadLinkage(newVal);
                }
            },
        },
    },
    created() {},
    mounted() {
        this.value = this.valueStore;
        this.$nextTick(() => {
            this.flag = true;
        });
        this.styleConfChanged();
    },
    beforeDestroy() {},
    methods: {
        styleConfChanged() {
            //console.log(this.$refs.inputRef);
            let el = this.$refs.inputRef.$el;
            let inputEl = el.children[0];
            //console.log(inputEl);
            inputEl.style.backgroundColor = this.styleConf.bgColor;
            let {
                borderType,
                borderWidth,
                borderColor,
                borderRadius,
            } = this.styleConf.defaultBorder;
            inputEl.style.border = `${borderWidth}px ${borderType} ${borderColor}`;
            inputEl.style.borderRadius = borderRadius + "px";
            inputEl.style.fontFamily = this.styleConf.fontFamily;
            inputEl.style.fontWeight = this.styleConf.fontWeight;
            inputEl.style.fontSize = this.styleConf.fontSize + "px";
            inputEl.style.color = this.styleConf.fontColor;
            el.onmouseover = (e) => {
                //console.log(e);
                let {
                    borderType,
                    borderWidth,
                    borderColor,
                    borderRadius,
                } = this.styleConf.hoverBorder;
                inputEl.style.border = `${borderWidth}px ${borderType} ${borderColor}`;
                inputEl.style.borderRadius = borderRadius + "px";
            };
            el.onmouseout = (e) => {
                inputEl.style.border = `${borderWidth}px ${borderType} ${borderColor}`;
                inputEl.style.borderRadius = borderRadius + "px";
            };
        },
        loadLinkage(val) {
            if (this.compConf.linkage && this.compConf.linkage.linkEvents) {
                let evtList = this.compConf.linkage.linkEvents;
                //console.log("loadLinkage -> evtList", evtList)
                for (let i = 0; i < evtList.length; i++) {
                    let evtObj = evtList[i];
                    if (evtObj.evtType === "change" && evtObj.explosive) {
                        let eventObj = {
                            data: {
                                value: val,
                            },
                        };
                        this.$evtBus.emit(evtObj.evtName, eventObj);
                    }
                }
            }
        },
        linkageConfChanged() {
            let linkage = this.compConf.linkage;
            //console.log("linkageConfChanged -> linkage", linkage)
            if (!linkage) {
                return;
            }
            let { linkEvents, linkRevEvents } = linkage;
            if (_.isArray(linkEvents)) {
                for (let i = 0; i < linkEvents.length; i++) {
                    let evtObj = linkEvents[i];
                    //this.$store.getters.getPreviewState为true代表预览时，只有在预览时才会执行默认触发
                    if (
                        evtObj.evtType === "change" &&
                        evtObj.explosive &&
                        evtObj.def.defTrigger &&
                        this.$store.getters.getPreviewState
                    ) {
                        if (evtObj.def.defType === "val") {
                            let val = evtObj.def.defVal;
                            this.value = val;
                        }
                    }
                }
            }
            if (_.isArray(linkRevEvents)) {
                for (let i = 0; i < linkRevEvents.length; i++) {
                    let evtRevObj = linkRevEvents[i];
                    let evtType = evtRevObj.evtName.split(":")[1];
                    this._clickByLinkAge(evtRevObj);
                }
            }
        },
        _clickByLinkAge(evtRevObj) {
            this.$evtBus.on(evtRevObj, (e) => {
                //console.log(this.compId, e);
                //console.log(this.compData);
                this._toggleCompShow(
                    e.ctrlShow,
                    e.switchVisible && e.switchVisible[this.compConf.compId],
                    this.compConf.compId
                );
                let data = []
                e.refData.forEach(item => {
                    let operationType = item.cond
                    let bindMapperColumn = item.to.split('$')[1]
                    let value = e.data[item.from.split('$')[1]]
                    data.push({
                        operationType,
                        bindMapperColumn,
                        value
                    })
                })
                let evt = {
                    target: e.target,
                    source: e.source,
                    name: e.name,
                    data,
                    sourceData: e.data
                }
                let payload = {};
                payload[this.compConf.compId] = { [`${e.name}`]: evt };
                this.$store.commit("setLinkage", payload);
                this.setValue(e.data);
            });
        },
        setValue(data) {
            let text = data.value;
            this.value = text;
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/_lib-mixin.scss";
.form-input {
    &.is-disabled {
        .el-input__inner {
            background-color: #f5f7fa !important;
            border-color: #e4e7ed !important;
            color: #c0c4cc !important;
        }
    }
    .el-input__inner {
        height: 100%;
        line-height: initial;
        background-color: transparent;
    }
    .el-input__prefix {
        display: flex;
        align-items: center;
        .prefix-icon {
            max-width: 25px;
            max-height: 100%;
        }
    }
    .el-input__suffix {
        .el-input__suffix-inner {
            height: 100%;
            display: flex;
            align-items: center;
            .suffix-icon {
                max-width: 25px;
                max-height: 100%;
            }
            .el-input__clear {
                display: flex;
                align-items: center;
            }
            .el-input__count {
                .el-input__count-inner {
                    background-color: transparent;
                }
            }
        }
    }
}
</style>
