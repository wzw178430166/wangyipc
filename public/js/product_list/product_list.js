 //请求商品列表信息 http://127.0.0.1:8080/product_list 路由已经写好

//请求头部文件
$.ajax({
    url:"./header.html",  //当前客户端向这个地址的服务器发送请求
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
    url:"./footer.html",  //当前客户端向这个地址的服务器发送请求
    type:"get",//请求类型
    success: function(result){
       // console.log(result);
        $(result).replaceAll('footer');
        //动态添加link元素，引入 header.css文件 自动添加到<head>
     //   $(`<link rel="stylesheet" href="./second_css/product/product.css">`).appendTo('head');
    }
});
 //请求商品列表信息
$(function(){
    if(location.search!==""){
    //获得地址栏中的？lid=2中的2
   var lid=location.search.split("=")[1]  //这个是a标签的url传到浏览器地址栏，截取的下标  （第一对应第二）
   //console.log(lid);
    //用2作为参数向服务端发送请求
    $.ajax({
        url:"http://127.0.0.1:8080/product_list",   //http://localhost:3000/details?lid=5
        type:"get",
        data:{  //     这个是  "uname=dingding&upwd=123456"   "lid="+lid   //data:自动带？
            lid//服务端要的参数名lid : lid变量名  省略？号
        },   //  第二
        dataType:"json", //JSON.parse()
    })
    .then((result)=>{
       // console.log(result);
            //先将三大块数据解构出来
            console.log(result)
            var {product,specs,pics}=result;
           // console.log(product);
            new Vue({
                el:"#content",
                data:{picsa:pics}
            });
           // console.log(specs);
             //循环出li原点
             var i=0;   //现在正在显示第几张，从0开始
             var LIWIDTH=100;  //每个li的固定宽度
             var DURATION=500;//每次轮播的时间
             var LICOUNT=pics.length;//li的总个数
             var ulImgs=document.getElementById("ul-imgs");
             var ulIdxs=document.getElementById("ul-idxs");
             var lis=ulIdxs.children;
            var btn_left=document.getElementById('btn-left');
            var btn_right=document.getElementById('btn-right');
            var canClick=true; //开关按钮，防止用户重复点击
            lis[0].className="active";
            //lis[0].className="active";
            btn_right.onclick=function(){
                //左移一个
                move(1);
            }
            btn_left.onclick=function(){
                  move(-1);
              }
         
             //两个按钮共用的移动函数
              function move(n){
               if(canClick){
                   moveTo(i+n);
                   canClick=false;
                   //只有本地动画播放完，才能自动打开开关，点击按钮才有反应
                   setTimeout(function(){
                       canClick=true;
                   },DURATION+100);
               }
              }
               // 轮播核心函数
           function moveTo(to){
               if(to==undefined){
                   to=i+1;
               }
               if(i==0){
                   if(to>i){ //在第一张顺序向左移正常执行
                   ulImgs.className="transition";
                   }else{ //在第一张反向向右移再做改变瞬间将ul移到最后一张li(想看左边的图片)
                       ulImgs.className="";
                       ulImgs.style.marginLeft=-LIWIDTH*LICOUNT+"%";
                     //  console.log(ulImgs.style.marginLeft);
                       setTimeout(function(){
                          moveTo(LICOUNT-1);
                       },100);
                       return;
                   }
               }
               i=to;
               ulImgs.style.marginLeft=-i*LIWIDTH+"%";
         
               for(var li of lis){
                  li.className=""; 
               }
               if(i==LICOUNT){
                   i=0;
                   setTimeout(function(){
                  ulImgs.className="";
                  ulImgs.style.marginLeft=0
                   },DURATION);
               }
               lis[i].className="active";
           }
            var interval=3000;
            var timer=setInterval(function(){
                moveTo();
            },3000);
            var content=document.getElementById('content');
            content.onmouseover=function(){
              clearInterval(timer);
            }
            content.onmouseout=function(){
              timer=setInterval(function(){
                    moveTo();
                },3000);
            }
                  //手动轮播
                //  var canClick=true;
             ulIdxs.onclick=function(e){
                 if(canClick){
                     var li=e.target;
                     if(li.nodeName=="LI"&&li.className!=="active"){
                         for(var i=0;i<lis.length;i++){
                             if(lis[i]==li){
                                 break;
                             }
                         }
                     }
                     moveTo(i);
                     setTimeout(function(){
                      canClick=true;
                     },DURATION);
                 }
             }

             //传入回调函数进.then  可以避免回调地狱
             /*function math (num1,num2,fun) {
                return fun(num1,num2)
             }*/
             return result;
      }).then((result)=>{
       /* function cc (num1,num2) {
            return (num1-num2)*2-1
          }*/
       //  console.log(math(1,2,cc));
        // console.log(result);
          //商品列表
          var {product,productList,pics}=result;
          new Vue({
            el:"#summer",
            data:{productList,
                i:productList[0].log_t
            },
            methods: {   //自定义方法
                
            },
            created(){
               // alert(111);
            }
        });
          
      })
   }
})
//