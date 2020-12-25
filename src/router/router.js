import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const routers = [{
        path: "*",
        redirect: "/project-manage"
    },
    {
        path: "/",
        redirect: "/project-manage"
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录"
        },
        component: () =>
            import ("@/views/login/index")
    },
    {
        path: "/register",
        name: "register",
        meta: {
            title: "注册"
        },
        component: () =>
            import ("@/views/register/index")
    },
    {
        path: "/datasource",
        name: "datasource",
        meta: {
            title: "数据源管理"
        },
        component: () =>
            import ("@/views/datasource/index")
    },
    {
        path: "/project-manage",
        name: "projectManage",
        meta: {
            title: "项目管理"
        },
        component: () =>
            import ("@/views/project/projectList")
    },
    {
        path: "/project-detail",
        name: "projectDetail",
        meta: {
            title: "项目详情"
        },
        component: () =>
            import ("@/views/project/projectDetail")
    },
    {
        path: "/project-preview",
        name: "projectPreview",
        meta: {
            title: "项目预览"
        },
        component: () =>
            import ("@/views/project/projectPreview")
    },
    {
        path: "/page-design",
        name: "pageDesign",
        meta: {
            title: "页面设计"
        },
        component: () =>
            import ("@/views/design/pageDesign")
    },
    {
        path: "/page-preview",
        name: "pagePreview",
        meta: {
            title: "页面预览"
        },
        component: () =>
            import ("@/views/preview/pagePreview")
    }
];
const routerConfig = {
    mode: "history",
    base: process.env.VUE_APP_BUILD_DIR,
    routes: routers
};
const router = new Router(routerConfig);
router.beforeEach((to, from, next) => {
    if (to.meta.title) window.document.title = to.meta.title;
    next();
});
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
export default router;