/*
* @Author: Administrator
* @Date:   2018-01-26 13:09:30
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-27 16:47:14
*/
window.onload=function(){
	search();
	secondkill();
	scrollpic();
}
/*头部搜索*/
var search=function(){
	//搜索框对象
	var search=document.getElementsByClassName('jd_header_box')[0];
	//轮播图对象
	var banner=document.getElementsByClassName('jd_banner')[0];
	//banner高度
	var height=banner.offsetHeight;

	window.onscroll=function(){
		var top=Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		/*当滚动的高度大于banner高度的时候颜色不变*/
		if (top>height) {
			search.style.background="rgba(201,21,35,0.85)";
		}else{
			var op=top/height*0.85;
			search.style.background="rgba(201,21,35,"+op+")";
		}
	}
}
/*秒杀倒计时*/
var secondkill=function(){
	var parentTime=document.getElementsByClassName('sk_time')[0];
	var timelist=parentTime.getElementsByClassName('num');
	
	var times=4*60*60+30*60+43;
	setInterval(function(){
	    times--;
	    var h=Math.floor(times/60/60);
		var m=Math.floor(times/60%60);
		var s=times%60;
		timelist[0].innerHTML=h>10?Math.floor(h/10):0;
		timelist[1].innerHTML=h%10;
		timelist[2].innerHTML=m>10?Math.floor(m/10):0;
		timelist[3].innerHTML=m%10;
		timelist[4].innerHTML=s>10?Math.floor(s/10):0;
		timelist[5].innerHTML=s%10;
	},1000);
}

/*轮播图*/
var scrollpic=function(){
	// banner
	var banner=document.getElementsByClassName("jd_banner")[0];
	var width=banner.offsetWidth;
	// 图片盒子
	var imgbox=banner.getElementsByTagName("ul")[0];
	// 点盒子
	var pointBox=banner.getElementsByTagName("ul")[1];
	//点数组
	var point=pointBox.getElementsByTagName("li");
	// 点数组
	var pointList=pointBox.getElementsByTagName("li");

	var index=1;
	var timer;

	// 添加过渡效果
	var addTransition=function(){
		imgbox.style.transition="all 0.3s ease 0s";
		imgbox.style.webkitTransition="all 0.3s ease 0s";
	}

	// 清除过渡效果
	var removeTransition=function(){
		imgbox.style.transition="none";
		imgbox.style.webkitTransition="none";
	}

	// 设置移动距离
	var setTransform=function(t){
		imgbox.style.transform="translateX("+t+"px)";
		imgbox.style.webkitTransform="translateX("+t+"px)";
	}

	// 控制小圆点
	function setPoint(){
		for(var i=0;i<point.length;i++){
			point[i].className="";
		}
		point[index-1].className="now";
	}

	//设置定时器
	var timer = setInterval(function(){
		index++;
		addTransition();	
		setTransform(-index*width);
	},3000)

	imgbox.addEventListener('transitionEnd',function(){
		if (index>=9) {
			index=1;
		}else if(index<=0){
			index=8;
		}
		removeTransition();
		setTransform(-index*width);
		setPoint()
	},false)

	imgbox.addEventListener('webkitTransitionEnd',function(){
		if (index>=9) {
			index=1;
		}else if(index<=0){
			index=8;
		}
		removeTransition();
		setTransform(-index*width);
		setPoint()
	},false)

	//添加touch事件方法一
	// var startX=0;
	// var moveX=0;
	// var isMove=false;

	// imgbox.addEventListener("touchstart",function(event){
	// 	isMove=false;
	// 	clearInterval(timer);
	// 	startX=event.touches[0].clientX;
	// })

	// imgbox.addEventListener("touchmove",function(event){
	// 	isMove=true;
	// 	moveX=event.touches[0].clientX-startX;
	// 	setTransform(moveX+index*width*-1);
	// })

	// imgbox.addEventListener("touchend",function(event){
	// 	if (isMove && Math.abs(moveX) > width/3) {
	// 		if (moveX <0) {
	// 			index++;
	// 		}else if(moveX>0){
	// 			index--;
	// 		}
	// 	}
	// 	addTransition();
	// 	setTransform(index*width*-1);
	// 	timer=setInterval(function(){
	// 		index++;
	// 		addTransition();
	// 		setTransform(width*index*-1);
	// 	},1000)
	// })
	
	
	//方法二

	//触摸事件开始
	imgbox.addEventListener('touchstart',function(e){
		console.log('start');
		/*记录开始的位置*/
		startX=e.touches[0].clientX;
	})
	//触摸滑动事件
	imgbox.addEventListener('touchmove',function(e){
		clearInterval(timer);
		/*清除默认的滚动事件*/
		e.preventDefault();
		console.log('move');
		/*记录结束的位置*/
		endX=e.touches[0].clientX;
		/*记录移动的距离*/
		moveX=startX-endX;
		/*清除定时器*/
		removeTransition();
		setTransform(-index*width-moveX);
	})
	/*触摸结束事件*/
	imgbox.addEventListener('touchend',function(e){
		console.log('end');
		/*如果移动的距离大于三分之一，并且是移动过的*/
		if (Math.abs(moveX)>(1/3*width)&&endX!=0) {
			//向左
			if (moveX>0) {
				index++;
			}
			//向右
			else{
				index--;
			}
			//改变位置
			setTransform(-index*width);
		}
		//回到原来的位置
		addTransition();
		setTransform(-index*width);
		/*初始化*/
		startX=0;
		endX=0;

		console.log(timer);
		/*严谨的处理定时器*/
		clearInterval(timer);
		timer=setInterval(function(){
			index++;
			addTransition();
			setTransform(-index*width);
		},3000)
	})
}

