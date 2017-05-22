function getStyle(obj,name){
			if (obj.currentStyle) 
			{
				return obj.currentStyle[name];
			}
			else 
			{
				return getComputedStyle(obj,false)[name];//没有obj.get.......因为obj在函数里面了
			}
		}
function startMove(obj,json,fnEnd)
		{
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var bStop = true;//假设所有变量值都到达目标值
				for(var attr in json)
				{
				var cur=0;
				if(attr == 'opacity')
				{
					cur = Math.round(parseFloat(getStyle(obj,attr))*100);//处理透明度问题的时候别忘记乘以100，再用round四舍五入
				}
				else{
					cur = parseInt(getStyle(obj,attr));
				}
				speed = (json[attr]-cur)/3;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr])
				{
					bStop = false;
				}
					//alert(getStyle(obj,attr)); //100px
					if(attr=='opacity')
					{
						obj.style.filter = 'alpha(opacity:' + (cur+speed) + ')';
						obj.style.opacity = (cur+speed)/100;
					}
					else
					{
						obj.style[attr] = cur + speed + 'px';
					}				
				}
				if(bStop)
				{
					clearInterval(obj.timer);
					if(fnEnd)
						fnEnd();
				}
			},30);
		}