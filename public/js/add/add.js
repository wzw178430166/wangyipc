//正则验证表单

//   验证用户邮箱格式
 function v_uname(){
     var str=u_name.value;
     var reg=/^\w+@\w+.\w{2,3}$/igm;
     var results=str.search(reg);
     if(results!=-1){
         $('#uname_msg').html("<font style='color:green;'>验证通过</font>");
     }else{
         $('#uname_msg').html("<font style='color:red;'>格式错误</font>");
         $('#u_name').focus();
     }
 }

  //验证密码格式
  function v_upwd(){
      var str=u_pwd.value;
      var reg=/^[a-z0-9_-]{6,18}$/;
      var resutl=reg.test(str);
      if(!resutl){
        upwd_msg.innerHTML='<i style="color:red">密码输入格式不正确</i>';
      }else{
          upwd_msg.innerHTML="";
      }
  }

   //手机号正则验证
                (function(){
                    var uphoneo=document.getElementById('u_phones');
                    var table_ex=document.getElementsByClassName('table_ex')[3];
                    function v_phone() {
                        var reg = /^1[3-8]\d{9}$/igm;
                        var up_value = uphoneo.value;
                        var aa = up_value.match(reg);
                        if (aa !=-1) {
                            table_ex.innerHTML = "<font style='color:#2DB261;'>格式正确</font>";
                        } else {
                            table_ex.innerHTML = "格式错误r";
                        }
                    }
                    uphoneo.onblur=function(){
                        v_phone();
                    }
                }())
  //AjAx提交注册信息
           $(function(){
               var form=document.forms[0];
                var {uname,upwd,phone}=form;
            //    var login=form[form.length-1].getAttribute('data-add');
              var logins=document.getElementById('logins');
              // console.log(login);

               function fn(){
                   var $uname=uname.value;
                   var $upwd=upwd.value;
                   var $phone=phone.value;
                   //1.创建异步对象
                   var xhr=new XMLHttpRequest();
                   // console.log(xhr);
                   //4.监听接收响应数据
                   xhr.onreadystatechange=function(){
                       if(xhr.readyState==4&&xhr.status==200){
                           var result=xhr.responseText;
                           if(result=="1"){
                               alert('注册成功');
                               //注册完跳转禁止后退
                                location.replace("./index.html");
                           }else{
                               alert('注册失败请再次操作');
                           }
                       }
                   }
                   //2.打开连接
                   xhr.open('post','http://127.0.0.1:8080/user/add');
                   //post 的参数是通过请求主体    form表单观察请求主体格式 浏览器 form data
                   var formdata="uname="+$uname+"&upwd="+$upwd+"&phone="+$phone;
                   //由于ajax默认传输是text/plain
                   //无法传递特殊符号，我们需要更改消息头
                   //让ajax请求可以传递特殊字符
                   xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                   //3.发送请求
                   xhr.send(formdata);
               }
               logins.onclick=function(){
                   fn();
               }
           })