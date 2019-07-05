//webpack 主配置文件
module.exports={
    mode: 'production',  //产品模块， 输出文件会进行压缩，没有注释
    //mode: 'development',    //开发模式，输出文件不进行压缩，有注释，开发完再改回去
    //1.入口 ： 从哪个文件开始打包
         entry: './js/index.js',
    //2.出口： 打包后的结果输出到哪个文件上
        output:{
            path:__dirname+'/dist',
            filename:'app.js',
        },
    //3.加载器  :  默认情况下wibpack只能打包js 如果向打包其他格式的文件必须使用对应的加载器(loader)---查手册
        module:{
            rules:[
                {
                    test: /\.css$/,  //正则检测已.结尾的css文件，使用加载器
                    use:['style-loader','css-loader']
                }
                /*,{
                    test: /\.vue$/,  //打包vue文件
                    use: ['vue-loader']
                }*/
              //  {},//图片
               // {}, //sass
            ]
        }
    //4.插件   ，扩展webpack的功能，如实现自动实时刷新等
}