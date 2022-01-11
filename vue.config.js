var webpack = require("webpack");
const path = require('path');
const less = require("mue/config/config.less.js");
const debug = process.env.NODE_ENV !== "production";

const proxy = {};
["^/list", "^/sys", "^/upload"].forEach((u) => {
    proxy[u] = {
        // target: "http://192.168.100.188:7009",
        target: "http://192.168.100.179:8089",
        // target: "http://192.168.100.179:8086",
        // target: "http://10.18.40.171:3001", //开发平台
        // target: "http://192.168.100.93:5004", //开发测试平台
        pathRewrite: {
            '^/list': ''
        },
        changeOrigin: true
    };
});

module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: false,
    devServer: {proxy},
    transpileDependencies: [/@?mue/],
    pages: {
        index: {
            entry: 'example/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: '自定义表单-移动端',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    configureWebpack: {
        resolve: {
            extensions: [".js", ".vue", ".json"],
            alias: {
                vue$: "vue/dist/vue.js",
                "@": path.resolve(__dirname, "src")
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                moment: "moment"
            })
        ],
        devtool: debug ? 'source-map' : ''
    },
    chainWebpack: () => {},
    productionSourceMap: false,
    css: {
        requireModuleExtension: true,
        loaderOptions: {
            less: less
        }
    },
    runtimeCompiler: undefined,
    parallel: true
};
