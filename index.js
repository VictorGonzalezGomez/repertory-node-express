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
    res.send('song added successfully!');
});
//getting the reapository.json with the songs
app.get("/canciones", (req, res) => {
    const repertory = JSON.parse(fs.readFileSync('repertory.json'));
    res.json(repertory);
});
// updating the song in the repository.json
app.put("/canciones/:id", (req,res)=>{
    const song = req.body;
    const {id} = req.params;
    const repertory = JSON.parse(fs.readFileSync('repertory.json'));
    repertory[repertory.findIndex((elem)=> elem.id===id)]=song;
    fs.writeFileSync('repertory.json', JSON.stringify(repertory));
    res.send("the songs was update successfully!");
});
//deleten song from rapository.json
app.delete("/canciones/:id", (req,res)=>{
    const {id} = req.params;
    const repertory = JSON.parse(fs.readFileSync('repertory.json'));
    repertory.splice(repertory[repertory.findIndex((elem)=> elem.id===id)], 1)
    fs.writeFileSync('repertory.json', JSON.stringify(repertory));
    res.send("the songs was delete successfully!");
});