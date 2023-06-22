import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the customers.
router.get("/", async (req, res) => {
  let collection = await db.collection("customers");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single customer by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("customers");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new customer.
router.post("/", async (req, res) => {
  let newDocument = {
    devices: req.body.devices,
    dates: req.body.dates,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bday: req.body.bday,
    email: req.body.email,
    password: req.body.password,
  };
  let collection = await db.collection("customers");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a customer by id.
router.patch("/:id", async (req, res) => {
  console.log(req.body);
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      devices: req.body.devices,
      dates: req.body.dates,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bday: req.body.bday,
      email: req.body.email,
      password: req.body.password,
    },
  };
  console.log(updates);
  let collection = await db.collection("customers");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a customer
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("customers");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
