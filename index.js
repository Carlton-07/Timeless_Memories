import 'dotenv/config';
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { auth } from "express-openid-connect";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient, ServerApiVersion } from "mongodb";
const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.RANDOM,
    baseURL: 'https://timeless-memories-a264.onrender.com',
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: 'https://dev-5a6kmxh5c8c7ujdo.us.auth0.com'
  };
const uri = process.env.URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(auth(config));

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

// app.post("/create", (req,res) => {

// });

app.get('/create', (req, res) => {
    var isUser = req.oidc.isAuthenticated() ? 'Yes' : 'No';
    if(isUser){ 
        res.sendFile(__dirname + "/views/create.html");
    }else{
        res.send("Enter Correct Password.");
    }
});

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
