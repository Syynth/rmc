var HtmlPlugin = require('html-webpack-plugin');

var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'eval',
  //debug: true,
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      './src/index'
    ]
  },
  devServer: {
    hot: true,
    historyApiFallback: {
      index: 'index.html',
      rewrites: [
        { from: /\/\w*\.js$/, to: function(c) { return c.match[0]; } },
        { from: /.*/, to: '/index.html'}
      ]
    },
    publicPath: '/'
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: __dirname + '/bin'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less']
  },
  module: {
    loaders: [
      {test: /src.*\.js[x*]?$/, loaders: ['react-hot', 'babel-loader?optional=runtime&stage=1']},
      {test: /src.*\.json$/, loaders: ['json-loader']},
      {test: /src.*\.(ttf|woff)$/, loader: 'url-loader?limit=100000' },
			{test: /node_modules.*\.(ttf|woff)$/, loader: 'url-loader?limit=100000' },
    ]
  },
  externals: {
    'aws-sdk': 'AWS'
  },
  plugins: [
    new HtmlPlugin({ title: 'RMC Builder', template: 'build/index.html', filename: 'index.html', excludeChunks:['worker'] }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
