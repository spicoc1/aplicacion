const htmlWebPackPlugin = require ('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//destructuracion de paquetes


module.exports ={

    mode: 'production',
    optimization:{
        minimizer:[new OptimizeCssAssetsPlugin()]

    },
    output:{
        filename:'main.[contentHash].js'

    },
    module:{
        rules:[
            {
                
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader",
                     
                    }
                  
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/, 
                use:[
                    
                       'style-loader',
                       'css-loader'   
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    MiniCssExtractPlugin.loader ,
                    'css-loader'
                ]
            },

            {
                test: /\.html$/,
                use:[
                    {
                        loader:'html-loader',
                        options: {minimize:false}
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            esModule: false,
                            name:'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new htmlWebPackPlugin({
            template: './src/index.html', 
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.[contentHash].css',
            ignoreOrder: false
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]

}