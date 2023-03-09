const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const MusicianRoutes = require("./routes/musician");

const port = 3000;

//middleware to process body and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/musicians", MusicianRoutes);

//TODO
app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
