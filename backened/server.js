const express = require('express');
const { MongoClient } = require('mongodb');
const  cors = require('cors')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const client = new MongoClient(process.env.MONGO_URL);
const dbname = 'passop';

app.use(express.json()); 
app.use(cors())

client.connect();

app.get('/', async (req, res) => {
  const db = client.db(dbname);
  const collection = db.collection('passwords');
  const findres = await collection.find({}).toArray();
  res.json(findres);
});

app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbname);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.json({ success: true, result });
});

app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});
