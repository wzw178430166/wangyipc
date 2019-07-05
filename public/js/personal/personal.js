/**
 * Created by web on 2019/6/13.
 */
               
                                //个人中心

    //头部框架自适应
(function(){
     var my_iframe=document.getElementById('my_header');  //头部iframe
    var nextdiv=my_iframe.parentNode.parentNode;
    var nextdivs=nextdiv.nextElementSibling;
     my_iframe.onmouseover=function(e){
       // this.style.height="480px";
        this.style.height="580px";
         nextdivs.style.top="-362px"; //这个高度刚好没有错位
     }
     my_iframe.onmouseleave=function(e){
         this.style.height="200px";
         nextdivs.style.top="18px";
     }
}())

