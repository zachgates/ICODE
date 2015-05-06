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

function bincolor (n) {
	clrs = {"0": "C45656", "1": "C49756", "2": "B0C456",
            "3": "6EC456", "4": "56C481", "5": "56C4C3",
            "6": "5684C4", "7": "6B56C4", "8": "AD56C4",
            "9": "C4569A", "+": "CCCCCC"};
	return clrs[n];
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