const verify = () => {
	$('#verify').html('');

	var password = $('#password').val();
	var password_verify = $('#password-verify').val();

	var message;
	if(password !== password_verify) {
		message = 'Passwords do not match';
		$('.btn').addClass('d-none');
	} else {
		message = 'OK';
		$('.btn').removeClass('d-none');
	}

	var $h5 = $('<h5>', { 'class': 'mint' });
	$h5.html(message);

	$('#verify').append($h5);
}

document.querySelector('#password').addEventListener('change', verify);
document.querySelector('#password-verify').addEventListener('change', verify);