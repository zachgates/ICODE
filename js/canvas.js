$(document).ready(function () {

	canvas2img = function (canvas) {
		var img = $("img#icode")[0];
		img.src = canvas.toDataURL("image/png");
		return img.src;
	}
	
	chunks = function (l, n) {
		var rng = range(0, l.length, n);
		var result = [];
		for (var i = 0; i < rng.length; i++) {
			result.push(l.slice(rng[i], rng[i] + n));
		}
		return result;
	}

	newICODE = function (data) {
		var icode = iicode(data || 'ICODE');
		var ccode = new Array();
		for (var i = 0; i < range(0, icode.length, 6).length; i++) {
			n = range(0, icode.length, 6)[i];
			ccode.push(icode.slice(n, n+6))
		}
		var ocode = Math.ceil(Math.sqrt(ccode.length + 1));
		var dcode = ccode.slice(0);
		for (var i = 0; i < range(Math.pow(ocode, 2) - (ccode.length + 1)).length; i++) {
			dcode.insert(randrange(ccode.length), "000000");
		}
		var cs = 0;
		for (var i = 1; i < 100; i++) {
			if (ocode * i > 300) {
				break;
			}
			cs = i;
		}
		var keyColor = "0".mult(3 - cs.toString().length) + cs.toString();
		dcode.insert(0, keyColor);
		var ecode = chunks(dcode, ocode);
		
		var canvas = $("canvas#icode")[0];
		var context = canvas.getContext("2d");
		canvas.setAttribute("width", ocode * cs + 'px');
		canvas.setAttribute("height", ocode * cs + 'px');
		$("img#icode").css({"zoom": 300 / (ocode * cs)});

		for (var i = 0; i < ecode.length; i++) {
			for (var j = 0; j < ecode[i].length; j++) {
				context.beginPath();
				context.fillStyle = "#" + ecode[i][j];
				context.fillRect(j * cs, i * cs, cs, cs);
			}
		}

		data = canvas2img(canvas);
		$("a#dload")[0].href = data;
	}
	
	$("textarea#textual-input").on('input', function () {
		newICODE($(this).val());
	});
	
	$("input#upload").change(function () {
		var img = this.files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			var dataURL = reader.result;
			$("textarea#textual-base").text(dataURL);
		}
		reader.readAsDataURL(img);
		setTimeout(function () {
			var base = $("textarea#textual-base").val();
			var data = reviicode(base);
			var exp = RegExp(/https?:\/\/.*/);
			if (data.match(exp)) {
				window.open(data);
			}
			$("textarea#textual-id").text(data);
		}, 500);
	});
	
	newICODE();
	
	$("#banner").slideUp(0);
	$("#home-main-cont").slideUp(0);
	$("#demo-main-cont").slideUp(0);
	
	setTimeout(function() {
        $("#banner").slideDown(750);
        $("#home-main-cont").slideDown(750);
    }, 250)
    
	toHome = function () {
        $("#demo-main-cont").slideUp(750);
        setTimeout(function() {
            $("#banner").slideDown(750);
            $("#home-main-cont").slideDown(750);
        }, 750)
    }
    
    toDemo = function () {
        $("#home-main-cont").slideUp(750);
        $("#banner").slideUp(750);
        setTimeout(function() {
            $("#demo-main-cont").slideDown(750);
        }, 750)
    }
	
});