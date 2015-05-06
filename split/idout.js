function frombincolor (c) {
	clrs = {"C45656": "0", "C49756": "1", "B0C456": "2",
            "6EC456": "3", "56C481": "4", "56C4C3": "5",
            "5684C4": "6", "6B56C4": "7", "AD56C4": "8",
            "C4569A": "9", "CCCCCC": "+", "000000": ""};
	return clrs[c];
}

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