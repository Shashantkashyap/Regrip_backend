const express = require("express");
const app = express();
const bodyParser = require("body-parser")
require("dotenv").config();
const noteRoutes = require("./routes/notes")

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/api', noteRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.get("/",(req,res)=>{
    res.json("Server running successfully")
});

app.listen(Port,()=>{
    console.log(`server running on port no. ${Port} successfully`)
})