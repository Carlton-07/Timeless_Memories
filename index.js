import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
const __dirname = dirname(fileURLToPath(import.meta.url));

const uri = process.env.URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error){
    console.log(error);
  }
}

run().catch(console.dir);

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/create", (req,res) => {
    res.sendFile(__dirname + "/views/create.html");
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
