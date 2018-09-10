$(document).ready(function(){
	//Getting the information about the gardens on rofile's page.
	$.ajax({
		type: 'GET',
		processData: false,
		url: 'http://localhost:3000/arduinoapi',
		success: function(result){
			resAPI = result;
			console.log(resAPI);
		},
		complete:function(){
			$.ajax({
				type: 'POST',
				url: '/formHorta',
				data: resAPI,
				success: function(data){
					console.log(data);
				}
			})
		}
	});

	/*$(".btnAdicionarHorta").click(function(){
		window.open("http://localhost:3000/formHorta");
		return false;
	});*/

	//Home Page
	$(".form").hide();
	
	$(".buttonLeft").click(function(){
		$(".form").toggle();
	});

	$(".buttonRight").click(function(){
		location.href="http://localhost:3000/register";
	});
});