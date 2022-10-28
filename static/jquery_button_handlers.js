// Custom jQuery file for app actions


// when user clicks on a pending requests table row
// the row data copied to a modal popup
$(function() {
  $('table').on('click',function (ele) {
    // store the parentNode of ele which is the row clicked
    var tr = ele.target.parentNode;

    // store all row information into variables
    var id = tr.cells[0].textContent;
    var first_name = tr.cells[1].textContent;
    var last_name = tr.cells[2].textContent
    var email = tr.cells[3].textContent;
    var original_url = tr.cells[5].textContent;
    var short_url = tr.cells[4].textContent;
    var created_at = tr.cells[7].textContent;

    // set html content of each modal field
    $('#modal_body_id').html(id);
    $('#modal_body_first_name').html('First Name: ' + first_name);
    $('#modal_body_last_name').html('Last Name: ' + last_name);
    $('#modal_body_email').html('Email: ' + email);
    $('#modal_body_original_url').html('Original URL: ' + original_url);
    $('#modal_body_short_url').html('Shortened URL: ' + short_url);
    $('#modal_body_created_at').html('Request Submitted on: ' + created_at);
  });
});

// approve button in modal popup
// on button click, redirect to route that changes db status
$(function() {
  $('#approve_request_button').on('click', function() {
      var id = $("#modal_body_id").text();
      var redirect_url = "http://127.0.0.1:5000/approve_request/" + id;
      // run the approve request route
      window.location.href = redirect_url;
  });
});

// deny button in modal popup
// on button click, redirect to route that changes db status
$(function() {
  $('#deny_request_button').on('click', function() {
      var id = $("#modal_body_id").text();
      var redirect_url = "http://127.0.0.1:5000/denied_request/" + id;
      // run the deny request route
      window.location.href = redirect_url
  });
});

// admin dashboard control view button action
$(document).ready(function() {
  $("#admin_controls_button").click(function() {
    $("#admin-controls-panel").slideToggle();

    // change button text for better user experience
    if ($('#admin_controls_button').text() == "Show Admin Controls") {
      $('#admin_controls_button').text("Hide Admin Controls");
    } else {
      $('#admin_controls_button').text("Show Admin Controls");
    }
  });
});

// admin dashboard control submit button action
// allows for admin user to modify database (update and delete)
$(function() {
  $('#admin-control-button').on('click', function(e) {
    // get value of id from input field
    var id = $("#admin-control-id").val();

    // get which selection was chosen (APPROVE, DENY, DELETE)
    var selection = $('#admin-select-menu').find(":selected").val();
    
    // must block default reloading of page to allow for custom redirection
    e.preventDefault();

    if (selection == "APPROVE") {
      var redirect_url = "http://127.0.0.1:5000/approve_request/" + id
      // run the approve request route
      window.location.href = redirect_url;
    } else if (selection == "DENY") {
      var redirect_url = "http://127.0.0.1:5000/denied_request/" + id
      // run the deny request route
      window.location.href = redirect_url;
    } else {
      var redirect_url = "http://127.0.0.1:5000/delete_request/" + id
      // run the delete request route
      window.location.href = redirect_url;
    }
  });
});

