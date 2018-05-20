$(function() {
  $('.devour').on('click', function(event) {
    const id = $(this).data('id');
    const newDevour = $(this).data('newStatus');

    const newEatenState = {
      devoured: newDevour,
    };

    // Send the PUT request.
    $.ajax(`/api/burgers/${id}`, {
      type: 'PUT',
      data: newEatenState,
    }).then(function() {
      console.log(`changed devoured to ${newDevour}`);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $('.add-burger').on('submit', function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    const newBurger = {
      burger_name: $('#burger_name').val().trim(),
      devoured: 0,
    };

    // Send the POST request.
    $.ajax('/api/burgers', {
      type: 'POST',
      data: newBurger,
    }).then(function() {
      console.log('created new burger');
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
