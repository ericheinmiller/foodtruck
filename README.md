# foodtruck
Website to track food trucks depending on location

# Problem
Create a service that tells the user what types of food trucks might be found near a specific location on a map.

# Installation
Clone into a targeted folder and run npm start to start the server. 

# Technologies used and reasoning
Back-end
- NodeJS
- Express
- Node Socrata

Front-end
- Jquery
- Sass
- Bootstrap

It was a fairly small application so multiple technologies wasn't necessary. Node and Express was used to build the backend while the frontend was all Jquery and Bootstrap mainly. In a larger project I would've probably used Sequelize and Postgres for back-end databases, and react/redux as the front-end framework. In fact, I'm probably going to fork this repo and build this up into a proper project later this week.

What I did was send the searched address to the server, used Google's geocoding service to change the location address to longitude and latitude, expanded to range of the coordinates, then had the server make a SoQL request to the DataSF api to get locations of food trucks with those coordinates. Then the data was sent back to the client to be displayed.

I haven't implemented tests yet and that will be done with I expand this to a larger project.

# Contact Info
- email: ericheinmiller@gmail.com
- linkedin: https://www.linkedin.com/in/ericheinmiller
- resume: http://ericheinmiller-main.herokuapp.com/resume/Eric_Heinmiller_resume.pdf

# Deployed App
https://protected-forest-85987.herokuapp.com/
