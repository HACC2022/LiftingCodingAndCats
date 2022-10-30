# Palekana URL Shortener
## TEam LiftingCodingAndCats
###Brad Ashburn and Christina Mende

## Inspiration
It is heartbreaking that kupuna are preyed upon by scammers online. And even the most tech savvy folks are not immune to falling victim. We feel passionate about this call to action by the Office of Enterprise Technology Services because we want Hawaii to be a safe space for our families, friends, and coworkers. We find ourselves in a perilious time of election denial and distrust of government. Imagine what would happen if the State released a shortened URL on social media that directed to a site with malware or ransomware. The damage would be immense. We built Palekana for government employees to easily create and curate safely-shortened urls for distribution to the public.


## What it does
Palekana provides a shortened URL using hash encoding/decoding. User requests are routed to a Pending Requests table in the admin dashboard for ETS security analysis. Upon administrator login, each request can then be easily approved or denied, with results being updated in the database. The application has full Create, Read, Update, and Delete (CRUD) functionality. When a user clicks on the shortened URL, Palekana redirects to the original URL.

Palekana is minimalistic and uncluttered for the busy user to submit an url request and be on their way. And for the administrator, a dashboard of data insights is shown right at login. Sorted request information is on **one click away** and can be approved or denied in one more click.

## How we built it
Python, Flask, and SQL were used on the backend. HTML/CSS/JS/jQuery/Bootstrap for the frontend. Since none of our team members have taken web application development or software engineering courses yet, copious amounts Stack Overflow and Google Fu were required.

## Challenges we ran into
Deploying the app was very challenging and required many hours of troubleshooting to fix server issues and bugs. The hosting provider had only outdated tutorial articles that resulted in many failed attempts and internal server errors. Also, as the app progressed, we added new features that required significant code revision and we had not used Github before, so learning it in addition to Flask, SQL, etc, was like drinking from a firehose.

## Accomplishments that we're proud of
The thing we are super proud about is our development process. We researched the problem with url shorteners on the market, ideated, built an MVC, then iterated on it to add stretch goal features. Many times we got stuck with bug after bug and spending hours going down tutorial rabbit holes that didn't pan out. But we persevered and learned so much. It felt like how real software is made, which was thrilling!

## What we learned
We have never created a web app in Python before, let alone one with a database, so nearly everything was new. There is a huge leap from the introductory ICS courses to building a functioning application designed for real world usage. Learning how to use the Flask framework, implementing SQL CRUD functionality, along with managing user login was a major level up in our skills.

## What's next for Palekana URL Shortener - Team LiftingCodingAndCats
Our team would love the opportunity to work with the Office of Enterprise Technology Services to turn Palekana into a valuable service for the Hawaii government. We would like to implement more robust security features such as multi-factor authenication and learn how to build insightful data visualizations that could be useful to Palekana administrators.
a
We would like to express our sincere gratitude to the organizers, sponsors, and judges for volunteering so much of their time to putting on this incredible event for our community!
