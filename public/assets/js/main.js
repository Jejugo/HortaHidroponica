$(document).ready(function(){
	$(".form").hide();
	
	$(".buttonLeft").click(function(){
		$(".form").toggle();
	});

	$(".buttonRight").click(function(){
		location.href="http://localhost:3000/register";
	});
});