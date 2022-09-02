const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  mode: 'development',
  watch: true,
  resolve:{
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module:{
    rules: [ 
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
        'css-loader',
        'stylus-loader'
      ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      // {
      //   test: /\.(woff||woff2)$/i,
      //   use:{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000,
      //       mimetype: 'application/font-woff',
      //       name: '[name].[ext]',
      //       outputPath: "./assets/fonts/",
      //       publicPath: "./assets/fonts/",
      //       esModule: false,
      //     },
      //   },
      //   type: 'javascript/auto',
      // },
      {
        test: /\.(woff||woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ // Configuracion del plugin INSTANCIAMOS EL PLUGIN
      inject: true,         // inyecta el bundle al template HTML
      template: './public/index.html', // LA RUTA AL TEMPLATE HTML
      filename: './index.html'          // NOMBRE FINAL DEL ARCHIVO HTML
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }
    ),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), // Carpeta a mover al dist
          to: "assets/images"         // ruta final en el dist
        },
      ]
    }),
    new Dotenv({
      path: './src/.env',
    }),
  ],
}