<template>
    <div class="prop-tab-item">
        <hr class="separate-line"/>
        <div class="data-item">
            <div class="text">数据类型</div>
            <el-select :value="dataType" @change="selectDataType" class="comp" size="mini">
                <el-option :key="item.value" :label="item.name" :value="item.value"
                           v-for="item in dataTypeList"></el-option>
            </el-select>
        </div>
        <!-- 切换不同的数据类型时，更新显示不同的视图 -->
        <component :is="dataSourceUI" ref="dataView"></component>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {dataConfig} from '../../compLib/CompTemplateReg'
import {getVal, onlyUpdateAttr, type as DataSourceUIContext} from './dataSource/dataSourceReg'
import {DataSourceContext} from '@/datamanager/DataManagerContext'

export default {
    name: 'CompData',
    data() {
        return {}
    },
    props: ['reload'],
    watch: {
        reload: {
            handler: function (val) {
                if (val === 'compData') {
                    this.$forceUpdate()
                }
            }
        }
    },

    computed: {
        ...mapGetters({activeComp: 'getFirstActiveComp', getCompData: 'getCompData'}),

        dataCfg() {
            return dataConfig(this.activeComp.componentName) || [];
        },
        dataTypeList() {
            if (this.activeComp.compType === 'themeLayer') {
                return [
                    {name: '静态数据', value: DataSourceContext.STATIC},
                    {name: '数据集', value: DataSourceContext.DATASET},
                    {name: 'GIS服务', value: DataSourceContext.GISSERVER},
                    {name: 'GIS服务+数据集', value: DataSourceContext.GISSET},
                ]
            } else if (this.activeComp.componentName === 'baseMap') {
                return [
                    {name: 'GIS服务', value: DataSourceContext.GISSERVER},
                ]
            } else {
                return [
                    {name: '静态数据', value: DataSourceContext.STATIC},
                    {name: '数据集', value: DataSourceContext.DATASET},
                ]
            }
        },
        compFormatData() {
            let data = this.$store.state.compData.compData[this.activeComp.compId];
            return JSON.stringify(data, null, 2);
        },

        dataType() {
            return getVal('datasource type');
        },

        dataSourceUI() {
            return DataSourceUIContext[this.dataType];
        }

    },

    methods: {

        modifyFieldValue(event) {
            onlyUpdateAttr('conf ' + event.target.getAttribute('field'), event.target.value);
        },
        selectDataType(value) {
            this.$dm.updateCompDataSource(this.activeComp.compId, value);
        },

        getFieldValue(fileName) {
            return getVal(fileName);
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.prop-tab-item .data-config {
    width: 100%;
    margin: 5px 0;
}

</style>

<style>
.data-item {
    width: 100%;
    overflow: hidden; /* 避免边界margin塌陷*/
}

.data-item .text {
    width: 100%;
    margin: 5px 0;
}

.data-item .comp {
    width: 100%;
    margin: 5px 0;
}

.data-item-float {
    width: 100%;
}

.data-item-float::after {
    content: '';
    clear: both;
    display: block;
    width: 0;
    height: 0;
    visibility: hidden;
}

.data-item-float .left {
    width: 255px;
    float: left;
    line-height: 28px;
    overflow: hidden;
}

.data-item-float .right {
    float: right;
}
</style>
