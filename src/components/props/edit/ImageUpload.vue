<template>
    <div class="uploader-box">
        <div class="text">
            {{ styleObj.name }}
        </div>
        <el-upload
            class="uploader comp"
            :action="serverUrl"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
        >
            <img v-if="getValue" :src="getValue" class="img" />
            <i v-else class="el-icon-plus uploader-icon"></i>
        </el-upload>
        <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click.stop="delFile"
            size="mini"
        ></el-button>
    </div>
</template>
<script>
import util from "@/util/util";
import { getVal, onlyUpdateAttr } from "./EditCompReg";
export default {
    name: "ImageUpload",
    props: ["styleObj"],
    computed: {
        getValue() {
            return getVal(this.styleObj.value);
        },
        serverUrl() {
            return util.getServelURL() + "confStore/uploadimg";
        },
    },
    methods: {
        beforeUpload(file) {
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.$message.error("上传图片大小不能超过 10MB!");
            }
            return isLt10M;
        },
        uploadSuccess(res, file) {
            if (res.code == 200) {
                onlyUpdateAttr(this.styleObj.value, res.data);
            }
        },
        uploadError(err, file, fileList) {
            this.$message.error("上传失败！");
        },
        delFile() {
            onlyUpdateAttr(this.styleObj.value, "");
        },
    },
};
</script>
<style lang="scss" scoped>
.uploader-box {
    width: 100%;
    display: flex;
    padding: 5px 0;
    .text {
        flex: auto;
    }
    .comp {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 60px;
        overflow: hidden;
        text-align: center;
        .img {
            width: 100%;
            display: block;
        }
        .uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            min-width: 200px;
            border: 1px dashed #d9d9d9;
            box-sizing: border-box;
        }
    }
    .el-button {
        width: 30px;
        height: 30px;
        padding: 0;
        margin-top: 15px;
    }
}
</style>