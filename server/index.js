const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Mongo db

const uri = process.env.MONGODB_URI_COMPASS;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const userCollection = client.db("zenTaskDb").collection("users");
    const todoCollection = client.db("zenTaskDb").collection("todos");

    app.post("/users", async (req, res) => {
      const user = req.body;
      const existUser = await userCollection.findOne({ email: user.email });
      if (existUser?.email === user.email)
        return res.send("user already exists");
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/tasks", async (req, res) => {
      const todos = req.body;
      const result = await todoCollection.insertOne(todos);
      res.send(result);
    });

    app.get("/tasks/:email", async (req, res) => {
      const { email } = req.params;
      // console.log(email);

      const result = await todoCollection.find({ userEmail: email }).toArray();
      res.send(result);
    });

    app.get("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const result = await todoCollection.findOne({ _id: new ObjectId(id) });
      // console.log(result);

      res.send(result);
    });

    app.patch("/tasks/:id", async (req, res) => {
      const updatedTodo = req.body;

      const { id } = req.params;
      const result = await todoCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: updatedTodo.title,
            description: updatedTodo.description,
            category: updatedTodo.category,
            timeStamps: updatedTodo.timeStamps,
          },
        }
      );
      res.send(result);
    });

    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const result = await todoCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
