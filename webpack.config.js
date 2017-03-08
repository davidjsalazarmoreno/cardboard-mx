var CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack'),
    path = require('path');

module.exports = {
  entry: [
  //  'webpack-dev-server/client?http://0.0.0.0:8000', // WebpackDevServer host and port
  //  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    path.resolve( __dirname, 'src/portfolio/Bootstrap.tsx' )
  ],
  // node: {
  //   fs: "empty"
  // },
  output: {
    filename: 'app.js',
    path: path.resolve( __dirname, 'docs/' )
  },

  // https://github.com/kevlened/copy-webpack-plugin/issues/44
  devServer: {
    outputPath: path.resolve( __dirname, 'docs/' )
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      { 
        test: /\.tsx?$/, loaders: [ 'react-hot', 'ts-loader?configFileName=tsconfig.json' ]
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract('style', 'raw')
      },
      { 
        test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass?includePaths[]') 
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { 
        from: path.resolve( __dirname, 'src/assets' ),
        to: path.resolve( __dirname, 'docs/assets' ) 
      },
      { 
        from: path.resolve( __dirname, 'src/views/index.html' ),
        to: path.resolve( __dirname, 'docs/index.html' ) 
      },
      { 
        from: path.resolve( __dirname, 'humans.txt' ),
        to: path.resolve( __dirname, 'docs/humans.txt' ) 
      },
    ]),
    new ExtractTextPlugin( 'styles.css' )
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};