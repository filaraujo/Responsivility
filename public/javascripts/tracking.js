(function(){
	var url = '//localhost:3000/track',

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
