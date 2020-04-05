# 🍜 Ramen

💥 A **RESTful API** boilerplate built with **MongoDB**, **Express** & **Node**.

## Getting Started

This project was made to help with building RESTful APIs and microservices in a quick an easy manner ontop of Node.js, Express, Mongoose, Heroku, Atlas, Nodemon and Babel using async/await and JWT.

<!--![](https://media.giphy.com/media/DLYMDk6eYRbkA/giphy.gif)-->

![](https://media.giphy.com/media/Cd7Y7tJ4pHbGM/giphy.gif)

## Requirements

- [MongoDb/Atlas](https://cloud.mongodb.com/)
- [Express](https://expressjs.com/)
- [Node.js](http://nodejs.org/)
- [Heroku](https://heroku.com/) (Optional)
- [Postman](https://postman.com) (Recommended)

## Installation Steps

1. `npm i`
2. To run server: `npm start`
   - If you're housing your frontend with your api (frontend code within client directory), run `npm run dev` instead.

#### 💥 To connect to Atlas/Cloud.mongodb.com

- Make a copy of `config/default.example.json` to `config/default.json` with your cloud.mongo/atlas values.

#### 🚀 To deploy to Heroku:

##### Prerequisite: Put your frontend code into the `client` directory for the heroku npm script to run correctly.

- Create a Heroku account.
- Install heroku cli via their installer (link to heroku) or homebrew.
- Log into your heroku account with `heroku login`.
- Create the application on heroku with `heroku create`.
- And subsquently push to heroku with `git push heroku master`.

### Notes

- Non-MVC
  - No need for controllers since we're following the open/closed principle from S.O.L.I.D.

#### Todo's

- Add API documentation: https://www.postman.com/api-documentation-generator
- Mailer example with Nodemailer and Mailgun.
- Testing with mocha/chai for API endpoints.
- API autogenerated documentation by Postman.
- API collection example for Postman.
- Integrate dotenv
- Consider a different project structure :

```
─ src
  ─ api
    ─ components
      ─ user
        - controller.ts
        - model.ts
        - routes.ts
        - service.ts
```

---

## License
