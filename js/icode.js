String.prototype.mult = function (n) {
    return new Array(n+1).join(this);
}
  
Array.prototype.remove = function (n) {
	for (var i = this.length; i--;) {
		if (this[i] == n) {
			this.splice(i, 1);
		}
	}
}

Array.prototype.insert = function (i, n) {
	this.splice(i, 0, n);
}

ord = function (c) {
	return c.charCodeAt(0);
}

chr = function (o) {
	return String.fromCharCode(o);
}

range = function (start, stop, step) {
	var result = [];
	if (typeof stop == "undefined"){
		stop = start;
		start = 0;
	}
	if (typeof step == "undefined"){
		step = 1;
	}
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return [];
	}
	for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}
	return result;
}

randrange = function (start, stop) {
	if (typeof stop == "undefined"){
		stop = start;
		start = 0;
	}
    return Math.floor(Math.random() * (start - stop + 1)) + start;
}

toChar = function (i) {
	if (parseInt(i)) {
		return "-ABCDEF"[i.length];
	}
	return i.length.toString();
}
    
toBin = function (i) {
	if (!isNaN(i)) {
		return "0".mult(parseInt(i));
	}
	return "1".mult("-ABCDEF".indexOf(i));
}

toHex = function (r, g, b, a) {
	if (r == 0 & g == 0 & b == 0 & a == 0) {
		return "transparent";
	}
    hex = (256 + r).toString(16).substr(1) + ((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
	return hex.substr(0, hex.length - 2).toUpperCase();
}

toOrd = function (i) {
	return parseInt(i, 2).toString(10);
}
    
iicode = function (uon) {
	var uin = '';
	for (var c = 0; c < uon.length; c++) { 
		f = (ord(uon[c]) >>> 0).toString(2);
		uin += '0'.mult(8 - f.length);
		uin += f;
	}
	var stack = uin.split('').reverse();
	var empty = new Array();
	var char = stack.pop();
	var count = 1;
	while (stack.length > 0) {
		i = stack.pop();
		if ((char == i) && (count < 6)) {
			count += 1;
		}
		else {
			empty.push(char.mult(count));
			char = i;
			count = 1;
		}
	}
	empty.push(char.mult(count));
	ic = empty.map(toChar).join('');
	ic += '0'.mult(6 - (ic.length % 6));
	return ic;
}

cutimage = function (image) {
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	canvas.width = 1;
	canvas.height = 1;
	context.drawImage(image, 0, 0, 1, 1, 0, 0, 1, 1);
	data = context.getImageData(0, 0, 1, 1).data;
	hex = toHex.apply(this, data);
	var cs = parseInt(chunks(hex, 2).map(function (i) { return i[0] }).join(''));
	var cells = [];
	for (var i = 0; i < image.width / cs; i++) {
		for (var j = 0; j < image.height / cs; j++) {
			canvas = document.createElement("canvas");
			context = canvas.getContext("2d");
			canvas.width = cs;
			canvas.height = cs;
			context.drawImage(image, j * cs, i * cs, cs, cs, 0, 0, cs, cs);
            data = context.getImageData(Math.floor(cs / 2), Math.floor(cs / 2), 1, 1).data;
			cells.push(toHex.apply(this, data));
        }
    }
	return cells;
}

reviicode = function (img) {
	image = new Image();
	image.src = img;
	var cells = cutimage(image).slice(1);
	cells.remove("000000");
	ic = cells.join('').split('');
	ic = ic.map(toBin).join('');
	ic = chunks(ic, 8);
	ic = ic.map(toOrd).map(chr).join('');
	return ic;
}