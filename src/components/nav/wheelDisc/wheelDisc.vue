<template>
    <div class="menuHolder">
        <div class="menuWindow">
            <ul class="p1">
                <li class="s1" ref="menuRef">
                    <a href="javascript:;"></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
//import AbstractComp from "../commons/general/AbstractComp.js";

export default {
    name: "wheelDisc",
    //mixins: [AbstractComp],
    inject: ["projectPreview"],
    props: {
        nav: {
            type: Object,
        },
        menuItemId: {
            type: String,
        },
    },
    data() {
        return {};
    },
    computed: {
        ...mapState([]),
        menu() {
            return this.nav.menuList;
        },
    },
    created() {
        window.clickMenuItem = this.clickMenuItem;
    },
    mounted() {
        this.renderMenu(this.menu);
        this.setDefaultActive(this.menuItemId);
    },
    beforeDestroy() {
        delete window.clickMenuItem;
    },
    methods: {
        renderMenu(menu) {
            let me = this;
            const deg = 90;
            let s1 = this.$refs.menuRef;
            let ul = iterateRender(menu, 1);
            s1.innerHTML += ul;

            function iterateRender(menu, level) {
                level++;
                let lis = "";
                let menuLen = menu.length;
                for (let i = 0; i < menuLen; i++) {
                    let rotateDeg = deg / menuLen;
                    let height = (200 * level) / menuLen;
                    let menuItem = menu[i];
                    let children = menuItem.children;
                    let ul = iterateRender(children, level);
                    lis += `<li class="s${level}">
                        <a style="transform: rotate(${
                            rotateDeg * i
                        }deg);" href="javascript:;" data-id="${
                        menuItem.id
                    }" onclick="clickMenuItem('${menuItem.id}')">
                            <div class="cont len${menuLen}" style="height:${height}px;">
                                <img class="menu-icon" src="${menuItem.iconPath}"/>
                                <span title="${menuItem.name}">${
                        menuItem.name
                    }</span>
                                <i class="el-icon-arrow-right" style="display: ${
                                    children.length ? "block" : "none"
                                }"></i>
                            </div>
                        </a>
                        ${ul}
                    </li>`;
                }
                let ul = `<ul class="p${level}">${lis}</ul>`;
                return ul;
            }
        },
        clickMenuItem(id) {
            this.getPageId(this.menu, id);
            this.changeActive(id);
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
        changeActive(id) {
            let rootEle = document.querySelector(".p2");
            //移除菜单树中的类名active
            this.iterateNode(rootEle, "active");
            //设置当前选中的菜单项为高亮
            this.setDefaultActive(id);
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
        setDefaultActive(id) {
            let rootEle = document.querySelector(".p2");
            let activeEle = rootEle.querySelector(`a[data-id="${id}"]`);
            //console.log("setDefaultActive -> activeEle", activeEle);
            this.setSelectedActive(activeEle);
        },
        setSelectedActive(activeEle) {
            let p = activeEle.parentNode;
            while (!p.classList.contains("p2")) {
                if (p.tagName == "LI") {
                    p.children[0].classList.add("active");
                }
                p = p.parentNode;
            }
        },
    },
};
</script>

<style lang="scss">
.menuHolder {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    .menuWindow {
        position: absolute;
        left: -185px;
        top: 0;
        z-index: 100;
        width: 200px;
        height: 200px;
        overflow: hidden;
        border: 1px solid #0095da;
        border-top: none;
        border-left: none;
        border-radius: 0 0 200px 0;
        transition: 0.5s;
    }

    &:hover .menuWindow {
        overflow: visible;
        left: 0;
    }

    ul {
        list-style: none;
        position: absolute;
        left: 0;
        top: 0;
    }

    ul li a {
        color: #000;
        text-decoration: none;
        text-align: center;
        box-shadow: -5px 5px 5px rgba(0, 0, 0, 0.4);
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
    }

    ul.p2 {
        z-index: -1;
    }

    ul.p3 {
        z-index: -2;
    }

    ul.p4 {
        z-index: -3;
    }

    li.s1 > a {
        position: absolute;
        display: block;
        width: 200px;
        height: 200px;
        background: #01040c url("./img/btn-menu.png") no-repeat 44px 44px;
        border-radius: 0 0 200px 0;
    }

    &:hover li.s1 > a {
        background: #01040c url("./img/btn-menu_active.png") no-repeat 44px 44px;
    }

    li.s2 > a {
        position: absolute;
        display: block;
        width: 200px;
        padding-left: 200px;
        height: 400px;
        background: #0b2433;
        border-radius: 0 0 400px 0;
        border-top: 1px solid #053f63;
        border-right: 1px solid #009be2;
        font-size: 16px;
        color: #306c92;
    }

    li.s3 > a {
        position: absolute;
        display: block;
        width: 200px;
        padding-left: 400px;
        height: 600px;
        background: #0b2433;
        border-radius: 0 0 600px 0;
        border-top: 1px solid #053f63;
        border-right: 1px solid #008acb;
        color: #306c92;
        font-size: 16px;
    }

    li.s4 > a {
        position: absolute;
        display: block;
        width: 200px;
        padding-left: 600px;
        height: 800px;
        background: #0b2433;
        border-radius: 0 0 800px 0;
        border-top: 1px solid #053f63;
        border-right: 1px solid #008acb;
        color: #306c92;
        font-size: 16px;
    }

    .p2,
    .p3,
    .p4 {
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -ms-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotateZ(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-transition: 1s;
        -moz-transition: 1s;
        -ms-transition: 1s;
        -o-transition: 1s;
        transition: 1s;
    }

    li.s1:hover ul.p2,
    li.s2:hover ul.p3,
    li.s3:hover ul.p4 {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotateZ(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    li.s2:hover > a,
    li.s3:hover > a,
    li.s4:hover > a {
        color: #9ae6ff;
        text-shadow: 0 0 24px rgba(107, 194, 255, 0.64);
    }

    .active {
        color: #9ae6ff !important;
        text-shadow: 0 0 24px rgba(107, 194, 255, 0.64);
    }

    .cont {
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: 0 0;
        > span {
            max-width: 160px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .menu-icon {
        width: 14px;
        height: 14px;
        margin-right: 5px;
    }

    /* 一级 */
    .s2 > a > .cont {
        transform: translate(0px, -4px) rotate(2deg);
    }

    .s2 > a > .cont.len1 {
        transform: translate(80px, 0px) rotate(45deg);
    }

    .s2 > a > .cont.len2 {
        transform: translate(20px, -20px) rotate(22deg);
    }

    .s2 > a > .cont.len3,
    .s2 > a > .cont.len4,
    .s2 > a > .cont.len5 {
        transform: translate(5px, -15px) rotate(12deg);
    }

    .s2 > a > .cont.len6,
    .s2 > a > .cont.len7,
    .s2 > a > .cont.len8,
    .s2 > a > .cont.len9,
    .s2 > a > .cont.len10,
    .s2 > a > .cont.len11 {
        transform: translate(5px, -10px) rotate(6deg);
    }

    .s2 > a > .cont.len12,
    .s2 > a > .cont.len13,
    .s2 > a > .cont.len14,
    .s2 > a > .cont.len15,
    .s2 > a > .cont.len16 {
        transform: translate(0px, -5px) rotate(3deg);
    }

    /* 二级 */
    .s3 > a > .cont {
        transform: rotate(4deg) translateX(2px);
    }

    .s3 > a > .cont.len1 {
        transform: rotate(45deg) translateX(120px);
    }

    .s3 > a > .cont.len2 {
        transform: rotate(22.5deg) translateX(30px);
    }

    .s3 > a > .cont.len3 {
        transform: rotate(15deg) translateX(15px);
    }

    .s3 > a > .cont.len4 {
        transform: rotate(11deg) translateX(10px);
    }

    .s3 > a > .cont.len5 {
        transform: rotate(9deg) translateX(6px);
    }

    .s3 > a > .cont.len6 {
        transform: rotate(7deg) translateX(4px);
    }

    .s3 > a > .cont.len7 {
        transform: rotate(6deg) translateX(2px);
    }

    .s3 > a > .cont.len8 {
        transform: rotate(6deg) translateX(2px);
    }

    .s3 > a > .cont.len9 {
        transform: rotate(5deg) translateX(2px);
    }

    .s3 > a > .cont.len10 {
        transform: rotate(4.5deg) translateX(2px);
    }

    /* 三级 */
    .s4 > a > .cont {
        transform: rotate(4deg) translate(0px, 4px);
    }

    .s4 > a > .cont.len1 {
        transform: rotate(45deg) translateX(175px);
    }

    .s4 > a > .cont.len2 {
        transform: rotate(22.5deg) translateX(45px);
    }

    .s4 > a > .cont.len3 {
        transform: rotate(15deg) translate(20px, 20px);
    }

    .s4 > a > .cont.len4 {
        transform: rotate(11deg) translate(12px, 15px);
    }

    .s4 > a > .cont.len5 {
        transform: rotate(9deg) translate(8px, 12px);
    }

    .s4 > a > .cont.len6 {
        transform: rotate(7deg) translate(6px, 10px);
    }

    .s4 > a > .cont.len7 {
        transform: rotate(6deg) translate(4px, 9px);
    }

    .s4 > a > .cont.len8 {
        transform: rotate(5.6deg) translate(4px, 8px);
    }

    .s4 > a > .cont.len9 {
        transform: rotate(5deg) translate(3px, 7px);
    }

    .s4 > a > .cont.len10 {
        transform: rotate(4.5deg) translate(2px, 6px);
    }
}
</style>