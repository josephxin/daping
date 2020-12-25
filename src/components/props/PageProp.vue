<template>
    <div class="pageProp">
        <div class="title-pageConf">页面设置</div>

        <div class="screenProp">
            <div class="title-prop">屏幕大小</div>
            <div class="item-prop">
                宽
                <el-input-number
                    :value="screenWidth"
                    @change="setScreenWidth"
                    :step="10"
                    size="small"
                ></el-input-number>
            </div>
            <div class="item-prop">
                高
                <el-input-number
                    :value="screenHeight"
                    @change="setScreenHeight"
                    :step="10"
                    size="small"
                ></el-input-number>
            </div>
            <div class="item-prop">
                背景色
                <GeneralColor
                    v-model="bgValue"
                    class="color-editor"
                ></GeneralColor>
            </div>
            <div class="background-prop clearfix">
                背景图
                <GeneralBackgroundImage
                    v-model="backgroundImg"
                    class="bg-img-editor"
                ></GeneralBackgroundImage>
            </div>
            <div class="item-prop">
                全局参数
                <el-button
                    class="global-params-btn"
                    size="mini"
                    type="primary"
                    @click="openGlobalParams"
                    >设置</el-button
                >
            </div>
            <div class="item-prop">
                显示日志
                <el-switch
                    class="log-switch"
                    v-model="logSwitch"
                    @change="changeLog"
                >
                </el-switch>
            </div>
        </div>
        <global-params ref="globalParamsRef"></global-params>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GeneralColor from "@/components/props/edit/complex/GeneralColor";
import GeneralBackgroundImage from "@/components/props/edit/complex/GeneralBackgroundImage";
import globalParams from "@/components/dialog/global-params";
// function coordinatesFixed8(arr){
//     arr.forEach((coord,i) => {
//         if(_.isArray(coord)){
//             arr[i] = coordinatesFixed8(coord)
//         }else{
//             arr[i] = parseFloat(coord.toFixed(8))
//         }
//     })
//     return arr
// }

// import * as pointJson from "@/datamanager/template/regionJson2.js"
// let point = _.cloneDeep(pointJson.default.data)
// point[0].feats.forEach(item => {
//     item.geometry.coordinates = coordinatesFixed8(item.geometry.coordinates)
// })
// console.log(point)
// point[0].feats.forEach(item => {
//     let coordinates = []
//     item.geometry.coordinates.forEach((coord,i) => {
//         if(_.isArray(coord)){
//             if(!coordinates[i]) coordinates[i] = []
//             coord.forEach((c,k) => {
//                 if(_.isArray(c)){
//                     if(!coordinates[i][k]) coordinates[i][k] = []
//                     c.forEach((lk,l) => {
//                         if(_.isArray(lk)){
//                             if(!coordinates[i][k][l]) coordinates[i][k][l] = []
//                             lk.forEach(m=>{
//                                 coordinates[i][k][l].push(parseFloat(m.toFixed(8)))
//                             })
//                         }else{
//                             coordinates[i][k].push(parseFloat(lk.toFixed(8)))   
//                         }
//                         // coordinates[i][k].push(parseFloat(lk.toFixed(8)))
//                     })

//                 }else{
//                     coordinates[i].push(parseFloat(c.toFixed(8)))
//                 }
//             })
//         }else{
//             coordinates.push(parseFloat(coord.toFixed(8)))
//         }
//     })
//     item.geometry.coordinates = coordinates
// })
// console.log(point)
export default {
    name: "PageProp",
    components: {
        GeneralColor,
        GeneralBackgroundImage,
        globalParams,
    },
    data() {
        return {
            logSwitch: window.debug,
        };
    },
    computed: {
        ...mapState(["window"]),

        screenWidth: function () {
            // get(){
            return this.window.preview.screenWidth;
            // },
            // set(val){
            //   this.setScreenWidth(val);
            // }
        },
        screenHeight: function () {
            // get(){
            return this.window.preview.screenHeight;
            // },
            // set(val){
            //   this.setScreenHeight(val);
            // }
        },
        isShowLog: function () {
            return this.window.isShowLog;
        },
        bgValue: {
            get() {
                let result = this.window.preview.background;
                return result;
            },
            set(val) {
                this.changeBg(val);
            },
        },
        backgroundImg: {
            get() {
                let result = this.window.preview.backgroundImage;
                return result;
            },
            set(val) {
                //console.log(val);
                this.changeBackgroundImage(val);
            },
        },
    },
    watch: {
        isShowLog: {
            handler(val, oldVal) {
                //console.log("handler -> val, oldVal", val, oldVal);
                this.logSwitch = val;
            },
        },
    },
    mounted() {},
    methods: {
        ...mapActions([
            "setScreenWidth",
            "setScreenHeight",
            "changeBg",
            "changeBackgroundImage",
        ]),
        openGlobalParams() {
            this.$refs.globalParamsRef.open();
        },
        changeLog(val) {
            //console.log("changeLog -> val", val);
            this.$store.commit("changeLog", val);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageProp {
    width: 100%;
    height: calc(100vh - 60px);
}

.title-pageConf {
    text-align: center;
    line-height: 38px;
    height: 38px;
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    font-family: "Microsoft YaHei";
}

.screenProp {
    height: 100vh;
    background-color: #f7f7f7;
    margin-left: 1px;
}

.title-prop {
    line-height: 40px;
    height: 40px;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #33333e;
    margin-left: 30px;
}

.item-prop {
    line-height: 40px;
    height: 40px;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #33333e;
    margin-left: 30px;
    margin-right: 10px;
    border-top-width: 1px;
    border-top-color: #dfdfdf;
    border-top-style: solid;
    position: relative;
}
.background-prop {
    line-height: 40px;
    position: relative;
    font-size: 12px;
    font-family: "Microsoft YaHei";
    color: #33333e;
    margin-left: 30px;
    margin-right: 10px;
    border-top-width: 1px;
}
.el-input-number {
    width: 160px;
    margin-top: 4px;
    margin-bottom: 4px;
    right: 0px;
    position: absolute;
}

.color-editor {
    width: 160px;
    position: absolute;
    right: 0px;
    display: inline-block;
}

.pageProp .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
}

.bg-style {
    width: 160px;
    height: 32px;
    right: 0px;
    position: absolute;
}

.screenProp input {
    width: 80px;
    border: 1px solid grey;
}

.global-params-btn {
    float: right;
    margin-top: 6px;
}

.log-switch {
    float: right;
    margin-top: 10px;
}
</style>


