<template>
    <el-upload
        class="upload-icon"
        :action="serverUrl"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
    >
        <div class="upload-icon-trigger">
            <template v-if="iconUrl">
                <img :src="iconUrl" class="icon-img" />
                <el-button
                    type="primary"
                    size="mini"
                    @click.stop="deleteIconUrl"
                    >删除</el-button
                >
            </template>
            <el-button v-else size="mini" type="primary" :loading="loading">{{
                loading ? "上传中..." : "点击上传"
            }}</el-button>
        </div>
    </el-upload>
</template>

<script>
import util from "@/util/util";
export default {
    name: "uploadIcon",
    props: ["value"],
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        iconUrl: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
        serverUrl() {
            return util.getServelURL() + "uploadimg";
        },
    },
    methods: {
        beforeUpload(file) {
            const isLt = file.size / 1024 / 1024 <= 0.5;
            if (!isLt) {
                this.$message.error("上传图标的大小不能超过 500KB!");
            }
            this.loading = true;
            return isLt;
        },
        uploadSuccess(res, file, fileList) {
            this.loading = false;
            if (res.code == 200) {
                this.iconUrl = res.data;
            }
        },
        uploadError(err, file, fileList) {
            //console.log(err, typeof err);//"object"
            this.loading = false;
            this.$message.error("上传失败！");
        },
        deleteIconUrl() {
            this.iconUrl = "";
        },
    },
};
</script>

<style lang="scss">
.upload-icon {
    display: flex;
    align-items: center;
    height: 36px;
    .el-upload {
        .upload-icon-trigger {
            display: flex;
            align-items: center;
            .icon-img {
                margin-right: 20px;
                width: 36px;
                height: 36px;
            }
        }
    }
}
</style>