const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    runtimeCompiler: true,
    transpileDependencies: true,
    configureWebpack: {
        devtool: 'source-map'
    }
})
