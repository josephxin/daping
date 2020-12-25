<template>
    <div class="styleProp backgroundImage-wrapper">
        <div class="text">
            {{ textName }}
        </div>
        <el-upload
            class="backgroundImage-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
        >
            <template v-if="getValue">
                <img :src="getValue" />
                <el-button
                    type="primary"
                    size="mini"
                    @click.stop="delBackgroundImage"
                    >删除背景</el-button
                >
            </template>
            <el-button v-else size="mini" type="primary" :loading="loading">{{
                loading ? "上传中..." : "点击上传"
            }}</el-button>
        </el-upload>
    </div>
</template>
<script>
import util from "@/util/util";
import { getVal, onlyUpdateAttr } from "./EditCompReg";
export default {
    name: "backgroundImageUpload",
    props: ["styleObj"],
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        getValue: {
            get() {
                return getVal(this.styleObj.value);
            },
            set(val) {
                onlyUpdateAttr(this.styleObj.value, val);
            },
        },
        serverUrl() {
            return util.getServelURL() + "confStore/uploadimg";
        },
        textName: function () {
            let currentObj = this.styleObj;
            if (!currentObj.name) {
                return "背景图片";
            }
            return currentObj.name;
        },
    },
    methods: {
        beforeUpload(file) {
            const isLt = file.size / 1024 / 1024 <= 1;
            if (!isLt) {
                this.$message.error("上传图片大小不能超过 1MB!");
                return false;
            }
            this.loading = true;
            return true;
        },
        uploadSuccess(res, file) {
            this.loading = false;
            if (res.code == 200) {
                this.getValue = res.data;
            }
        },
        uploadError(err, file, fileList) {
            this.loading = false;
            this.$message.error("上传失败！");
        },
        delBackgroundImage() {
            this.getValue = "";
        },
    },
};
</script>
<style lang="scss">
.backgroundImage-wrapper {
    height: auto;
    .backgroundImage-uploader {
        float: right;
        .el-upload {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            img {
                max-width: 200px;
                margin-right: 20px;
            }
        }
    }
}
</style>