window.onload = function() {
	search();
	secondKill();
	slider();
	newsSlider();
	secondKillProducts();
	console.log(window.screen.height)
};
/*头部搜索*/
var search = function() {
	/*获取到搜索框对象*/
	var searchBox = document.getElementsByClassName('jd-header-bg')[0];
	/*获取到banner对象*/
	var banner = document.getElementsByClassName('jd-banner')[0];
	/*获取到banner的高*/
	var bannerHeight = banner.offsetHeight;
	/*监听滚动条滚动事件*/
	window.onscroll = function() {
		/*获取到滚动条的位置*/
		var scrolltop = document.body.scrollTop;
		var opacity = 0;
		if(scrolltop > bannerHeight) {
			searchBox.style.opacity = .85;
		}else {
			opacity = scrolltop / bannerHeight;
			searchBox.style.opacity = opacity;		
		}
	}
};
/*秒杀*/
var secondKill = function () {
	/*获取到几点场*/
	var skNth = document.getElementsByClassName('sk-nth')[0];
	var num = skNth.children[0];
	/*获取到秒杀父盒子*/
	var skTime = document.getElementsByClassName('sk-time')[0];
	/*获取到父盒子下的数字子盒子*/
	var skNum = skTime.getElementsByClassName('sk-time-num');
	/*得到当前的时间*/
	var nowTime = new Date();
	/*获取到当前的年月日*/
	var nowYear = nowTime.getFullYear();
	var nowMonth = nowTime.getMonth()+1;
	var nowDate = nowTime.getDate();
	/*获取到当前的小时数*/
	var nowHours = nowTime.getHours();
	var startHour = 6;
	/*倒计时函数*/
	function daijishi(endtime) {
		var endTime = new Date(nowYear + '/' + nowMonth + '/' + nowDate + ' ' + endtime +':00:00');	
		var seconds = Math.floor((endTime.getTime()-nowTime.getTime()) / 1000);
		var timer = setInterval(function(){
			seconds --;
		//		console.log(seconds);
		var h = Math.floor(seconds / 3600);
		var m = Math.floor(seconds / 60 % 60);
		var s = Math.floor(seconds % 60);
		skNum[0].children[0].innerHTML = h>10?Math.floor(h/10):0;
		skNum[0].children[1].innerHTML = h % 10;
		skNum[1].children[0].innerHTML = m>10?Math.floor(m/10):0;
		skNum[1].children[1].innerHTML = m % 10;
		skNum[2].children[0].innerHTML = s>10?Math.floor(s/10):0;
		skNum[2].children[1].innerHTML = s % 10;
		if(seconds < 0) {
			clearInterval(timer);
		}
		},1000);
	};
	if(nowHours>=startHour && nowHours <startHour+2) {
		num.innerHTML = startHour;
		daijishi(8);
	}else if(nowHours>=startHour+2 && nowHours <startHour+4){
		num.innerHTML = startHour+2;
		daijishi(10);
	}else if(nowHours>=startHour+4 && nowHours <startHour+6){
		num.innerHTML = startHour+4;
		daijishi(12);
	}else if(nowHours>=startHour+6 && nowHours <startHour+8){
		num.innerHTML = startHour+6;
		daijishi(14);
	}else if(nowHours>=startHour+8 && nowHours <startHour+10){
		num.innerHTML = startHour+8;
		daijishi(16);
	}else if(nowHours>=startHour+10 && nowHours <startHour+12){
		num.innerHTML = startHour+10;
		daijishi(18);
	}else{
		num.innerHTML = 0;
	}
};

/*京东快报 垂直轮播*/
var newsSlider = function (){
	/*获取到news大盒子*/
	var scrollBox = document.querySelector(".jd-news-scrollBox");
	var newsBox = scrollBox.querySelector("ul");
	/*获取到所有的li*/
	var lis = newsBox.children;
	/*获取到一个li的高度*/
	var liHeight = lis[0].offsetHeight;
	var index = 1; // 显示第一个li	
	/*改变位置函数*/
	function setTransform(position){
		newsBox.style.transform = "translateY("+position+"px)";
		newsBox.style.webkitTransform = "translateY("+position+"px)";
	};
	/*设置定时器*/
	var timer = setInterval(function(){
		index++;
		addTransition(newsBox);
		setTransform(-liHeight * index);
	},1500);
	/*判断到达了第几个li*/
	newsBox.addEventListener("transitionend",function(){
		console.log("li过渡完了");
		if(index >= 4) {
			index = 1;
		}else if(index <= 0) {
			index = 3;
		}
		removeTransition(newsBox);
		setTransform(-index * liHeight);
	});
	newsBox.addEventListener("webkitTransitionEnd",function(){
		console.log("li过渡完了");
		if(index >= 4) {
			index = 1;
		}else if(index <= 0) {
			index = 3;
		}
		removeTransition(newsBox);
		setTransform(-index * liHeight);
	});
};
/*加过渡函数*/
function addTransition(obj){
	obj.style.transition = "all .5s ease";
	obj.style.webkitTransition = "all .5s ease";
};
/*减过渡函数*/
function removeTransition(obj){
	obj.style.transition = "none";
	obj.style.webkitTransition = "none";
};
/*轮播图*/
function slider(){
	// 获取到jd-banner大盒子
	var bannerBox = document.querySelector('.jd-banner');
	// 获取到做动画的盒子
	// 1.图片大盒子
	var imgBox = document.querySelector('.jd-banner .img-box');
	// 2.点大盒子
	var pointBox = document.querySelector('.jd-banner .point-box');
	// 获取到大盒子下的li元素
	// 1.图片lis
	var imgLis = document.querySelectorAll('.img-box li');
	// 图片的宽度
	var liWidth = imgLis[0].offsetWidth;
	//2. 点lis
	var pointLis = pointBox.querySelectorAll('.point-box li');
	// 当前显示第几张图片,设置一开始显示slider1
	var index = 1;
	imgBox.style.transform = "translateX(-"+index * liWidth+"px)";
	
	// 定义移动距离函数
	function setTransform(distance) {
		imgBox.style.transform = "translateX("+distance+"px)";
		imgBox.style.webkitTransform = "translateX("+distance+"px)";
	}
	// 1.让图片向左滑动起来
	var timer = setInterval(function(){
		index++; // 向左滑，下一张则为第二张
		addTransition(imgBox);
		setTransform(-index * liWidth);
	},2000);
	// 添加过渡动画结束事件，为了保证最后一张我们手动增加的图片过渡完成的瞬间，回到真正的第一张图片
	imgBox.addEventListener("transitionend",function(){
		if(index >= 9) { // index等于九就代表slider1
			index = 1;
		}else if(index <= 0) { //index等于0就代表为我们手动添加的slider8
			index = 8;
		}
		removeTransition(imgBox);
		setTransform(-index * liWidth);
		setPoint();
	});
	imgBox.addEventListener("webkitTransitionEnd",function(){
		if(index >= 9) { // index等于九就代表slider1
			index = 1;
		}else if(index <= 0) { //index等于0就代表为我们手动添加的slider8
			index = 8;
		}
		removeTransition(imgBox);
		setTransform(-index * liWidth);
		setPoint();
	});
	
	// 2.让小圆点随着图片而变化
	function setPoint(){
		// 首先将所有的li的类名清空，然后再给当前图片对应的小圆点添加上active类
		for(var i = 0;i < pointLis.length;i++) {
			pointLis[i].className = "";
		}
		pointLis[index-1].className = "active";
	};
	
	// 3.手指滑动或 拖拽图片---touch事件
	var startX = 0;// 开始位置
	var endX = 0; // 结束位置
	var moveX = 0; // 移动距离
	var isMove = false; // 移动标志-false:未移动
	// 触摸开始事件
	imgBox.addEventListener("touchstart",function(e){
		// 移动标志仍为false
		isMove = false;
		// 记录开始位置
		startX = e.touches[0].clientX;
		console.log("触摸开始");
	},false);
	// 触摸滑动事件
	imgBox.addEventListener("touchmove",function(e){
		console.log("触摸移动");
		// 清除定时器
		clearInterval(timer);
		// 阻止默认滚动事件
		e.preventDefault();
		// 滑动标志设为true
		isMove = true;
		// 记录结束位置
		endX = e.touches[0].clientX;
		// 记录移动距离
		moveX = endX - startX;
		// 拖拽图片
		setTransform(-index * liWidth + moveX);
	});
	// 触摸结束事件
	imgBox.addEventListener("touchend",function(e){
		console.log("触摸结束");
		// 如果移动距离大于图片宽度的三分之一，并且移动标志为true
		if(Math.abs(moveX) > liWidth/3 && isMove) {
			if(moveX < 0) { // 向左滑
				index ++;
				console.log("向左滑")
			}else if(moveX > 0) { // 向右滑
				index --;
				console.log("向右滑")
			}
		}
		addTransition(imgBox);
		setTransform(-index * liWidth);
		timer = setInterval(function(){
			index++;
			addTransition(imgBox);
			setTransform(-index * liWidth);
		},2000);
	},false);
};

/*拖动秒杀商品栏*/
function secondKillProducts(){
	// 获取到ul元素
	var skUl = document.querySelectorAll('.sk-product')[0].children[0];
	// 取到所有li元素
	var lis = skUl.children;
	console.log(lis);
	// 设置li的宽度
	for(var i = 0;i <lis.length;i++) {
		lis[i].style.width = lis[i].children[0].offsetWidth +"px";
	}
	// 设置ul的宽度
	var ulWidth = 0;
	for(var i = 0;i < lis.length;i++) {
		ulWidth += parseInt(lis[i].style.width);
	}
	skUl.style.width = ulWidth + "px";
	// 设置屏幕宽度
	var screenWidth = window.screen.width;
	
	// 添加过渡函数
	function addTransition(){
		skUl.style.transition = "all .3s ease";
		skUl.style.webkitTransition = "all .3s ease";
	};
	// 移除过渡函数
	function removeTransition(){
		skUl.style.transition = "none";
		skUl.style.webkitTransition = "none";
	};
	// 移动距离函数
	function setTransform(distance){
		skUl.style.transform = "translateX("+distance+"px)";
		skUl.style.webkitTransform = "translateX("+distance+"px)";
	};
	// touch事件
	var startX = 0; // 开始位置
	var endX = 0; // 结束位置
	var moveX = 0; // 移动距离
	var currentX = 0; // 最左边的起始位置的当前位置
	var rangeX = 150; // 设置允许晃动的范围
	// 触摸开始
	skUl.addEventListener("touchstart",function(e){
		// 记录开始位置
		startX = e.touches[0].clientX;
	});
	// 触摸移动
	skUl.addEventListener("touchmove",function(e){
		e.preventDefault();
		// 记录结束位置
		endX = e.touches[0].clientX;
		// 计算移动距离
		moveX = endX - startX;
		/*2.当晃动距离大于晃动范围时,不允许继续滑动--即在大于-(ul的宽度 - 屏幕宽度)-rangeX 且小于 rangeX 内可以滑动*/
		if((currentX + moveX) <= rangeX && (currentX+moveX) >=-(ulWidth - screenWidth) - rangeX ) {		
			removeTransition();
			setTransform(currentX + moveX); // 1.开始滑动
		}
	});
	// 触摸结束
	skUl.addEventListener("touchend",function(e){
		/*3.当在允许晃动范围内，出现吸附现象--一旦滑动距离大于0，则向上吸附，一旦滑动距离小于-（ul的宽度 - 屏幕的宽度）则向下吸附*/
		if((currentX + moveX) >= 0) {
			addTransition();
			setTransform(0);
			currentX = 0;
		}else if((currentX + moveX) <= -(ulWidth - screenWidth)) {
			addTransition();
			setTransform(-(ulWidth - screenWidth));
			currentX = -(ulWidth - screenWidth);
		}else {
			// 记录当前位置位置
			currentX = currentX + moveX;
		}
	});
};
