<template>
    <div class="avatar-uploader-wrapper">
        <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <template v-if="backgroundImageUrl">
                <img :src="backgroundImageUrl" />
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
export default {
    name: "GeneralBackgroundImage",
    props: ["value"],
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        backgroundImageUrl: {
            get() {
                return this.value;
            },
        },
        serverUrl() {
            return util.getServelURL() + "confStore/uploadimg";
        },
    },
    methods: {
        beforeAvatarUpload(file) {
            const isLt = file.size / 1024 / 1024 <= 2;
            if (!isLt) {
                this.$message.error("上传图片大小不能超过 2MB!");
                return false;
            }
            this.loading = true;
            return true;
        },
        handleAvatarSuccess(res, file) {
            this.loading = false;
            if (res.code == 200) {
                this.$emit("input", res.data);
            }
        },
        delBackgroundImage() {
            this.$emit("input", "");
        },
    },
};
</script>
<style lang="stylus">
.avatar-uploader-wrapper {
    float: right;
    width: 90%;

    .avatar-uploader {
        .el-upload {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 0;

            img {
                max-width: 50%;
            }

            button {
                margin-left: 20px;
            }
        }
    }
}
</style>