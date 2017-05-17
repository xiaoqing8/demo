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
function startMove(obj,attr,iTarget,fnEnd)
		{
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var cur=0;
				if(attr == 'opacity')
				{
					cur = Math.round(parseFloat(getStyle(obj,attr))*100);//处理透明度问题的时候别忘记乘以100，再用round四舍五入
				}
				else{
					cur = parseInt(getStyle(obj,attr));
				}
				speed = (iTarget-cur)/10;
				speed = speed>0?Math.ceil(speed):Math.floor(speed);
				if(cur==iTarget)
				{
					clearInterval(obj.timer);
					if(fnEnd)fnEnd();
				}
				else
				{	//alert(getStyle(obj,attr)); //100px
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

			},30);
		}