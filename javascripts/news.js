window.onload = function(){
	Flash.flash("hot",5,4);
}
var Flash = {
	hotWidth: 60,
	speed: null,
	max: null,
	title: null,
	frame: null,
	focus_a: null,
	focus: null,
	items: null,
	timer: null,
	flash: null,
	doMove: null,
	setSrc: null,
	fade: null,
	curIndex: null,
	cur: null,
	change: null,
	flash: function(id,max,speed){
		Flash.max = max;
		Flash.speed = speed*1000;
		Flash.items = new Array();
		Flash.cur = 0;
		Flash.curIndex = 0;
		var hot = document.getElementById(id);
		var tmp = hot.childNodes;
		for(var i = 0;i < tmp.length;i++){
			var elem = tmp[i];
			if(typeof elem.className!="undefined"){
				if(elem.className.indexOf("title")!=-1){
					Flash.title = elem;
				}
				if(elem.className.indexOf("frame")!=-1){
					Flash.frame = elem;
				}
				if(elem.className.indexOf("focus")!=-1){
					Flash.focus_a = elem.getElementsByTagName("a")[0];
					Flash.focus = elem.getElementsByTagName("img")[0];
				}
			}
		}
		tmp = hot.getElementsByTagName("li");
		var j = 0;
		for(i = 0;i < tmp.length;i++){
			elem = tmp[i];
			if(elem.className.indexOf("item")!=-1){
				Flash.items[j] = elem.getElementsByTagName("img")[0];
				j++;
			}
		}
		Flash.title.innerHTML = Flash.items[0].title;
		Flash.setSrc(Flash.items[0].src);
		Flash.timer = setInterval("Flash.doMove()",Flash.speed);
	},

	hot: function(index){
		if(Flash.timer!=null) clearInterval(Flash.timer);
		if(Flash.change!=null) clearInterval(Flash.change);
        var target = index * Flash.hotWidth;
        if(Flash.cur < target){
        	Flash.change = setInterval(function(){
        		Flash.cur = parseInt(Flash.frame.style.top.replace("px",""));
        		if(Flash.cur < target){
        			var to = Flash.cur + 2;
        			if(to > target) to = target;
        			Flash.frame.style.top = to + "px";
        		}
        		else{
        			clearInterval(Flash.change);
        			Flash.title.innerHTML = Flash.items[index].title;
        			Flash.fadeOut(Flash.items[index].src);
        			Flash.timer = setInterval("Flash.doMove()",Flash.speed);
        			Flash.curIndex = index;
        		}
        	},10);
        }
        else if(Flash.cur > target){
        	Flash.change = setInterval(function(){
        		Flash.cur = parseInt(Flash.frame.style.top.replace("px",""));
        		if(Flash.cur <= target){
        			clearInterval(Flash.change);
        			Flash.title.innerHTML = Flash.items[index].title;
        			Flash.fadeOut(Flash.items[index].src);
        			Flash.timer = setInterval("Flash.doMove()",Flash.speed);
        			Flash.curIndex = index;
        		}
        		else{
        			var to = Flash.cur - 2;
        			if(to < target) to = target;
        			Flash.frame.style.top = to + "px";
        		}
        	},10);
        }
	},  
       
	setSrc: function(src){
		Flash.focus.src = src.replace("-s","");
	},
	doMove: function(){
		var toIndex = Flash.curIndex + 1;
		if(toIndex >= Flash.max) toIndex = 0;
		Flash.hot(toIndex);
	},
	fadeOut: function(src){
		if(Flash.fade!=null) clearInterval(Flash.fade);
		var val = 1;
		Flash.focus.style.cssText = "opacity: 1; filter:alpha(opacity = 100);";
		Flash.fade = setInterval(function(){
			if(val >= 0){
				Flash.focus.style.cssText = "opacity: " + val + "; filter:alpha(opacity = " + val*100 + ")";
				val -= 0.04;
			} 
			else{
				clearInterval(Flash.fade);
			}
		},20);
		Flash.setSrc(src);
		Flash.fadeIn();
	},
	fadeIn: function(){
		if(Flash.fade!=null) clearInterval(Flash.fade);
		var val = 0;
		Flash.fade = setInterval(function(){
			if(val <= 1){
				Flash.focus.style.cssText = "opacity: " + val + "; filter:alpha(opacity = " + val*100 + ")";
				val += 0.04;
			}
			else{
				clearInterval(Flash.fade);
			}
		},20);
	},
}