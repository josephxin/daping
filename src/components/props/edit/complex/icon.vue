<template>
    <div class="iconUI group-wrapper">
        <div class="styleProp group-title">
            <span :class="fold ? 'text' : 'text close'" @click="openOrClose">{{
                styleObj.name
            }}</span>
            <div class="show-btn" v-if="styleObj.show">
                <el-switch
                    :value="isChecked"
                    @change="changeChecked"
                    size="small"
                >
                </el-switch>
                <span class="after-text">{{ showName }}</span>
            </div>
        </div>
        <div class="box" v-show="fold">
            <div
                :key="index"
                class="group-item"
                v-for="(val, index) in children"
            >
                <hr class="separate-line" v-show="showFun(val)" />
                <component
                    :is="val.type"
                    :styleObj="val"
                    v-show="showFun(val)"
                ></component>
            </div>

            <hr class="separate-line group-item" />

            <div class="styleProp group-item" style="height: auto">
                <el-table
                    :data="getCompData"
                    border
                    size="mini"
                    style="width: 100%"
                >
                    <el-table-column label="id" width="60">
                        <template slot-scope="scope">
                            {{ scope.row[fieldMap.id] }}
                        </template>
                    </el-table-column>

                    <el-table-column label="指标名" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row[fieldMap.name] }}
                        </template>
                    </el-table-column>

                    <el-table-column label="图标" width="60">
                        <template slot-scope="scope">
                            <img
                                class="icon"
                                :src="iconData[scope.row[fieldMap.id]]"
                                alt=""
                            />
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-upload
                                class="icon-uploader"
                                :action="serverUrl"
                                :show-file-list="false"
                                :before-upload="beforeUpload"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                            >
                                <el-button
                                    type="text"
                                    size="mini"
                                    @click="getId(scope.row[fieldMap.id])"
                                    >上传</el-button
                                >
                            </el-upload>
                            <el-button
                                type="text"
                                size="mini"
                                class="delete-btn"
                                @click="deleteIcon(scope.row[fieldMap.id])"
                                v-if="iconData[scope.row[fieldMap.id]]"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import { comType, getVal, onlyUpdateAttr } from "../EditCompReg";
import util from "@/util/util";
import { mapGetters } from "vuex";

export default {
    name: "iconUI",
    props: ["styleObj"],
    data() {
        return {
            fold: true,
            children: [],
            iconData: {},
            id: "",
        };
    },
    computed: {
        ...mapGetters({ activeComp: "getFirstActiveComp" }),
        isChecked() {
            let value = getVal(this.getValue("flag"));
            return value;
        },
        showName() {
            return this.styleObj.showName ? this.styleObj.showName : "显示";
        },
        getStyle() {
            return this.activeComp.style;
        },
        fieldMap() {
            return this.getStyle.fieldMap;
        },
        serverUrl() {
            return util.getServelURL() + "confStore/uploadimg";
        },
        getCompData() {
            let compData = this.$store.getters.getCompData(
                this.activeComp.compId
            );
            //console.log("getCompData -> compData", compData);
            //compData可能是静态数据（一维数组[{}]）或者数据集（二维数组[[{}]]）;
            let data = [];
            if (this.activeComp.data.datasource.type != "static") {
                data = compData[0] || [];
            } else {
                data = compData || [];
            }
            return data;
        },
    },
    created() {},
    mounted() {
        // 默认展开
        if (Object.keys(this.styleObj).indexOf("fold") != -1) {
            this.fold = this.styleObj["fold"];
        }
        this.children = [
            {
                name: "宽度",
                type: comType.NUMBER,
                value: this.getValue("width"),
                min: 0,
            },
            {
                name: "高度",
                type: comType.NUMBER,
                value: this.getValue("height"),
                min: 0,
            },
        ];
        this.iconData = _.cloneDeep(getVal(this.getValue("iconData")));
        //console.log(this.fieldMap);
    },
    methods: {
        openOrClose() {
            this.fold = !this.fold;
        },
        getValue(val) {
            return this.styleObj.value + " " + val;
        },
        changeChecked(value) {
            onlyUpdateAttr(this.getValue("flag"), value);
        },
        showFun(val) {
            return util.showFun(val, this.getStyle);
        },
        getId(id) {
            //console.log(id);
            this.id = id;
        },
        beforeUpload(file) {
            const isLt = file.size / 1024 / 1024 <= 0.1;
            if (!isLt) {
                this.$message.error("上传图片大小不能超过 100KB!");
                return false;
            }
            return true;
        },
        uploadSuccess(res, file) {
            //console.log("uploadSuccess -> res, file", res, file);
            if (res.code == 200) {
                this.$set(this.iconData, this.id, res.data);
                onlyUpdateAttr(
                    this.getValue("iconData"),
                    _.cloneDeep(this.iconData)
                );
            }
        },
        uploadError(err, file, fileList) {
            this.$message.error("上传失败！");
        },
        deleteIcon(id) {
            //console.log(id);
            this.$delete(this.iconData, id);
            onlyUpdateAttr(
                this.getValue("iconData"),
                _.cloneDeep(this.iconData)
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.iconUI {
    .icon {
        display: block;
        height: 28px;
    }
}
.icon-uploader {
    display: inline;
}
.delete-btn {
    margin-left: 10px;
}
</style>
