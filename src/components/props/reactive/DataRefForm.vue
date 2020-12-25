<template>
    <el-dialog class="common-dialog" :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog"
               :title="'数据关联配置'" width="650px">
        <el-tag style="margin-bottom:10px" v-if="evtRefData.length>0"> 请选择触发事件关联字段：</el-tag>
        <el-row>
            <el-select style="width: 100%" multiple size="mini" v-model="evtTransField" @change="prepareDtStruct">
                <el-option :key="item.uid" :label="item.columnDesc"
                           :value="JSON.stringify({l:item.columnDesc,v:item.uid})"
                           v-for="item in evtTransData">
                    <span style="float: left">{{ item.columnDesc }}</span>-
                    <span style="color: #8492a6; font-size: 13px">{{ item.columnName }}</span>-
                    <span style="color: #8492a6; font-size: 13px">{{ item.columnDefDire === 2 ? '维度' : '指标' }}</span>
                </el-option>
            </el-select>
        </el-row>
        <el-tag style="margin-top:10px" v-if="evtRefData.length>0"> 请配置关联关系：</el-tag>
        <el-row :gutter="10" class="dt-ref" v-for="key in evtRefData" :key="key.from">
            <el-col :span="16" class="dt-col">
                <el-select v-model="key.to" size="mini" placeholder="接收关联字段">
                    <el-option v-for="item in evtRevData" :key="item.uid" :label="item.columnDesc" :value="item.uid">
                        <span style="float: left">{{ item.columnDesc }}</span>
                        <span style="color: red; font-size: 13px;float:right">{{ item.required ? '必要' : '' }}</span>
                    </el-option>
                </el-select>
                <el-select style="width: 40%;margin-left: 10px" v-model="key.cond" size="mini" placeholder="关联条件">
                    <el-option v-for="con in conditions" :label="con.description" :value="con.code"
                               :key="con.code"/>
                </el-select>
            </el-col>
            <el-col :span="1" style="font-size: 12px;display: inline;line-height: 28px">-></el-col>
            <el-col :span="5" style="text-align:center;font-size: 12px;display: inline;line-height: 28px">
                {{ '值: ' + key.fromName }}
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="save" class="primary-button" type="primary">确认</el-button>
            <el-button @click="cancel" class="info-button">取消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import operationTypes from '@/config/operationTypes';

export default {
    name: "DataRefForm",
    data() {
        return {
            conditions: operationTypes, dialog: false, evtTransField: [],
            evtRefData: [], evtRevData: [], evtTransData: [], evtRefBackup: []
        }
    },
    watch: {
        dialog: {
            handler: function (val) {
                if (val) {
                    this.evtRefBackup = [];
                    this.evtRefBackup = _.cloneDeep(this.evtRefBackup)
                    this.evtTransField = [];
                    if (this.evtRefData.length > 0) {
                        for (let j = 0; j < this.evtRefData.length; j++) {
                            let item = this.evtRefData[j]
                            this.evtTransField.push(JSON.stringify({l: item.fromName, v: item.from}))
                        }
                    }
                }
            }
        }
    },
    methods: {
        prepareDtStruct(val) {
            if (val.length < this.evtRefData.length) {
                let tempDtRef = [];
                for (let j = 0; j < this.evtRefData.length; j++) {
                    let del = true;
                    for (let i = 0; i < val.length; i++) {
                        let obj = JSON.parse(val[i]);
                        if (this.evtRefData[j].from === obj.v) {
                            del = false
                        }
                    }
                    if (del) {
                        tempDtRef.push(j)
                    }
                }
                this.evtRefData.splice(tempDtRef[0], 1)
                return;
            }
            for (let i = 0; i < val.length; i++) {
                let isPre = false;
                let obj = JSON.parse(val[i]);
                for (let j = 0; j < this.evtRefData.length; j++) {
                    if (this.evtRefData[j].from === obj.v) {
                        isPre = true
                    }
                }
                if (!isPre) {
                    this.evtRefData.push({
                        fromName: obj.l,
                        from: obj.v,
                        to: '',
                        cond: 'eq',
                        //must: false
                    })
                }
            }
        },
        cancel() {
            this.evtRefData.splice(0, this.evtRefData.length)
            this.evtRefBackup.forEach((e) => {
                this.evtRefData.push(e)
            })
            this.dialog = false;
        },
        save() {
            for (let j = 0; j < this.evtRefData.length; j++) {
                if (!this.evtRefData[j].to || this.evtRefData[j].to === '') {
                    this.$message({
                        type: 'warning',
                        message: '请填写完整数据关联'
                    })
                    return;
                }
            }
            this.dialog = false
        }
    }
}
</script>

<style lang="scss" scoped>
.dt-ref {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 5px !important;
    width: 580px;

    .dt-col {
        display: flex;
        align-items: center;
        justify-content: center
    }
}
</style>
