const express = require("express");
const app = express();
const { Musician } = require("./Musician");
const { sequelize } = require("./db");

const port = 3000;

//middleware to process body and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//TODO
app.get("/musicians", async (_, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

// route with id
// get musician by id as primary key
app.get("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

app.post("/musicians", async (req, res) => {
  try {
    const musician = await Musician.create(req.body);
    res.json(musician);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add Musician", error: err });
  }
});

// PUT
app.put("/musicians/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    musician.update(req.body);
    res.json(musician);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update Musician", error: err });
  }
});

app.delete("/musicians/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    musician.delete();
    res.json(musician);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete Musician", error: err });
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log(`Listening on port ${port}`);
});
