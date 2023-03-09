const express = require("express");
const Musician = require("../Musician");

const { check, validationResult } = require("express-validator");

const app = express.Router();

app.use((req, res, next) => {
  console.log("Hit Musician Route");
  console.log("req method is", req.method);
  console.log("req path is", req.path);
  next();
});

app.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

// route with id
// get musician by id as primary key
app.get("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

app.post(
  "/",
  [check("name").not().isEmpty(), check("instrument").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
    }
    try {
      const musician = await Musician.create(req.body);
      res.json(musician);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to add Musician", error: err });
    }
  }
);

// PUT
app.put("/:id", async (req, res) => {
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

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    await musician.destroy();
    res.json(musician);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete Musician", error: err });
  }
});

module.exports = app;
