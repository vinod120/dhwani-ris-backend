const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require('./routes/routes')

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api/users', userRoute)

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Error connecting the database")
    }
    else {
      console.log("Database successfully connected")
    }
  }
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`The server is up and running ${port}`);
});