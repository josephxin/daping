import submenu from "./submenu";

export default {
    name: 'AbstractComp',
    components: {
        submenu,
    },
    inject: ["projectPreview"],
    provide() {
        return {
            navComp: this,
        };
    },
    props: {
        nav: {
            type: Object,
        },
        menuItemId: {
            type: String,
        },
    },
    computed: {
        positionId() {
            return this.nav.positionId;
        },
        menu() {
            return this.nav.menuList;
        },
    },
    mounted() {
        //初始化时高亮默认页面对应的子菜单（默认页面对应的如果是菜单项则不用手动高亮）
        this.setDefaultActive();
    },
    methods: {
        handleSelect(key, keyPath) {
            //console.log(key, keyPath);
            this.getPageId(this.menu, key);
            this.changeActive();
        },
        getPageId(menu, key) {
            for (let index = 0; index < menu.length; index++) {
                const menuItem = menu[index];
                let { pageId, pageParam, id } = menuItem;
                if (id == key) {
                    this.projectPreview.changeMenuItem(pageId, pageParam);
                    return true;
                }
                if (menuItem.children.length) {
                    let flag = this.getPageId(menuItem.children, key);
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
        changeActive() {
            let rootEle = document.querySelector("#my-menu");
            //移除菜单树中的类名menu-active和not
            this.iterateNode(rootEle, ["menu-active", "not"]);
        },
        iterateNode(parent, className) {
            for (var i = 0; i < parent.children.length; i++) {
                var child = parent.children[i];
                //classList.remove()移除不存在的类名，不会报错
                if (Array.isArray(className)) {
                    child.classList.remove(...className); //扩展运算符将一个数组，变为参数序列。
                } else {
                    child.classList.remove(className);
                }
                // 递归调用
                this.iterateNode(child, className);
            }
        },
        setDefaultActive() {
            let rootEle = document.querySelector("#my-menu");
            let activeEle = rootEle.querySelector(
                `li[data-id="${this.menuItemId}"]`
            );
            //this.menuItemId是子菜单，activeEle为元素；this.menuItemId是菜单项，activeEle为null
            //console.log("setDefaultActive -> activeEle", activeEle);
            if (activeEle) {
                this.setSelectedActive(activeEle);
            }
        },
        setSelectedActive(activeEle) {
            activeEle.children[0].classList.add("menu-active");
            let p = activeEle.parentNode;
            while (p.tagName != "BODY") {
                if (p.classList.contains("el-submenu")) {
                    p.children[0].classList.add("menu-active");
                }
                p = p.parentNode;
            }
        },
    },
}