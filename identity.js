// Write Python's builtins...

String.prototype.mult = function (n) {
    return new Array(n+1).join(this);
}

String.prototype.space = function (n, c) {
    for (var s = "", i = 0; i < this.length;){
        if (n && Math.random() < 0.5) {
            s += c;
            n--;
        } else {
            s += this[i++];
        }
    }
    while (n--) {
        s += c;
    }
    return s;
}

function ord(character) {
	return character.charCodeAt(0);
}

function chr(ordinal) {
	return String.fromCharCode(ordinal);
}

function range(start, stop, step){
	var result = [];
	if (typeof stop == "undefined"){
		stop = start;
		start = 0;
	};
	if (typeof step == "undefined"){
		step = 1;
	};
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return [];
	};
	for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	};
	return result;
};

// My functions for discerning identities...

function chunks (l, n) {
	var rng = range(0, l.length, n);
	var result = [];
	for (var i = 0; i < rng.length; i++) {
		result.push(l.slice(rng[i], rng[i] + n));
	}
	return result;
}

function bincolor (n) {
	clrs = {"0": "C45656", "1": "C49756", "2": "B0C456",
            "3": "6EC456", "4": "56C481", "5": "56C4C3",
            "6": "5684C4", "7": "6B56C4", "8": "AD56C4",
            "9": "C4569A", "+": "CCCCCC"};
	return clrs[n];
}

function frombincolor (c) {
	clrs = {"C45656": "0", "C49756": "1", "B0C456": "2",
            "6EC456": "3", "56C481": "4", "56C4C3": "5",
            "5684C4": "6", "6B56C4": "7", "AD56C4": "8",
            "C4569A": "9", "CCCCCC": "+", "000000": ""};
	return clrs[c];
}

function identity (string) {
	var ordinals = [];
	var stringor = "";
	for (var i = 0; i < string.length; i++) {
		ordinals.push(ord(string[i]) * 10 / 5);
	}
	for (var i = 0; i < ordinals.length; i++) {
		var ordstr = ordinals[i].toString();
		if (ordstr.length < 5) {
			a = 5 - ordstr.length;
		}
		else {
			a = ordstr.length % 5;
		}
		stringor += ordstr.space(a, "+");
	}
	var perfects = Math.floor(Math.sqrt(stringor.length) / 1) + 1
	while (perfects % 3 != 0) {
		perfects += 1
	}
	var empty = Math.pow(perfects, 2) - stringor.length;
	var ident = "";
	var i = 0;
	while (ident.length < Math.pow(perfects, 2)) {
		if ((i % 3) && empty) {
			a = Math.random();
			b = Math.random();
			if (a > b) {
				if (empty / Math.pow(perfects, 2) > 0.4) {
					r = Math.floor((Math.random() * 10) / 1);
				}
				else {
					r = Math.floor((Math.random() * 1) / 1);
				}
				if (r == 0) {
					r = 1;
				}
				if (r > empty) {
					r = empty + 1 - 1;
				}
				empty -= r;
				while (r > 0) {
					ident += "-";
					r -= 1;
				}
			}
		}
		if (i < stringor.length) {
			ident += stringor[i];
			i += 1;
		}
		else {
			ident += "-";
		}
	}
	return [ident, perfects]
}

function cells (string) {
	id = identity(string);
	var ident = id[0];
	var ps = id[1];
	var co = [];
	for (var i = 0; i < ident.length; i++) {
		cell = ident[i];
		color = bincolor(cell);
		if (color) {
			co.push(color);
		}
		else {
			co.push("000000");
		}
	}
	if (co.length > Math.pow(ps, 2)) {
		error = co.splice(Math.pow(ps, 2));
		for (var i = 0; i < error.length; i++) {
			errCell = error[i];
			if (errCell != "000000") {
				throw "MAJOR ERROR";
			}
		}
	}
	var res =  chunks(co, ps);
	for (var i = 0; i < res.length; i++) {
		res[i].unshift("CCCCCC");
		res[i].push("CCCCCC");
	}
	res.unshift(new Array(ps+3).join('0').split('').map(function (i) {
		return "000000";
	}));
	res.push(new Array(ps+3).join('0').split('').map(function (i) {
		return "000000";
	}));
	for (var i = 0; i < res[0].length; i++) {
		if (i % 2 != 0) {
			res[0][i] = "CCCCCC";
		}
		else {
			res[res.length-1][i] = "CCCCCC";
		}
	}
	return res;
}

function toHex(r, g, b, a) {
    hex = (256 + r).toString(16).substr(1) + ((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
	return hex.substr(0, hex.length - 2).toUpperCase();
}

// And getting text from the image.

function cutimage (image) {
	var cells = [];
	var ps = 0;
	for (var i = 0; i < image.width; i++) {
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		canvas.width = 1;
		canvas.height = 1;
		context.drawImage(image, i, 0, 1, 1, 0, 0, 1, 1);
		data = context.getImageData(0, 0, 1, 1).data;
		hex = toHex.apply(this, data);
		if (hex != '000000') {
			break;
		}
		else {
			ps += 1;
		}
	}
	for (var i = 0; i < image.width / ps; i++) {
		for (var j = 0; j < image.height / ps; j++) {
			canvas = document.createElement("canvas");
			context = canvas.getContext("2d");
			canvas.width = ps;
			canvas.height = ps;
			context.drawImage(image, j * ps, i * ps, ps, ps, 0, 0, ps, ps);
            data = context.getImageData(Math.floor(ps / 2), Math.floor(ps / 2), 1, 1).data;
			cells.push(toHex.apply(this, data));
        }
    }
	return [cells, ps];
}

function fromidentity (img) {
	var image = new Image();
	image.src = img;
	var cut = cutimage(image);
	var cells = cut[0];
	var ps = image.width / cut[1];
	var size = 0;
	for (var i = 0; i < ps; i++) {
		chunk = chunks(cells, ps);
		if (chunk[0][i] == "000000") {
			size += 1;
		}
		if (chunk[chunk.length-1][i] == "000000") {
			size += 1;
		}
	}
	var rows = chunks(cells, size);
	var data = rows.slice(1, rows.length-1).map(function (r) {
		return r.slice(1, r.length-1);
	});
	data = [].concat.apply([], data);
	data = data.map(frombincolor).filter(function (i) {
		return i != "";
	});
	if (!data.length) {
		return "";
	}
	data = chunks(data, 5).map(function (o) {
		j = o.join('').replace(/\+/g, '');
		return chr(parseInt(j) / 2);
	});
	return data.join('');
}