window.onload=function(){
	leftCategory();
}

//左边分类
var leftCategory=function(){
	//父盒子
	var parentBox=document.getElementsByClassName("jd_category_left")[0];
	var childBox=parentBox.getElementsByClassName("jd_category_left_box")[0];
	var height=parentBox.offsetHeight;
	var topHeight=document.getElementsByClassName("jd_topbar")[0].offsetHeight;

	/*想要的*/
	var parentH=height-topHeight;
	var childH=childBox.offsetHeight;
	var startY=0;
	var endY=0;
	var moveY=0;
	var currY=0;
	var UpDownY=150;
	//加过渡
	var addTransition=function(){
		childBox.style.transition="all .3s ease 0s";
		childBox.style.webkitTransition="all .3s ease 0s";
	}
	//减加速
	var removeTransition=function(){
		childBox.style.transition="all .3s ease 0s";
		childBox.style.webkitTransition="all .3s ease 0s";
	}

	//减过渡
	var removeTransition=function(){
		childBox.style.transition="none";
		childBox.style.webkitTransition="none";
	}
	//改变位置
	var setTransform=function(t){
		childBox.style.transform="translateY("+t+'px)';
		childBox.style.webkitTransform="translateY("+t+"px)";
	}


	childBox.addEventListener('touchstart',function(e){
		startY=e.touches[0].clientY;
	},false)
	childBox.addEventListener('touchmove',function(e){
		e.preventDefault();

		endY=e.touches[0].clientY;
		moveY=startY-endY;

		if (currY-moveY>=UpDownY) {
			removeTransition();
			setTransform(currY-moveY);
		}

		// 上下的间距不大于UpDownY
		if (currY-moveY<UpDownY && currY-moveY>(-(childH-parentH)-UpDownY)) {
			removeTransition();
			setTransform(currY-moveY);
		}

		removeTransition();
		setTransform(currY-moveY);
	},false);
	childBox.addEventListener('touchend',function(e){
		//当前滑动的位置
		currY=currY-moveY;
	},false)


}