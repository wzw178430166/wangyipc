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


$(function(){
   
    if(location.search!==""){
    //获得地址栏中的？lid=2中的2
   
   var lid=location.search.split("=")[1]  //这个是a标签的url传到浏览器地址栏，截取的下标  （第一对应第二）
   console.log(lid);
    //用2作为参数向服务端发送请求
    $.ajax({
        url:"http://localhost:8080/product",   //http://localhost:3000/details?lid=5
        type:"get",
        data:{  //     这个是  "uname=dingding&upwd=123456"   "lid="+lid   //data:自动带？
            lid//服务端要的参数名lid : lid变量名
        },   //  第二
        dataType:"json", //JSON.parse()  //将json数据数组自动转为js对象
        success: function(result) {
            console.log(result);
            //先将三大块数据解构出来
            var {products,pics}=result;
            new Vue({
                el:"#app",
                data:{
                    products
                },
                methods: {   //自定义方法
                    
                },
                created(){
                   // alert(111);
                }
            });
            //1.填充右上角基本信息   
            //在首页点击 对应a标签传对应下标，返回对应同一个页面。（页面信息都是根据传不同的lid 返回不同的页面数据【数据根据lid的下标返回不同的数据表，前台拿到不同的json对象再插入对应页面中的不同位置。就是动态修改页面信息，不用写多个页面】）
         // var {title,subtitle,promise}=product;
       //   $('#title').html(title);
       //   $('#subtitle').html(subtitle);
         // $('#price').html(`￥${price.toFixed(2)}`);
        //  $('#promise').html(promise);
            //2.填充右侧规格列表
             //先定义空HTML，等着接a的模板  
          //  var html="";
                //遍历specs数组中每个规格对象
             /*   for(var sp of specs){
                  //每遍历一个规格对象，就多拼接一段a模块
                  html+=`
                  <a class="btn btn-sm btn-outline-secondary ${product.lid==sp.lid?'active':''}" href="product_details.html?lid=${sp.lid}">${sp.spec}</a>
                  `;  
             }*/ 
             //将html整体填充回页面div中
          //   $("#specs").html(html);
            //3.填充左侧图片:
           
            //3.放大镜效果

            //3.1  填充图片
            //3.1.1 填充小图片列表
            //先定义空的HTML，准备接多个模板片段
            var html="";
            //遍历pics数组中每张图片对象
            for(var p of pics){
            html+=`
            <li>
              <img src="${p.sm}" data-md="${p.md}" data-lg="${p.lg}">
                 </li>
            `
            }
            //ul 图片列表的元素
             var $ulImgs=$("#ul-imgs");

             var LIWIDTH=78;
             $ulImgs.html(html)

             .css("width",pics.length*LIWIDTH);
             var $mImg=$("#ming");  //展示的图片元素
             // 放大镜大图效果
             var $lgDiv=$("#div-lg");

             $mImg.attr("src",pics[0].md);

             // 放大镜大图效果 同时为lgDiv设置背景图片为第一张图片的lg版本
             $lgDiv.css("background-image",`url(${pics[0].lg})`)

            //3.2点击箭头，移动小图片
             var $btn_left=$('#btn-left');
             var $btn_right=$('#btn-right');
             //如果pics的图片数量<=4张，则一开始就禁用右边按钮
             if(pics.length<=4){
                 $btn_right.addClass('disabled');
             }
             var times=0;
             var imgswidth=62;
             $btn_right.click(function(){
                 if(!$btn_right.is('.disabled')){
                 times++;
                 $ulImgs.css({
                     marginLeft:-imgswidth*times      
                 });
                 $btn_left.removeClass('disabled');
                 if(pics.length-times==4){
                    $btn_right.addClass('disabled'); 
                 }
                }
             });

             //左移
             $btn_left.click(function(){
                 if(!$btn_left.is('.disabled')){
                times--;
                $ulImgs.css({
                    marginLeft:-imgswidth*times      //画图看看为什么是负的
                });
                $btn_right.removeClass("disabled");
                if(times==0){
                    $btn_left.addClass('disabled');
                }
            }
            });
            //3.3鼠标进入小图片，切换中图片
              //事件委托，为父元素绑定鼠标进入事件
            $ulImgs.on("mouseenter","li>img",function(){
                //获得当前图片
                //获得当前图片的data-md属性
                //将data-md属性赋值给$mImg的src
                $mImg.attr("src",$(this).attr("data-md"));

                  // 放大镜放大图片效果
              $lgDiv.css("background-image",`url(${$(this).attr("data-lg")})`);
            });

           
            //3.4 鼠标进入
            var $mask=$("#mask");
            var $smask=$("#super-mask");
            var MSIZE=(430*432)/800;//记录小mask的大小
            console.log(MSIZE)
            var SMSIZE=430;  //中图片的宽度
            $smask.hover(function(){
                $mask.toggleClass("dnone");
                //放大镜放大图片效果
                $lgDiv.toggleClass("dnones");
            })
            .mousemove(function(e){
                var top=e.offsetY-MSIZE/2;
                var left=e.offsetX-MSIZE/2;
                //判断遮罩层是否在展示的元素里面
                if(top<0){
                    top=0;
                }else if(top>SMSIZE-MSIZE){
                    top=SMSIZE-MSIZE;
                }
                if(left<0){
                    left=0;
                }else if(left>SMSIZE-MSIZE){
                    left=SMSIZE-MSIZE;
                }
              
                $mask.css({
                    top:top+"px",
                    left:left+"px"
                })
                //放大镜放大图片效果
                $lgDiv.css("background-position",`${-left*800/432}px ${-top*800/432}px`)
                //大图片大小（800px）
                //中图片大小（350px）
            });
        }
    })
}
})

 
