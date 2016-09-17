const webpack       = require('webpack');

module.exports = {
  //main JSX of the app
  entry: {
    app: [ './client/scripts/main.js' ]
  },

  //where the code  will be when the code gets bundled
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },

  //location of development server
  devServer: {
    contentBase: './bin'
  },

  module: {
    loaders: [
      //tell webpack to look through the app and if a file ends in .jsx to use babel to transcribe it
      {
        test: /\.js$/,
        exculde: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },

  plugins: [
    //tell webpack to minify javascript during development leave commented for speed
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //  },
    //  output: {
    //    comments: false,
    //  },
    //}),
  ]
};
