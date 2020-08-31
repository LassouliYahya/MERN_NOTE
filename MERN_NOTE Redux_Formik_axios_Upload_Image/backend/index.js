const express = require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser = require('body-parser')
const cors =require("cors")
const {noteRoute}=require("./routes/noteRoute")

const port= process.env.PORT || 8080

mongoose
  .connect("mongodb://localhost:27017/backend_app_note", { useNewUrlParser: true , useUnifiedTopology: true  } )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

app.use(cors());  
// body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// static c-a-d file public all 
app.use(express.static('uploads'))

// routes
app.use("/",noteRoute);

// listen to port 8080
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});