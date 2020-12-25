<template>
    <el-dialog
        title="查看数据"
        :visible.sync="visible"
        :modal-append-to-body="false"
        :before-close="handleClose"
    >
        <el-form>
            <el-form-item>
                <el-input
                    type="textarea"
                    :value="compData"
                    :rows="15"
                    :disabled="true"
                    style="width: 100%"
                ></el-input>
            </el-form-item>
            <el-form-item style="text-align: right; margin-bottom: 0">
                <el-button @click="handleClose()">关 闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    name: "show-data-dialog",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            compData: null,
        };
    },
    created() {
        this.$dm.parseData(this.activeComp, "").then((res) => {
            //console.log("created -> res", res);
            if (res[0].code === 200) {
                this.compData = JSON.stringify(res[0].data.dataValues, null, 4);
            }
        });
    },
    methods: {
        handleClose() {
            this.$emit("back");
        },
    },
    computed: {
        ...mapGetters({
            activeComp: "getFirstActiveComp",
        }),
    },
    mounted() {},
};
</script>
