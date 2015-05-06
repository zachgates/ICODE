String.prototype.mult = function (n) {
    return new Array(n+1).join(this);
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
}

function chunks (l, n) {
	var rng = range(0, l.length, n);
	var result = [];
	for (var i = 0; i < rng.length; i++) {
		result.push(l.slice(rng[i], rng[i] + n));
	}
	return result;
}

function toHex(r, g, b, a) {
    hex = (256 + r).toString(16).substr(1) + ((1 << 24) + (g << 16) | (b << 8) | a).toString(16).substr(1);
	return hex.substr(0, hex.length - 2).toUpperCase();
}