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
    
  

    // if statement to set 3 threat levels
    if (original_url.includes("hawaii.gov")) {
      $("#modal_body_threat_level").attr("src", "./static/faces_1.jpg");
    } else if (original_url.includes("youtube")) {
      $("#modal_body_threat_level").attr("src", "./static/faces_2.jpg");
    } else if (original_url.includes("russia")) {
      $("#modal_body_threat_level").attr("src", "./static/faces_3.jpg");
    } else {
      $("#modal_body_threat_level").attr("src", "./static/faces_2.jpg");
    };

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
      var username = $(this).data('username');
      var password = $(this).data('password');

      var name = $('#modal_body_first_name')
      var email = $('#modal_body_email')
      var short_url = $('#modal_body_short_url')
      var long_url = $('#modal_body_original_url')


      var url_add_id = "http://www.bradashburn.com/palekana/admin?request_id=" + id;
      var url_add_request_type = url_add_id + "&request_type=approve_request&username=" + username + "&password=" + password;
      var add_approval = url_add_request_type +"&name=" + name + "&email=" + email + "&short_url=" + short_url + "&long_url=" + long_url

      // run the approve request route
      window.location.href = add_approval;
  });
});

// deny button in modal popup
// on button click, redirect to route that changes db status
$(function() {
  $('#deny_request_button').on('click', function() {
      var id = $("#modal_body_id").text();
      var username = $(this).data('username');
      var password = $(this).data('password');

      var url_add_id = "http://www.bradashburn.com/palekana/admin?request_id=" + id;
      var url_add_request_type = url_add_id + "&request_type=deny_request&username=" + username + "&password=" + password;

      // run the approve request route
      window.location.href = url_add_request_type;
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
    var username = $(this).data('username');
    var password = $(this).data('password');

    // get which selection was chosen (APPROVE, DENY, DELETE)
    var selection = $('#admin-select-menu').find(":selected").val();
    
    // must block default reloading of page to allow for custom redirection
    e.preventDefault();

    if (selection == "APPROVE") {
      var url_add_id = "http://www.bradashburn.com/palekana/admin?request_id=" + id;
      var url_add_request_type = url_add_id + "&request_type=approve_request&username=" + username + "&password=" + password;
      window.location.href = url_add_request_type;
    } else if (selection == "DENY") {
      var url_add_id = "http://www.bradashburn.com/palekana/admin?request_id=" + id;
      var url_add_request_type = url_add_id + "&request_type=deny_request&username=" + username + "&password=" + password;
      window.location.href = url_add_request_type;
    } else {
      var url_add_id = "http://www.bradashburn.com/palekana/admin?request_id=" + id;
      var url_add_request_type = url_add_id + "&request_type=delete_request&username=" + username + "&password=" + password;
      window.location.href = url_add_request_type;
    }
  });
});

