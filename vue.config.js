module.exports = {
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // hot:true,
  },
  devServer: {
    open: "localhost:8080",
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://10.61.5.18:9528",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
