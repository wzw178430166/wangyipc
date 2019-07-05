      //商品详情页   http://127.0.0.1:8080/product  还没写路由
 
 //请求头部文件
 $.ajax({
    url:"../../header.html",  //当前客户端向这个地址的服务器发送请求
    type:"get",//请求类型
    success: function(result){
       // console.log(result);
        $(result).replaceAll('header');
        //动态添加link元素，引入 header.css文件 自动添加到<head>
     //   $(`<link rel="stylesheet" href="./second_css/product/product.css">`).appendTo('head');
    }
});

//请求脚部文件
$.ajax({
    url:"../../footer.html",  //当前客户端向这个地址的服务器发送请求
    type:"get",//请求类型
    success: function(result){
       // console.log(result);
        $(result).replaceAll('footer');
        //动态添加link元素，引入 header.css文件 自动添加到<head>
     //   $(`<link rel="stylesheet" href="./second_css/product/product.css">`).appendTo('head');
    }
});



 
