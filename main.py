import sqlite3
from hashids import Hashids
from flask import Flask, render_template, url_for, request, flash, redirect
from dotenv import load_dotenv
from datetime import datetime
from dateutil import tz
import os


# establishes connection to database
def get_db_connection():
	db_connection = sqlite3.connect('database.db')

	# allows for rows to be accessed like dictionaries
	db_connection.row_factory = sqlite3.Row

	return db_connection


# creates the Flask app instance
app = Flask(__name__)


# stores a secret key for use with the hashids encoder
# key is stored in .env file which is not uploaded to github
app.config['SECRET_KEY'] = os.getenv('secret_key')


# creates the hashids instance with custom parameters
# salt is like a unique seed
hashids = Hashids(min_length = 5, salt = app.config['SECRET_KEY'])


# creates Flask view function using route decorator for index page
# must pass methods parameter since a user needs to submit a form
@app.route('/', methods=('GET', 'POST'))
def index():
	# provides access to secret key
	load_dotenv()

	# connect to the database
	db_connection = get_db_connection()

	# if user requests a shortened url
	if request.method == 'POST':

		# store the four form fields as python string variables
		url = request.form['url']
		first_name = request.form['first_name']
		last_name = request.form['last_name']
		email = request.form['email']

		# error handling to catch blank form field submissions
		if not url:
			# show a JS message to the user
			flash('Please enter URL, it is required.')
			# reload the index page for user to try again
			return redirect(url_for('index'))
		if not first_name:
			flash('Please enter your first name, it is required.')
			return redirect(url_for('index'))
		if not last_name:
			flash('Please enter your last name, it is required.')
			return redirect(url_for('index'))
		if not email:
			flash('Please enter hawaii.gov email, it is required.')
			return redirect(url_for('index'))

		# store the four python string variables into the database
		url_data = db_connection.execute('INSERT INTO urls (original_url, first_name, last_name, email) VALUES (?,?,?,?)', (url,first_name,last_name,email,))
		db_connection.commit()
		db_connection.close()

		# obtain the unique row id of the database entry
		url_id = url_data.lastrowid

		# create a hashed and shortened url string
		hashid = hashids.encode(url_id)

		# combine the domain host url with the hashed string
		short_url = request.host_url + hashid

		# display homepage to assure user that url request has been submitted
		message1 = "URL Request Submitted Successfully!<br>"
		message2 = "You will receive an email from our ETS team upon our security review at " + email + "<br>"
		message3 = "Feel free to contact us via email at ets@hawaii.gov or by phone at 808-586-6000 with any questions.<br><br>"
		message4 = "Mahalo " + first_name + " for using Palekana!"
		confirmation_message = message1 + message2 + message3 + message4
		flash(confirmation_message)

		return redirect(url_for('index'))
	# display homepage with form to request a shortened url
	elif request.method == 'GET':
		return render_template('index.html')


# creates route for shortened url to redirect to original url
# increments the clicks for that entry in the database
# adds click data into database table to statistics display
# shortened and hashed portion of url is passed as a parameter
@app.route('/<id>')
def url_redirect(id):
	# connect to the database
	db_connection = get_db_connection()

	# decode shortened and hashed string back into the url id in database
	original_id = hashids.decode(id)

	# if decoding was successful
	if original_id:
		# decode method above returns a tuple with first item as url_id
		original_id = original_id[0]

		# returns a dictionary containing the original_url and clicks from database
		url_data = db_connection.execute('SELECT original_url, clicks FROM urls'
										 ' WHERE id = (?)', (original_id,)
										).fetchone()

		# obtain original_url from dictionary returned from database
		original_url = url_data['original_url']

		# obtain number of clicks from dictionary returned from database
		clicks = url_data['clicks']

		# increment the number of clicks in the database and close connection
		db_connection.execute('UPDATE urls SET clicks = ? WHERE id = ?',
							   (clicks+1, original_id))

		# add click data into table to allow for tracking of when clicks were made
		db_connection.execute('INSERT INTO clicks (shortened_url, original_url) VALUES (?,?)', (hashids.encode(original_id), original_url,))

		db_connection.commit()
		db_connection.close()

		# redirects user to full url
		# user must enter the http:// or you'll get a tuple out of bounds error
		return redirect(original_url)
	# if decoding was not successful
	else:
		flash('invalid url')
		return redirect(url_for('index'))


# creates a route for admin login
# if login successful, displays an admin dashboard
# passes a list of dictionaries containing database row data into dashboard.html
@app.route('/admin', methods=['GET', 'POST'])
def admin():
	# create an admin login form
	if request.method == 'POST':

		# store the url submitted in url variable
		admin_username = request.form['username']
		admin_password = request.form['password']

		# handle event where user submits a blank username field
		if not admin_username:
			flash('No username entered. Access Denied.')
			return redirect(url_for('admin'))

		# handle event where user submits a blank password form field
		if not admin_password:
			flash('No password entered. Access Denied.')
			return redirect(url_for('admin'))

		# !!! move admin username and password into .env file
		if (admin_username == os.getenv('admin_username') and admin_password == os.getenv('admin_password')):

			# establish connection to database
			db_connection = get_db_connection()

			# convert database into a list of tuples
			# each tuple contains all row data
			db_rows_list = db_connection.execute('SELECT id, created_at, original_url, clicks, first_name, last_name, email, status FROM urls').fetchall()
			db_rows_clicks = db_connection.execute('SELECT id, created_at, shortened_url, original_url FROM clicks').fetchall()
			db_connection.close() # no need to commit since no changes made

			# need to convert the tuples into dictionaries so they can be mutated
			# create lists to store data from each table into dictionaries
			row_dictionaries = []
			row_click_dictionaries = []

			# convert each row tuple into dictionary
			# add the shortened/hashed url into each row_dictionary
			for row_tuple in db_rows_list:
				row_dict = dict(row_tuple)
				row_dict['short_url'] = request.host_url + hashids.encode(row_tuple['id'])
				row_dictionaries.append(row_dict)

				# convert from UTC into HST time zone
				from_zone = tz.tzutc()
				to_zone = tz.tzlocal()
				utc = datetime.utcnow()
				utc = datetime.strptime(row_dict['created_at'], '%Y-%m-%d %H:%M:%S')
				utc = utc.replace(tzinfo=from_zone)
				hst = utc.astimezone(to_zone)

				# format datetime to be user friendly
				formatted_date = datetime.strftime(hst, "%a\n%B %d, %Y \n%I:%M %p")
				row_dict['created_at'] = formatted_date

			# convert each row tuple into dictionary
			# used to calculate the clicks today and clicks per week
			for row_clicks_tuple in db_rows_clicks:
				row_click_dict = dict(row_clicks_tuple)
				row_click_dictionaries.append(row_click_dict)

				# convert from UTC into HST time zone
				from_zone = tz.tzutc()
				to_zone = tz.tzlocal()
				utc = datetime.utcnow()
				utc = datetime.strptime(row_click_dict['created_at'], '%Y-%m-%d %H:%M:%S')
				utc = utc.replace(tzinfo=from_zone)
				hst = utc.astimezone(to_zone)

				# format datetime to be user friendly
				formatted_date = datetime.strftime(hst, "%a\n%B %d, %Y \n%I:%M %p")
				row_click_dict['created_at'] = formatted_date

			# dashboard statistics variable initialization
			total_clicks = 0
			total_entries = 0
			urls_created_today = 0
			urls_created_last_7_days = 0
			now = datetime.now()

			# update dashboard statistics
			for db_row_dict in row_dictionaries:
				total_clicks += db_row_dict['clicks']
				total_entries += 1

				d = datetime.strptime(str(db_row_dict['created_at']), "%a\n%B %d, %Y \n%I:%M %p")
				if (now - d).days < 1:
					urls_created_today += 1
				if (now - d).days < 7:
					urls_created_last_7_days += 1

			# use row_click_dictionaries to populate click statistics
			clicks_today = 0
			clicks_last_7_days = 0
			for url_clicked in row_click_dictionaries:
				d = datetime.strptime(str(url_clicked['created_at']), "%a\n%B %d, %Y \n%I:%M %p")
				if (now - d).days < 1:
					clicks_today += 1
				if (now - d).days < 7:
					clicks_last_7_days += 1

			# total days database has been live
			start = datetime.strptime("Wed October 26, 2022 12:00 AM", "%a\n%B %d, %Y \n%I:%M %p")
			total_days = (now-start).days

			# handle DivisionByZero error
			if total_days == 0:
				daily_click_average = total_clicks
				daily_url_average = total_entries
			else:
				daily_click_average = round(total_clicks / total_days, 1)
				daily_url_average = round(total_entries / total_days, 1)
			
			sorted_row_dictionaries = sorted(row_dictionaries, key=lambda x: x['clicks'], reverse=True)

			return render_template('dashboard.html',
									row_dictionaries=row_dictionaries,
									sorted_row_dictionaries=sorted_row_dictionaries,
									total_clicks=total_clicks,
									clicks_today=clicks_today,
									total_entries=total_entries,
									urls_created_today=urls_created_today,
									urls_created_last_7_days=urls_created_last_7_days,
									clicks_last_7_days=clicks_last_7_days,
									daily_click_average=daily_click_average,
									daily_url_average=daily_url_average
								  )
		# handle if the administrator's user or password is incorrect
		else:
			# show a JS message to the user
			flash('Incorrect username and/or password. Access Denied.')
			# reload the index page for user to try again
			return redirect(url_for('admin'))	

	elif request.method == 'GET':
		# display homepage with form to request a shortened url
		return render_template('admin.html')


# creates request approval route
@app.route('/approve_request/<id_number>')
def approve_request(id_number):
	# establish connection to database
	db_connection = get_db_connection()

	# increment the number of clicks in the database and close connection
	db_connection.execute('UPDATE urls SET status = ? WHERE id = ?',
						   ("APPROVED", id_number))
	db_connection.commit()
	db_connection.close()

	return redirect(url_for('admin'))


# creates request denied route
@app.route('/denied_request/<id_number>')
def denied_request(id_number):
	# establish connection to database
	db_connection = get_db_connection()

	# increment the number of clicks in the database and close connection
	db_connection.execute('UPDATE urls SET status = ? WHERE id = ?',
						   ("DENIED", id_number))
	db_connection.commit()
	db_connection.close()

	return redirect(url_for('admin'))


# creates delete request route
@app.route('/delete_request/<id_number>')
def delete_request(id_number):
	# establish connection to database
	db_connection = get_db_connection()

	# increment the number of clicks in the database and close connection
	db_connection.execute('DELETE FROM urls WHERE id = ?',
						   (id_number,))
	db_connection.commit()
	db_connection.close()

	return redirect(url_for('admin'))



