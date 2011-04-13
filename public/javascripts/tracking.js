(function(){
	var url = '//localhost:8080/track',

	success = function(){
		console.log('success');
	},

	fail = function(){
		console.log('fail');
	};


	$.ajax({
		url : url,
		type : 'GET',
		success : success,
		error : fail
	});

}($));
