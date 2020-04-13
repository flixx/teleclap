const webpack = require('webpack');

module.exports = {
    configureWebpack: {
      plugins: [
        // See https://janus.conf.meetecho.com/docs/js-modules.html
        new webpack.ProvidePlugin({ adapter: 'webrtc-adapter' })
      ],
      module: {
        rules: [
          // See https://janus.conf.meetecho.com/docs/js-modules.html
          {
            test: require.resolve('janus-gateway'),
            use: 'exports-loader?Janus=Janus'
          }
        ]
      }
    },
    productionSourceMap: true,
    css: {
      sourceMap: true
    }
  }