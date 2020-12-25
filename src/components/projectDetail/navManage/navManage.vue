<template>
    <div class="nav-manage">
        <el-form
            class="nav-form"
            ref="navForm"
            :model="navForm"
            :rules="navRules"
            label-width="100px"
            size="medium"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="导航类型：" prop="typeId">
                        <el-select
                            class="my-select"
                            v-model="navForm.typeId"
                            placeholder="请选择"
                            filterable
                            @change="navTypeChange"
                        >
                            <el-option
                                v-for="(item, index) in navOptions"
                                :key="index"
                                :label="item.name"
                                :value="item.type"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="导航位置："
                        v-if="navForm.typeId != 'wheelDisc'"
                    >
                        <el-select
                            class="my-select"
                            v-model="navForm.positionId"
                            placeholder="请选择"
                            filterable
                            @change="navPositionChange"
                        >
                            <el-option
                                v-for="(item, index) in positionOptions"
                                :key="index"
                                :label="item.name"
                                :value="item.type"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="导航菜单：">
                <el-button
                    icon="el-icon-circle-plus-outline"
                    type="primary"
                    size="small"
                    @click="clickAddBtn(navForm.menuList)"
                    >添加</el-button
                >
            </el-form-item>

            <el-form-item>
                <el-table
                    :data="navForm.menuList"
                    style="width: 100%"
                    row-key="id"
                    size="mini"
                    border
                    default-expand-all
                    :tree-props="{
                        children: 'children',
                        hasChildren: 'hasChildren',
                    }"
                >
                    <el-table-column
                        prop="name"
                        label="名称"
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column prop="iconPath" label="图标" width="60">
                        <template slot-scope="scope">
                            <img
                                :src="scope.row.iconPath"
                                class="icon-img"
                                v-if="scope.row.iconPath"
                            />
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="descr"
                        label="描述"
                        show-overflow-tooltip
                    >
                    </el-table-column>

                    <el-table-column
                        prop="pageName"
                        label="页面名称"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            {{ scope.row.pageName || "--" }}
                        </template>
                    </el-table-column>

                    <el-table-column label="页面参数" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{
                                scope.row.pageId
                                    ? Object.keys(scope.row.pageParam).length
                                        ? JSON.stringify(scope.row.pageParam)
                                        : "无"
                                    : "--"
                            }}
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="250" align="center">
                        <template slot-scope="scope">
                            <el-button
                                class="operate-btn"
                                type="text"
                                size="mini"
                                @click="clickAddBtn(scope.row.children)"
                                >添加</el-button
                            >
                            <el-button
                                class="operate-btn"
                                type="text"
                                size="mini"
                                @click="clickModifyBtn(scope.row)"
                                >修改</el-button
                            >
                            <el-button
                                class="operate-btn"
                                type="text"
                                size="mini"
                                @click="deleteMenu(scope.row.id)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item label="默认页面：" prop="menuItemId">
                <el-select
                    class="my-select"
                    v-model="navForm.menuItemId"
                    placeholder="请选择"
                    filterable
                >
                    <el-option
                        v-for="(item, index) in allMenuItems"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button
                    class="primary-button"
                    type="primary"
                    @click="clickSaveBtn"
                    >保 存</el-button
                >
                <el-button
                    class="primary-button"
                    type="success"
                    @click="jumpPreviewPage"
                    >预 览</el-button
                >
            </el-form-item>
        </el-form>

        <addMenuItemDialog
            ref="addMenuItemDialogRef"
            @addMenu="addMenu"
            @modifyMenu="modifyMenu"
        />
    </div>
</template>

<script>
import viewApi from "@/api/view";
import api from "@/api/project";
import util from "@/util/util";
import { mapState, mapActions } from "vuex";
import router from "@/router/router";
import navPosition from "./navPosition";
import homeHead from "@/components/layout/header";
import addMenuItemDialog from "@/components/dialog/nav-dialog/addMenuItemDialog";

export default {
    name: "navManage",
    components: {
        homeHead,
        addMenuItemDialog,
    },
    inject: ["projectDetail"],
    provide() {
        return {
            navManage: this,
        };
    },
    data() {
        return {
            //项目所属大屏页面列表
            pageParams: {
                currentPage: 1,
                pageSize: 10000,
            },
            currentMenu: null,
            oldIndex: 0,
            navigationId: null, //所属导航ID，菜单项的属性
            navForm: {
                projectId: "",
                typeId: "",
                typeName: "",
                positionId: "",
                positionName: "",
                menuItemId: "", //用于保存默认菜单项
                menuList: [],
                maxNavigationItemId: 0, //用于添加菜单时生成菜单id
            },
            navRules: {
                typeId: [
                    {
                        required: true,
                        message: "请选择导航类型",
                        trigger: "change",
                    },
                ],
                menuItemId: [
                    {
                        required: true,
                        message: "请选择默认菜单项",
                        trigger: "change",
                    },
                ],
            },
            positionOptions: [],
            allMenuItems: [],
            isPreview: false,
        };
    },
    computed: {
        ...mapState(["project"]),
        navOptions() {
            return this.project.navOptions;
        },
    },
    watch: {},
    created() {
        //通过projectId获取导航对象
        this.getProjectNav();
    },
    mounted() {
        this.navForm.projectId = this.projectDetail.projectId;
    },
    beforeDestroy() {},
    methods: {
        navTypeChange(val) {
            //console.log("navTypeChange -> val", val);
            //获取typeId对应的typeName
            for (let index = 0; index < this.navOptions.length; index++) {
                const item = this.navOptions[index];
                if (item.type == val) {
                    this.navForm.typeName = item.name;
                    break;
                }
            }
            //导航类型发生改变时导航位置也对应改变
            this.positionOptions = navPosition[val];
            if (this.positionOptions.length) {
                this.navForm.positionId = this.positionOptions[0].type;
                this.navForm.positionName = this.positionOptions[0].name;
            } else {
                this.navForm.positionId = "";
                this.navForm.positionName = "";
            }
        },
        navPositionChange(val) {
            for (let index = 0; index < this.positionOptions.length; index++) {
                const item = this.positionOptions[index];
                if (item.type == val) {
                    this.navForm.positionName = item.name;
                    break;
                }
            }
        },
        clickAddBtn(children) {
            //console.log(children);
            this.currentMenu = children;
            //显示弹窗
            this.$refs.addMenuItemDialogRef.open("添加");
        },
        addMenu(form) {
            //console.log("addMenu -> form", form);
            this.navForm.maxNavigationItemId++;
            form.id = String(this.navForm.maxNavigationItemId);
            if (this.navigationId) {//所属导航ID
                form.navigationId = this.navigationId;
            }
            this.currentMenu.push(form);
            let menu = this.navForm.menuList;
            //console.log(menu);
            this.getAllMenuItems(menu);
        },
        clickModifyBtn(row) {
            //console.log(row);
            this.$refs.addMenuItemDialogRef.form = util.deepCopy(row);
            let pageId = row.pageId;
            if (pageId) {
                this.$refs.addMenuItemDialogRef.fillPageParams(pageId);
            }
            //显示弹窗
            this.$refs.addMenuItemDialogRef.open("修改");
            let menu = this.navForm.menuList;
            this.getIndexById(menu, row.id);
        },
        getIndexById(menu, id) {
            for (let index = 0; index < menu.length; index++) {
                const item = menu[index];
                if (item.id == id) {
                    this.currentMenu = menu;
                    this.oldIndex = index;
                    this.$refs.addMenuItemDialogRef.currentIndex = index;
                    this.$refs.addMenuItemDialogRef.menuLen = menu.length;
                    return true;
                }
                if (item.children.length) {
                    let flag = this.getIndexById(item.children, id);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        changeIndex() {
            let newIndex = this.$refs.addMenuItemDialogRef.currentIndex;
            const currItem = this.currentMenu.splice(this.oldIndex, 1)[0];
            this.currentMenu.splice(newIndex, 0, currItem);
        },
        modifyMenu(form) {
            //console.log("modifyMenu -> form", form)
            //改变索引
            this.changeIndex();
            let menu = this.navForm.menuList;
            if (this.navigationId) {
                form.navigationId = this.navigationId;
            }
            this.iterateModifyMenu(menu, form);
            this.getAllMenuItems(menu);
        },
        iterateModifyMenu(menu, form) {
            let id = form.id;
            for (let index = 0; index < menu.length; index++) {
                const item = menu[index];
                if (item.id == id) {
                    //menu.splice(index, 1, form);//这两种方法都可以
                    this.$set(menu, index, form);
                    return true;
                }
                if (item.children.length) {
                    let flag = this.iterateModifyMenu(item.children, form);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        deleteMenu(id) {
            //console.log(id);
            let menu = this.navForm.menuList;
            this.iterateDeleteMenu(menu, id);
            this.getAllMenuItems(menu);
            //console.log(this.allMenuItems, this.navForm.menuItemId);
            if (!this.isInAllMenuItems()) {
                this.navForm.menuItemId = "";
            }
        },
        iterateDeleteMenu(menu, id) {
            for (let index = 0; index < menu.length; index++) {
                const item = menu[index];
                if (item.id == id) {
                    menu.splice(index, 1);
                    return true;
                }
                if (item.children.length) {
                    let flag = this.iterateDeleteMenu(item.children, id);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        isInAllMenuItems() {
            for (let index = 0; index < this.allMenuItems.length; index++) {
                const item = this.allMenuItems[index];
                if (item.id == this.navForm.menuItemId) {
                    return true;
                }
            }
            return false;
        },
        //从navForm.menu中获取所有关联了页面的菜单项，用于选择默认页面
        getAllMenuItems(menu, result = []) {
            menu.forEach((menuItem) => {
                if (menuItem.pageId) {
                    result.push({
                        id: menuItem.id,
                        name: menuItem.name,
                    });
                }
                if (menuItem.children.length) {
                    this.getAllMenuItems(menuItem.children, result);
                }
            });
            this.allMenuItems = result;
            //console.log("getAllMenuItems -> result", result);
        },
        checkIsHasMenuItem(menu) {
            let flag = this.iterateMenu(menu);
            if (!flag) {
                this.$message.error("导航菜单中至少得关联一个页面！");
            }
            return flag;
        },
        iterateMenu(menu) {
            for (let index = 0; index < menu.length; index++) {
                const item = menu[index];
                if (item.pageId) {
                    return true;
                }
                if (item.children.length) {
                    let flag = this.iterateMenu(item.children);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        saveData() {
            let form = util.deepCopy(this.navForm);
            //console.log(form);
            //return;
            let checkResult = this.checkIsHasMenuItem(form.menuList);
            this.$refs.navForm.validate((valid) => {
                if (valid && checkResult) {
                    //调接口
                    form.navigationItemId = form.menuItemId;
                    api.saveNav(form).then((res) => {
                        console.log("saveData -> res", res);
                        if (res.code == 200) {
                            this.$message.success("保存成功！");
                            this.getProjectNav();
                            if (this.isPreview) {
                                let routerPreview = router.resolve({
                                    path: "/project-preview",
                                    query: {
                                        projectId: this.projectDetail.projectId,
                                    },
                                });
                                window.open(routerPreview.href, "_blank");
                            }
                        }
                    });
                }
            });
        },
        //点击保存按钮，调保存接口
        clickSaveBtn() {
            this.isPreview = false;
            this.saveData();
        },
        //点击预览按钮，调保存接口，然后打开新页签
        jumpPreviewPage() {
            this.isPreview = true;
            this.saveData();
        },
        getProjectNav() {
            //通过项目id获取项目导航
            api.getNavByProjectId(this.projectDetail.projectId).then((res) => {
                console.log("getProjectNav -> res", res);
                if (res.code == 200) {
                    let data = res.data;
                    if (
                        data &&
                        data.constructor == Object &&
                        Object.keys(data).length
                    ) {
                        this.navForm = util.deepCopy(data);
                        this.navForm.menuItemId = this.navForm.navigationItemId;
                        this.navigationId = this.navForm.id;//所属导航ID
                        let typeId = this.navForm.typeId;
                        if (typeId) {
                            this.positionOptions = navPosition[typeId];
                        }
                        this.getAllMenuItems(this.navForm.menuList);
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss">
.nav-manage {
    .my-select {
        width: 300px;
    }
    .el-table {
        th {
            line-height: 1;
        }
    }
    .operate-btn {
        padding: 5px 0;
    }
    .icon-img {
        display: block;
        width: 24px;
        height: 24px;
    }
    .menu-tip {
        padding: 0;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 50%;
    }
}
</style>