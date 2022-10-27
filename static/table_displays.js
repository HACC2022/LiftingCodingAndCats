// Custom JS file to respond to table display


// hides all other tables and shows the Pending Requests table
function toggleTableViewPending() {
  // hide all open table displays
	var approved_requests_table = document.getElementById('approved_requests_table');
	approved_requests_table.style.display = "none";

	var approved_requests_table = document.getElementById('denied_requests_table');
	approved_requests_table.style.display = "none";

  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none";

	// get the pending_requests table element
  var pending_requests_table = document.getElementById('pending_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(pending_requests_table).getPropertyValue('display');

  // toggle the CSS display setting
  if (displaySetting == "block") {
  	pending_requests_table.style.display = "none";
  } else {
  	pending_requests_table.style.display = "block";
  }
};

// hides all other tables and shows the Approved Requests table
function toggleTableViewApproved() {
  // hide all open table displays
	var pending_requests_table = document.getElementById('pending_requests_table');
	pending_requests_table.style.display = "none";

	var approved_requests_table = document.getElementById('denied_requests_table');
	denied_requests_table.style.display = "none";

  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none";

	// get the approved_requests table element
  var approved_requests_table = document.getElementById('approved_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(approved_requests_table).getPropertyValue('display');

  // toggle the CSS display setting
  if (displaySetting == "block") {
  	approved_requests_table.style.display = "none";
  } else {
  	approved_requests_table.style.display = "block";
  }
};

// hides all other tables and shows the Denied Requests table
function toggleTableViewDenied() {
  // hide all open table displays
	var pending_requests_table = document.getElementById('pending_requests_table');
	pending_requests_table.style.display = "none";

	var approved_requests_table = document.getElementById('approved_requests_table');
	approved_requests_table.style.display = "none";

  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');
  most_clicked_urls_table.style.display = "none";

	// get the denied_requests table element
  var denied_requests_table = document.getElementById('denied_requests_table');

 	// get the current value of the table display property
  var displaySetting = window.getComputedStyle(denied_requests_table).getPropertyValue('display');

  // toggle the CSS display setting
  if (displaySetting == "block") {
  	denied_requests_table.style.display = "none";
  } else {
  	denied_requests_table.style.display = "block";
  }
};

// hides all other tables and shows the Most Clicked table
function toggleTableViewMostClicked() {
  // hide all open table displays
  var pending_requests_table = document.getElementById('pending_requests_table');
  pending_requests_table.style.display = "none";

  var approved_requests_table = document.getElementById('approved_requests_table');
  approved_requests_table.style.display = "none";

  var approved_requests_table = document.getElementById('denied_requests_table');
  denied_requests_table.style.display = "none";

  // get the most clicked urls table element
  var most_clicked_urls_table = document.getElementById('most_clicked_urls_table');

  // get the current value of the table display property
  var displaySetting = window.getComputedStyle(most_clicked_urls_table).getPropertyValue('display');

  // toggle the CSS display setting
  if (displaySetting == "block") {
    most_clicked_urls_table.style.display = "none";
  } else {
    most_clicked_urls_table.style.display = "block";
  }
};



