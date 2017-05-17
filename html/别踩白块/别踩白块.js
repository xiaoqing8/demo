var speed = 2;
var timer = null;

//生成div
function createDiv(className)
{
	var div = document.createElement('div');
	div.className = className;
	return div;
}
function createCell()
{
	var classArr = ['cell-white','cell-white','cell-white','cell-white'];
	var i = Math.floor(Math.random()*4);//Math.random()可以返回一个0~1之间的随机数
	classArr[i] = 'cell-black';
	return classArr;
} 
function createRow()
{
	var con = document.getElementById('div-continer');
	var row = createDiv('row');
	var arr = createCell();

	for(var i=0;i<4;i++)
		row.appendChild(createDiv(arr[i]));

	row.pass = false;

	if(con.children.length > 0){
		con.style.top = '-100px';
		con.insertBefore(row,con.firstElementChild);
	}
	else
		con.appendChild(row);
}
function init()
{
	document.getElementById('score').innerHTML = 0;
	speed = 2;
	timer = setInterval(move,30);

	var con = document.getElementById('div-continer');

// alert(con.children.length);
	for(var i=con.children.length-1; i>=0;i--)
	{
		con.removeChild(con.children[i]);
	}

	for(var i=0;i<5;i++)
	{
		createRow();
	}

	for(var i=0;i<con.children.length;i++)
	{	if(con.children[i].nodeType == 1)
			con.children[i].pass = false;
	}
	con.onclick = function()
	{
		// alert('背景被点击了3');
		judge();
		// alert('juge被调用完了');
	};
}
function commence()
{
	var oBtn = document.getElementById('btn');
	oBtn.onclick = function()
	{
		init();
	};
}
function judge(ev)
{   
// var oEvent = ev||event;
// 	alert(oEvent.target.className);
	var con = document.getElementById('div-continer');
	var oEvent = ev||event;
	if(oEvent.target.className=='cell-black')
	{	
		//alert('点到的是黑块');
		oEvent.target.className = 'cell-red';
		oEvent.target.parentNode.pass = true;
		score();
	}
	else
	{
		fail();
		//alert('vous avez touche la case blanche');
	}
}
function score()
{
	var score = parseInt(document.getElementById('score').innerHTML)+1;
	document.getElementById('score').innerHTML = score;
	if(score%10 == 0)
	{
		speedUp();
	}
}
function speedUp()
{
	speed+=2;
	// if(speed==4)
	// {
	// 	alert("excellent"); //这个alert会影响游戏的进行，所以先暂时取消，如果想到了解决办法，可以改进
	// }
	if(speed==4)
	{
		var oDiv = document.getElementById('excellent');
		var oImg = oDiv.getElementsByTagName('img')[0];
		oImg.style.display = 'block';
		setTimeout(function(){
			oImg.style.display = 'none';
		},1000);
	}
}
function move()
{
	var con = document.getElementById('div-continer');
	var top = parseInt(window.getComputedStyle(con, false).top);
	if(top >= 0)
	{	
		if(con.lastElementChild.pass==false)
		{
			fail();
			con.style.top = '-100px';
			for (var i=0;i<con.lastElementChild.children.length;i++)
			{
				if(con.lastElementChild.children[i].className=='cell-black')
				{
					con.lastElementChild.children[i].style.background = 'yellow'; //指示给玩家他漏点的黑块
				}
			}
			//alert('Vous navez pas toucher la case noire tout en bas');
		}
		else
		{
			con.removeChild(con.lastElementChild);
			createRow();
		}
	}
	else
	{
		top = top + speed;
		con.style.top = top + 'px';
	}

}
function fail()
{
	alert('你的最终得分为 ' + parseInt(document.getElementById('score').innerHTML) );
	clearInterval(timer);
}