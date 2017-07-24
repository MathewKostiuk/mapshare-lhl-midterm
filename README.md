
![MapShare](public/images/screenshot-2.png?raw=true)

![MapShare](public/images/screenshot-3.png?raw=true)



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
  - [Click here to get API key for Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key)
  - Assign the API key to a variable called `MAP-API` within .env eg. `MAP-API=(Your API key here)`
2. Update the .env file with your correct local information - you will need to create a database on your local machine
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`
9. Right-click to create a new marker once you have selected a list

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Bcrypt 1.0.2
- Body-parser 1.17.2
- Cookie-session 2.0.0-beta.2
- Dotenv 4.0.0
- Ejs 2.5.6
- Express": "^4.15.3",
- Knex 0.13.0
- Knex-logger 0.1.0
- Morgan 1.8.2
- Node-sass-middleware 0.11.0
- Pg 7.0.1






