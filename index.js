const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleWare
app.use(cors())
app.use(express.json())





const uri = "mongodb+srv://coffee-cup:XvM14GISFbJnOGvt@cluster0.rz3ftkv.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    
    // myDB
    const coffeeDB = client.db("coffeeDB");
    //myCollections
    const coffeeCollection = coffeeDB.collection("coffeeCollection");
    

  
      //get all coffee menu from DB
      app.get('/coffee', async(req, res)=>{
        const query = {};
        const result = await coffeeCollection.find(query).toArray()
        res.send(result)
      })

      // get only 3 menu from DB
      app.get('/coffee3', async(req, res)=>{
        const query = {};
        const result = await coffeeCollection.find(query).limit(3).toArray()
        res.send(result)
      })
    
  } finally {
    
  }
}
run().catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('Hey coffee lover!')
})

app.listen(port, () => {
  console.log(`coffee-shop server is listening on port ${port}`)
})