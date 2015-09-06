$(document).ready(function () {

	function canvas2img (canvas) {
		var img = $("img#textual-id")[0];
		img.src = canvas.toDataURL("image/png");
		return img.src;
	}

	function newIdentity (data) {
		var data = data || '';
		var canvas = $("canvas#textual-id")[0];
		var context = canvas.getContext("2d");
		var ps = 0;
		for (var i = 1; i < 100; i++) {
			j = Math.ceil(Math.sqrt(data.length * 3)) + 2;
			if (j * i > 300) {
				break;
			}
			ps = i;
		}
		data = cells(data);
		canvas.setAttribute("width", data.length * ps + 'px');
		canvas.setAttribute("height", data.length * ps + 'px');
		$("img#textual-id").css({"zoom": 300 / (data.length * ps)});
		for (var i = 0; i < data.length; i++) {
			for (var j = 0; j < data[i].length; j++) {
				context.beginPath();
				context.fillStyle = "rgba(" + data[i][j] + ")";
				context.fillRect(j * ps, i * ps, ps, ps);
			}
		}
		data = canvas2img(canvas);
		$("a#dload")[0].href = data;
	}
	
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
	
	$("textarea#textual-input").on('input', function () {
		newIdentity($(this).val());
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
			var data = fromidentity(base);
			var exp = RegExp(/https?:\/\/.*/);
			if (data.match(exp)) {
				window.open(data);
			}
			$("textarea#textual-id").text(data);
		}, 500);
	});
	
	newIdentity($("input#textual-input").val());
});
