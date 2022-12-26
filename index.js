const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json())
//bind and listen the connections of the PORT
app.listen(PORT, (err)=>{
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});
// transfers the file index.html to the path "/"
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});