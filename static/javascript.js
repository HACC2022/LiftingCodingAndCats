function toggleTableViewPending() {
	// change display of approved table element to none
	var approved_requests_table = document.getElementById('approved_requests_table');
	approved_requests_table.style.display = "none"

	// change display of denied table element to none
	var approved_requests_table = document.getElementById('denied_requests_table');
	approved_requests_table.style.display = "none"

  // change display of most clicked table element to none
  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none"

  // change display of most active users table element to none
  // var approved_requests_table = document.getElementById('denied_requests_table');
  // approved_requests_table.style.display = "none"

	// get the pending_requests table element
  var pending_requests_table = document.getElementById('pending_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(pending_requests_table).getPropertyValue('display');

  if (displaySetting == "block") {
  	pending_requests_table.style.display = "none"
  } else {
  	pending_requests_table.style.display = "block"
  }
}

function toggleTableViewApproved() {
	// change display of pending table element to none
	var pending_requests_table = document.getElementById('pending_requests_table');
	pending_requests_table.style.display = "none"

	// change display of approved table element to none
	var approved_requests_table = document.getElementById('denied_requests_table');
	denied_requests_table.style.display = "none"

  // change display of most clicked table element to none
  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none"


	// get the pending_requests table element
  var approved_requests_table = document.getElementById('approved_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(approved_requests_table).getPropertyValue('display');

  if (displaySetting == "block") {
  	approved_requests_table.style.display = "none"
  } else {
  	approved_requests_table.style.display = "block"
  }
}

function toggleTableViewDenied() {
	// change display of approved table element to none
	var pending_requests_table = document.getElementById('pending_requests_table');
	pending_requests_table.style.display = "none"

	// change display of pending table element to none
	var approved_requests_table = document.getElementById('approved_requests_table');
	approved_requests_table.style.display = "none"

  // change display of most clicked table element to none
  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none"

	// get the pending_requests table element
  var denied_requests_table = document.getElementById('denied_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(denied_requests_table).getPropertyValue('display');

  if (displaySetting == "block") {
  	denied_requests_table.style.display = "none"
  } else {
  	denied_requests_table.style.display = "block"
  }
}




function toggleTableViewMostClicked() {
  // change display of pending table element to none
  var pending_requests_table = document.getElementById('pending_requests_table');
  pending_requests_table.style.display = "none"

  // change display of approved table element to none
  var approved_requests_table = document.getElementById('approved_requests_table');
  approved_requests_table.style.display = "none"

  // change display of approved table element to none
  var approved_requests_table = document.getElementById('denied_requests_table');
  denied_requests_table.style.display = "none"

  // get the pending_requests table element
  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');

  // get the current value of the table display property
  var displaySetting = window.getComputedStyle(most_clicked_urls_table).getPropertyValue('display');

  if (displaySetting == "block") {
    most_clicked_urls_table.style.display = "none"
  } else {
    most_clicked_urls_table.style.display = "block"
  }
}















$(function() {
      //Take the data from the TR during the event button
      $('table').on('click',function (ele) {
          //the <tr> variable is use to set the parentNode from "ele
          var tr = ele.target.parentNode;

          //I get the value from the cells (td) using the parentNode (var tr)
          var id = tr.cells[0].textContent
          var first_name = tr.cells[1].textContent
          var last_name = tr.cells[2].textContent
          var email = tr.cells[3].textContent

          var original_url = tr.cells[5].textContent
          var short_url = tr.cells[4].textContent
          var created_at = tr.cells[7].textContent

          $('#modal_body_id').html(id);
          $('#modal_body_first_name').html('First Name: ' + first_name);
          $('#modal_body_last_name').html('Last Name: ' + last_name);
          $('#modal_body_email').html('Email: ' + email);

          $('#modal_body_original_url').html('Original URL: ' + original_url);
          $('#modal_body_short_url').html('Shortened URL: ' + short_url);
          $('#modal_body_created_at').html('Request Submitted on: ' + created_at);
          
      });
  });

$(function() {
      //Take the data from the TR during the event button
      $('#approve_request_button').on('click', function() {
          //the <tr> variable is use to set the parentNode from "ele
          var id = $("#modal_body_id").text()
          var redirect_url = "http://127.0.0.1:5000/approve_request/" + id
          
          window.location.href=redirect_url

      });
  });


$(function() {
      //Take the data from the TR during the event button
      $('#deny_request_button').on('click', function() {
          //the <tr> variable is use to set the parentNode from "ele
          var id = $("#modal_body_id").text()
          var redirect_url = "http://127.0.0.1:5000/denied_request/" + id
          
          window.location.href=redirect_url

      });
  });



