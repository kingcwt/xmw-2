const path = require("path")
const IS_PRODUCTION_MODE = process.env.NODE_ENV === 'production'

const modules = {
  rules: [
    {
      test: /\.js?$/,
      loader: 'babel-loader',
      options: {
         "presets": ["@babel/preset-env"]
      }
    },
    {
      test: /\.coffee$/,
      use:[
        {
          loader: 'coffee-loader',
          options:{
            transpile:{
              presets: ["@babel/preset-env"],
              // plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
            }
          },
        }
      ],
      exclude: /node_modules/
    }
  ]
}

module.exports = {

  watch: ! IS_PRODUCTION_MODE,
  target: 'web',
  mode: 'production',
  entry: "./src/index.coffee",
  module:modules,
  output: {
    path: path.join(__dirname, IS_PRODUCTION_MODE ?  '../build/' : '../public/'), 
    filename: 'wechat_work_[name].js'
  },
  resolve: {extensions: [".coffee", ".js", ".json"]}
}