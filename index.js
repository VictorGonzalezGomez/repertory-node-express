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
//adding songs to repertory.json
app.post("/canciones", (req, res) => {
    const song = req.body;
    const repertory = JSON.parse(fs.readFileSync('repertory.json', 'utf8'));
    repertory.push(song);
    fs.writeFileSync('repertory.json', JSON.stringify(repertory));
    res.send('song added succesfully')
});
//geting the reapository.json with the songs
app.get("/canciones", (req, res) => {
    const repertory = JSON.parse(fs.readFileSync('repertory.json'));
    res.json(repertory)
});