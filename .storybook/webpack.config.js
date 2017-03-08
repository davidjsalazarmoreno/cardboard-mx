// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  resolve: {
    extensions: [ '', '.ts', '.tsx', '.webpack.js', '.web.js', '.js' ]
  },
  module: {
    loaders: [
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader?configFileName=./tsconfig.json' 
      },
      {
        test: /\.css?$/,
        loaders: [ 'style', 'raw' ]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ],
  },
};
