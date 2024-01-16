const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mohiuddinctg6737  

// eGPuHspsBaYIApuh   
// XXgvPcDOH9X5yEIU


const uri = "mongodb+srv://mohiuddinctg6737:Vx336QXO0oHSqR2H@cluster0.yda2co5.mongodb.net/?retryWrites=true&w=majority";


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

    const userCollection = client.db('usersDB').collection('users');

    app.post('/users', async(req, res) => {
      const userData = req.body;
      console.log('new user: ', userData);
      const result = await userCollection.insertOne(userData);
      res.send(result);
    })


    // show data 
    app.get('/users', async(req, res) => {
      const result = await userCollection.find().toArray();
      console.log(result);
      res.send(result);
    })

    // find a single data for update 
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const user = await userCollection.findOne(query);
      res.send(user);
    })

    // delete single user 
    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log('id: ', id);
      const query = {
        _id: new ObjectId(id),
      };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () => {
    console.log(`Simple crud is running on port: ${port}`);
})

