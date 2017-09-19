$(document).ready(() => {
	$('.deleteUser').on('click', deleteUser);
})

function deleteUser() {
	const confirmation = confirm('Are you sure?');

	if (confirmation) {
		// make AJAX request
		$.ajax({
			type:'DELETE',
			url:'/users/delete/' + $(this).data('id')
		});
		window.location.replace('/'); // redirect on success
	} else {
		return false;
	}
}