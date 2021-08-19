

const express = require('express');
const ejs= require('ejs'); // EJS import
const app = express();

const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://Gebruiker1:Gebruiker1@cluster0.oareg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

import mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const id: mongodb.ObjectId = new mongodb.ObjectId("5b681f5b61020f2d8ad4768d");

const DATABASE ="WebOntwikkeling";
const COLLECTION = "plantapp";

interface Plantapp{
  name: string;
  state: string;
  type: string;
  coordinates: any;
  _Id?: string
}

let planten:Plantapp[] = [
  {name: "Hemp", state:"Zaailing", type:"Point", coordinates: [	51.2194475, 4.4024643]},
  {name: "Braambes", state:"Groeifase", type:"Point", coordinates: [ 51.2194475, 4.5024643]},
  {name: "Tomaat", state:"Bloeifase",type:"Point", coordinates: [ 51.2164475, 4.5024643]},
  {name: "Marjolein", state:"Oogstfase",type:"Point", coordinates: [ 51.2194475, 4.2024643]},
  {name: "Koninginnekruid", state:"Dormant",type:"Point", coordinates: [ 51.2194475, 4.6024643]},
  {name: "Aardbeien", state:"Ziek",type:"Point", coordinates: [ 51.2194475, 4.4024643]},
  {name: "test", state:"Ziek",type:"Point", coordinates: [ 51.2194475, 4.3024643]},
  {name: "atest", state:"Ziek",type:"Point", coordinates: [ 51.2194475, 4.1024643]},
  
]

const mongoDbConnectie = async () => {
  try {
    // Connect the client to the server
    console.log("connecting");
    await client.connect();
    console.log("connection succes");
    await client.db(DATABASE).collection(COLLECTION).deleteMany({});
    await client.db(DATABASE).collection(COLLECTION).insertMany(planten);
  }  catch (exc) {
      console.log("connection failed");
  }  
}
mongoDbConnectie();

app.set('view engine', 'ejs'); // EJS als view engine
app.use(express.static('public'));   //nodig om css in te laden
app.use('/css', express.static(__dirname + 'public/css')); //verwijzing naar de css file
app.use('/img', express.static(__dirname + 'public/img')); //verwijzing naar de img folder
app.use('/js', express.static(__dirname + 'public/js')); //verwijzing naar de js folder
app.set('port', 3000);



app.get('/',(req:any,res:any)=>{
    res.render('index.ejs');
});

app.get('/plantbib.ejs', async (req:any,res:any)=>{
  try{
      let cursor = await client.db(DATABASE).collection(COLLECTION).find({});
      let allplants = await cursor.toArray();
      res.render("plantbib",{planten:allplants});
  }
  catch(exc){console.log(exc)}

});

app.get('/plantbib/:x', async (req:any,res:any)=>{
  try{
      let x =req.params.x;
      let plant= await client.db(DATABASE).collection(COLLECTION).findONE({_id:new ObjectId(x)});
      res.render("plantbib",{plant:plant});
  }
  catch(exc){console.log(exc)}

});

app.get('/planttips.ejs',(req:any,res:any)=>{
  res.render("planttips");
});
app.get('/daglengte.ejs',(req:any,res:any)=>{
  res.render("daglengte");
});

app.listen(app.get('port'), 
  ()=>console.log( '[server] http://localhost:' + app.get('port')));
export{}