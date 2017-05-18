function CreateLimitDrag(id) {
	CreateDrag.call(this,id);
}

for (var i in CreateDrag.prototype) 
{
	CreateLimitDrag.prototype[i] = CreateDrag.prototype[i];
}

CreateLimitDrag.prototype.fnMove = function(ev)
 {
	var oEvent = ev || event;
	var l = oEvent.clientX - this.disX;
	var t = oEvent.clientY - this.disY;

	if (l < 0) {
		l = 0;
	} else if (l > document.documentElement.clientWidth - this.oDiv.offsetWidth) {
		l = document.documentElement.clientWidth - this.oDiv.offsetWidth;
	}
	if (t < 0) {
		t = 0;
	} else if (t > document.documentElement.clientHeight - this.oDiv.offsetHeight) {
		t = document.documentElement.clientHeight - this.oDiv.offsetHeight;
	}

	this.oDiv.style.left = l + 'px';
	this.oDiv.style.top = t + 'px';
};