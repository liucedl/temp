var conone=document.getElementById("one-con");//第一页
var contwo=document.getElementById("con-two");//第二页
var contwo2=document.getElementById("con-two-2");//第2-2页
var conthree=document.getElementById("con-three");//第三页
var msgts=document.querySelector(".outmsg"); //提示窗口
var msgarea=document.querySelector(".outmsgtextarea"); //提示信息
var btnenter=document.querySelector(".outmsgbtn") //提示确认按钮
var inputval=document.querySelector("input");//输入框值 console.log(inputval);
var btnyz=document.querySelector(".btnyz");//验证按钮
var btnget=document.getElementById("installapp");//跳转按钮到提示下载页
var imgarr=document.querySelectorAll(".img1"); //第一页图片替换
var noappmonth=document.querySelector("#noappmonth");
var allmonth=document.querySelector("#allmonth");
var startmonth1=document.querySelector("#startmonth1");
var startmonth2=document.querySelector("#startmonth2");
var appmonthadd1=document.querySelector(".appmonthadd1");
var appmonthadd2=document.querySelector(".appmonthadd2");


//跳转到最后一页
btnget.onclick=function(){
	contwo.style.display="none";
	conthree.style.display="block";
};


//获取设备宽高 匹配css2
changeMargin();
window.onresize = function(){ changeMargin(); };
    function changeMargin(){ 
            var w,h;
			w=document.documentElement.clientWidth;
			h=document.documentElement.clientHeight;	
            if(h/w>1.76){
    			removelink();
    			var l=document.createElement("link");
    				l.href="css/oclean2.css";
    				l.type="text/css";
    				l.rel="stylesheet";
    			document.getElementsByTagName("head").item(0).appendChild(l);

            }else{
            	removelink();
            	}
            	
}

//删除link css2
function removelink(){
	var head=document.getElementsByTagName("head")[0];
	var linklist=head.getElementsByTagName("link");
	for(var i=1;i<linklist.length;i++){
		head.removeChild(linklist[i]);
	}
}


//图片替换函数		
function imgLoad(img, callback) {
    var timer4 = setInterval(function() {
        if(img.complete) {
            callback(img);
            clearInterval(timer4);
        }
    }, 50);
 }

imgLoad(imgarr[1],function() {
   			imgarr[1].style.display="block";
	        imgarr[0].style.display="none";  
});



//请求验证 jquery ajax
var startmonth,wxmonth,appmonth,appmonthadd;
function ajaxqj() {
	$.ajax({
		"type": "post",
		"url": "/tools/addguarantee.ashx?action=wxoaddguarantee&Sn="+inputval.value,
		"dataType": "json",
		success: function(res) {
			if(res.Status=="0"){
				startmonth=parseFloat(res.Data.OriginalPeriod);
				wxmonth=parseFloat(res.Data.WeChatPublicPeriod);
				appmonth=parseFloat(res.Data.BinDeivePeriod);
				appmonthadd=parseFloat(res.Data.BindDeviceAddmonth);
				if(appmonth=="0"){
					appmonthadd1.innerText=appmonthadd;
					appmonthadd2.innerText=appmonthadd;
					startmonth1.innerText=startmonth;
					noappmonth.innerText=startmonth+wxmonth;
					conone.style.display="none";
					contwo.style.display="block";
				}else{
					startmonth2.innerText=startmonth+appmonth;
					allmonth.innerText=startmonth+wxmonth+appmonth;
					conone.style.display="none";
					contwo2.style.display="block";
				}
				
			}else{
				msgts.style.display="block";
				msgarea.innerText=res.Data;	
			}
		}
	});
}



//验证sn码正则
function textmsg1(){
	var pat=new RegExp("^[0-9a-zA-Z]{18}$");
	var c=pat.test(inputval.value);
	return c;
}

function textmsg2(){
	var pat=new RegExp("^[0-9a-zA-Z]{13}$");
	var c=pat.test(inputval.value);
	return c;
}



//点击验证按钮
btnyz.onclick=function(){
	
	//alert("本次活动已经结束!");
	//return;

	if(textmsg1()){	
		ajaxqj();
	}else if(textmsg2()){	
		ajaxqj();
	}else{
		msgts.style.display="block";
		msgarea.innerText="请输入有效的SN码";
	}
};


//点击确定按钮
btnenter.addEventListener("touchstart",function(){
	msgts.style.display="none";
},false);

//禁止滑动
msgts.addEventListener("touchmove",function(e){
	e.preventDefault();
},false);
btnenter.addEventListener("click", function () {
    msgts.style.display = "none";
}, false);
