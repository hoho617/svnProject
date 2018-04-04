window.onload = function(){
	leftCategory();
};
function leftCategory(){
	// 获取到左边的父大盒子
	var parentBox = document.querySelector('.jd-category-left');
	// 获取到做动画的子盒子
	var childBox = document.querySelector('.jd-category-left-box');
	// 获取到所有的li元素
	var navLis = document.querySelectorAll(".jd-category-left-box ul li");
	var liHeight = navLis[0].offsetHeight;
	// 获取到左边父大盒子的高度,包括padding
	var height = parentBox.offsetHeight;
	// 获取到顶部搜索栏的高度
	var topHeight = document.querySelector('.jd-topBar').offsetHeight;
	/*想要的*/
	// 得到父盒子（即可视区域的高度）= 父大盒子的offsetHeight - 顶部搜索栏的高度
	var parentH = height - topHeight;
	// 得到做动画子盒子的高度
	var childH = childBox.offsetHeight;
	console.log(childH-parentH);
	console.log(childH-window.screen.height+topHeight);
	// 添加过渡函数
	function addTransition(){
		childBox.style.transition = "all .3s ease";
		childBox.style.webkitTransition = "all .3s ease";
	};
	// 移除过渡函数
	function removeTransition(){
		childBox.style.transition = "none";
		childBox.style.webkitTransition = "none";
	};
	// 移动距离函数
	function setTransform(distance) {
		childBox.style.transform = "translateY("+distance+"px)";
		childBox.style.webkitTransform = "translateY("+distance+"px)";
	};
	// touch事件
	var startY = 0; // 开始位置
	var endY = 0; // 结束位置
	var moveY = 0; // 移动的距离
	
	var currentY = 0; // 此时所处的位置
	var rangeY = 150; // 允许上下晃动的范围
	var startTime = 0,endTime = 0; // 移动端的tap事件原理
	// 1.上下可以拖拽滑动
	// 触摸开始事件
	childBox.addEventListener("touchstart",function(e){
		console.time("tap");
		// 开始点击时间
		startTime = new Date().getTime();
		// 记录开始位置
		startY = e.touches[0].clientY;
//		console.log("startY---"+startY);
	});
	// 触摸移动事件
	childBox.addEventListener("touchmove",function(e){
		// 阻止默认滚动
		e.preventDefault();
		// 记录结束位置
		endY = e.touches[0].clientY;
		console.log("endY---"+endY);
		// 计算移动距离
		moveY = endY - startY;
//		console.log("moveY---"+moveY);
		
		//2.当超过上下晃动允许的范围时，则不可以再拖拽滑动---范围最大为150，最小为-（子盒子的高度-父盒子的高度）-150
		if((currentY + moveY) <= rangeY && (currentY+moveY) >= -(childH-parentH)-rangeY){
			removeTransition();
			setTransform(currentY + moveY);// 1.实现上下可以拖拽滑动
		};
	});
	// 触摸结束事件
	childBox.addEventListener("touchend",function(e){
		console.timeEnd("tap");
		// 3.在晃动范围内，产生吸附效果
		if((currentY+moveY) >=0) { // 大于0说明往下拉，此时向上 吸附，故只要满足大于0即可
			addTransition();
			setTransform(0);
			currentY = 0;
		}else if((currentY+moveY) <= -(childH-parentH)) { //小于-（子盒子的高度-父盒子的高度）说明已经往上拉到最后一个li元素，出现间隙，此时只需要向下吸附
			addTransition();
			setTransform(-(childH-parentH));
			currentY = -(childH-parentH);
		}else {
		// 记录当前滑动的位置
			currentY = currentY + moveY;
//			console.log("currentY---"+currentY);
		}
		
		console.log(1);
		//4.点击li，当前li改变样式，且该li元素跳到第一个位置
		// 结束点击时间
		endTime = new Date().getTime();
		console.log(endTime-startTime);
		if(endTime-startTime < 150) { // 如果当前点击间隔小于150ms，并且没有移动
			for(var i = 0;i < navLis.length;i++) {
				navLis[i].className = "";
				navLis[i].index = i;
				console.log("我是循环navLis")
			}
			e.target.parentNode.className = "active";
			var liIndex = e.target.parentNode.index; // 取到当前点击的li的索引值
			console.log(liIndex);
			var translateY = liIndex * liHeight; // 向上移动的距离
			if(translateY < (childH-parentH)){ // 当向上移动的距离大于(子盒子的高度 - 父盒子的高度)时，此时点击li不会跳动
				addTransition();
				setTransform(-translateY);
				currentY = -translateY;
			}else {
				addTransition();
				setTransform(-(childH-parentH));
				currentY = -(childH - parentH);
			}
		}
	});
};
