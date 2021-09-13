# PIXELS

## Description

_Duration: 2 Week Sprint_

Pixels is a mood-tracker app that focuses on the trends and influences of your mood throughout your day. Check-in with yourself through the simple and efficient reflection process.

How are you doing? 
What activities were you up to? 
Who were you with? 

These questions can help inform you how people and activities influence your mood through trends and analysis. 

Check out this app on Heroku here:
https://still-fortress-20518.herokuapp.com/

## Screen Shot


![adding](/public/images/Screenshot1.png)
![adding](/public/images/Screenshot2.png)
![adding](/public/images/Screenshot3.png)
![adding](/public/images/Screenshot4.png)
![adding](/public/images/Screenshot5.png)
![adding](/public/images/Screenshot6.png)

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgresSQL](https://www.postgresql.org/)
- [Homebrew](https://brew.sh/)
- [Nodemon](https://nodemon.io/)

## Installation

If your application has secret keys (for example --  Twilio), make sure you tell them how to set that up, both in getting the key and then what to call it in the `.env` file.

1. Create a database named `pixels_solo_project`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using [Postico](https://eggerapps.at/postico/) to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. The `User` page greets you with an affirmation message to help set your reflection process on the right foot.
2. Once you're ready to start your reflection, you can begin with the `Mood Check-In`. Select the mood that best fits your mood in the moment (a simple rating 1-5).
3. After that, either select a word from `Word Associations` view or add your own word to the list. 
4. Now, let's select the activity you were up to. Select from the list provided, or add your own activity using the `Add Activity` modal.
5. While you're in the `Activities Check-In` you can also add who you were with during this reflection. Again, either choose from the provided list, or add your own relationship by adding their name and your relation to them.
6. As soon as you `Submit` your reflection, you're brought to the `Daily Overview` page where you get insight into your reflections for today. You can also access any other day through the `Date Picker` tool. Select the date to overview and click `Go` to view them.
7. You also have the option to either `edit` a reflection, or `delete` a reflection using the corresponding buttons in the `Daily Overview`. 
8. As soon as you're done reviewing your reflections day-to-day, you can head over to the `Mood Analysis` view through the menu to checkout some charts/graphs. 
9. The `Line Graph` gives you a visual of how your mood has progressed from the reflection #1 of the day to your last reflection you've made. 
10. The `Doughnut Chart` takes all of the reflections you've made using Pixels and breaks it down into how many of each mood you've logged. This gives you a visual of your overall mood and can inform you of trends. 


## Built With

- React
- Redux-Saga
- Node.js
- PostgreSQL
- Axios
- Express
- Material UI
- Chart.js


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality. Personal thanks to Paran, Jonathon, Seth, Vino, Mom and Dad for your continued support.

## Support
If you have suggestions or issues, please email me at [dillon.j.baxendell@gmail.com](www.google.com)

