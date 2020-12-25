const path = require("path");
const baseUrl = 'https://mockapi.eolinker.com/kYDm3Nrd186f34d638fe9055814a63b69976c35fd5d6a31'
const designer = baseUrl;
const datavisual_app = baseUrl;
const metadata = baseUrl;
const api = baseUrl;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? `${process.env.VUE_APP_BUILD_DIR}/static` : "/",
    devServer: {
        proxy: {
            '/designer': {
                // 我要请求的地址api
                target: designer,
                //是否跨域
                changeOrigin: true,
                // 重写地址
                pathRewrite: {
                    '^/designer': '/designer'
                }
            },
            '/cimage': {
                target: designer,
                changeOrigin: true,
                pathRewrite: {
                    '^/cimage': '/cimage'
                }
            },
            '/datavisual_app': {
                target: datavisual_app,
                changeOrigin: true,
                pathRewrite: {
                    '^/datavisual_app': '/datavisual_app'
                }
            },
            '/metadata-manage': {
                target: metadata,
                changeOrigin: true,
                pathRewrite: {
                    '^/metadata-manage': '/metadata-manage'
                }
            },
            '/disapi': {
                target: api,
                changeOrigin: true,
                pathRewrite: {
                    '^/disapi': ''
                }
            },
            "/api": {
                target: api,
                changeOrigin: true,
                secure: false,
                pathRewrite: { "^/api": "" }
            }
        },
        // before: require('./mock'),
    },
    productionSourceMap: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete("prefetch");
        // 移除 preload 插件
        config.plugins.delete("preload");
        config.module.rule('images').use('url-loader').loader('url-loader').tap(options => Object.assign(options, { limit: 20000 }))
        config.resolve.alias.set("@static", path.resolve(__dirname, './static'))
    },
}