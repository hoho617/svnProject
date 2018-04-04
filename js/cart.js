window.onload = function(){
	checkedChangeAll();
	checkedChange();
	selectAllCheckBox();
	modify();
	deletePro();
	cancelDelete();
};
/*点击单选的复选框*/
function checkedChange(){
	// 获取到所有点击单选的复选框
	var checkOneBoxs = document.querySelectorAll('.jd-shop-product .jd-check-box');
	// 添加点击事件
	for(var i = 0;i < checkOneBoxs.length;i++) {
		checkOneBoxs[i].onclick = function(){
			var hasChecked = this.getAttribute("checked"); // hasChecked值为 没有选中时为null,选中时值为空
			if(hasChecked == ""){
				this.removeAttribute("checked");
			}else {
				this.setAttribute("checked","");
			}
		};
	}
};
/*点击全选的复选框*/
function checkedChangeAll(){
	// 获取到所有点击全选的复选框
	var checkedAllBoxs = document.querySelectorAll('.title-check-box .jd-check-box');
	// 点击事件
	for(var i = 0;i < checkedAllBoxs.length;i++) {
		checkedAllBoxs[i].onclick = function(){
			var hasChecked = this.getAttribute("checked");
			var outerParent = this.parentNode.parentNode; // jd-shop-title
			var ulParent = outerParent.nextElementSibling; // ul
			var lis = ulParent.children;//所有的li
			var checkBoxparent = [];// 所有的product-check-box
			for(var i = 0;i < lis.length-2;i++) {
				checkBoxparent[i] = lis[i].children[0];
			}
			var checkedAllChildren = []; // 所有的子复选框
			for(var j = 0;j < checkBoxparent.length;j++){
				checkedAllChildren[j] = checkBoxparent[j].children[0];
			}
			console.log(checkedAllChildren);
			if(hasChecked == ""){ //选中了
				this.removeAttribute("checked");
				for(var j = 0;j < checkedAllChildren.length;j++) {
					checkedAllChildren[j].removeAttribute("checked");
				}
			}else { // 没选中
				this.setAttribute("checked","");
				for(var j = 0;j < checkedAllChildren.length;j++) {
					checkedAllChildren[j].setAttribute("checked","");
				}
				
			}
		};
	}
};
/*总计中的全选*/
function selectAllCheckBox(){
	// 拿到总计中的checkbox对象
	var selectAllCheckbox = document.querySelector('.amount-check-box .jd-check-box');
	// 拿到所有的jd-check-box
	var checkBoxs = document.querySelectorAll('.jd-check-box');
	selectAllCheckbox.onclick = function(){
		var hasChecked = this.getAttribute("checked");
		if(hasChecked == ""){//选中了	
			clearPrice();
			this.removeAttribute("checked");
			for(var i = 0;i < checkBoxs.length;i++) {
				checkBoxs[i].removeAttribute("checked");
			}
		}else {
			getTotalPrice();
			this.setAttribute("checked","");
			for(var i = 0;i < checkBoxs.length;i++) {
				checkBoxs[i].setAttribute("checked","");
			}
		}
	};
};

/*点击编辑出现修改状态的标签,点击完成，显示编辑二字*/
function modify(){
	// 取到编辑
	var editLis = document.querySelectorAll('.edit'); // 取到li.edit
	var editEles = []; //取到编辑二字
	for(var i = 0;i < editLis.length;i++) {
		editEles[i] = editLis[i].children[0];
	}
	for(var j = 0;j < editEles.length;j++){
		editEles[j].onclick = function(){
			this.parentNode.style.display = "none";
			this.parentNode.nextElementSibling.style.display = "block";
		};
	}
	// 取到完成
	var completeEles = document.querySelectorAll(".ok");
	for(var i = 0;i < completeEles.length;i++) {
		completeEles[i].onclick = function(){
			this.parentNode.style.display = "none";
			this.parentNode.previousElementSibling.style.display = "block";
		};
	}
};
/*点击删除，出现模态框*/
function deletePro(){
	// 取到删除二字
	var deleteEles = document.querySelectorAll('.delete');
	// 取到模态框大盒子
	var maskBox = document.querySelector('.jd-mask');
	// 取到弹出框元素
	var mask = document.querySelector('.jd-mask-box');
	for(var i = 0;i < deleteEles.length;i++) {
		deleteEles[i].onclick = function(){
			maskBox.style.display = "block";
			mask.classList.add('jumpout');
		};
	}
};
/*点击模态框上的取消，模态框隐藏*/
function cancelDelete(){
	// 获取到模态框上的取消
	var cancelEle = document.querySelector('.cancel');
	// 获取到模态框大盒子
	var maskBox = document.querySelector('.jd-mask');
	cancelEle.onclick = function(){
		maskBox.style.display = "none";
	};
};
 /*总计中的价格*/
    function getTotalPrice() {
        // 得到合计
        var totalPrice = document.querySelector('.totalPrice');
        // 得到总额
        var allPrice = document.querySelector('.allPrice');
        // 得到没一件商品的价格
        var eachPrice = document.querySelectorAll('.price');
        var prices = 0;
        for (var i = 0; i < eachPrice.length; i++) {
            prices += parseInt(eachPrice[i].children[0].innerHTML);
        }
        totalPrice.innerHTML = prices;
        allPrice.innerHTML = prices;
    };
    // 清空价格
    function clearPrice(){
    	// 得到合计
        var totalPrice = document.querySelector('.totalPrice');
        // 得到总额
        var allPrice = document.querySelector('.allPrice');
        totalPrice.innerHTML = 0;
        allPrice.innerHTML = 0;
    };
