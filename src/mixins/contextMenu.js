export default {
    data() {
        return {}
    },
    computed: {},
    methods: {
        handleContextMenu(event, item) {
            // this.selectOnlyOne(item.compId)
            this.$refs._contextMenu.show(event.pageX, event.pageY)
        },
        //文件夹成组逻辑
        handleCompose() {
            let list = this.contain.active;
            this.$confirm(`是否组合所选择的图层?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let floder = {
                        "title": "文件夹",
                        "name": "文件夹",
                        "index": uuid(),
                        "children": []
                    }
                    //查找到每个组件调用核心方法就行组合操作
                    //寻找父类
                const params = this.contain.findnav(list[0], true);
                list.forEach(ele => {
                    const item = this.contain.findnav(ele, true);
                    item.parent.splice(item.count, 1);
                    floder.children.push(item.obj);
                });
                params.parent.push(floder);
            }).catch(() => {})
        },
        //文件夹解散逻辑
        handleLogout() {
            let ele = this.contain.activeObj
            this.$confirm(`是否解散${ele.name}图层?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //查找到文件夹调用核心方法nav去操作
                const params = this.contain.findnav(ele.index, true);
                const list = this.deepClone(params.obj.children)
                params.parent.splice(params.count, 1);
                list.forEach(ele => {
                    params.parent.push(ele);
                });
                this.contain.handleInitActive();
            }).catch(() => {})
        },
        //复制组件的方法
    }
}