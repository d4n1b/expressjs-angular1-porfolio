var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var pkg = require('./package.json');

module.exports = {
  entry: {
    app: `${pkg.folders.app}/bootstrap.js`
  },
  output: {
    path: `${pkg.folders.public}/js`,
    filename: '[name].bundle.js'
  },
  resolve: {
    modulesDirectories: [
      './node_modules',
      './public/bower_components'
    ],
    alias: {
      '@data': path.resolve(pkg.folders.data),
      '@views': path.resolve(pkg.folders.views)
    }
  },
  externals: [
    'angular',
    'jQuery',
    '$'
  ],
  watch: true,
  keepalive: true,
  failOnError: false,
  module: {
    loaders: [
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, 
        loader: 'url-loader?importLoaders=1&limit=100000'
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /(\.html|\.tmpl)/,
        loader: 'html'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(pkg.folders.app),
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-1']
        }
      }
    ]
  },
  plugins: [
    // get Bower components
    new BowerWebpackPlugin({
      excludes: /.*\.(less|png|gif|css)$/
    })
  ]
};
