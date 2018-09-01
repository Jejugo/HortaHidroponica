$(document).ready(function(){
	$(".form").hide();
	
	$(".buttonLeft").click(function(){
		$(".form").toggle();
	});

	$(".buttonRight").click(function(){
		location.href="http://localhost:3000/register";
	});

	$(".btnAdicionarHorta").click(function(){
		$(".btnAdicionaHorta").fadeOut("slow", function(){
			
		});
	});

	/*$("form").submit(function(){
		usuario = {
		email: $("input[type=email]").val(),
		senha: $("input[type=senha]").val()
		}

		$.ajax({
			type: 'POST', 
			url: '/home',
			data: usuario,
			success: function(data){
				console.log("o dado e " + data);
			}
		});
	});*/
});