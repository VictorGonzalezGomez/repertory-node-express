const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const {promises: fsPromises} = require("fs");

app.use(cors());
app.use(express.json());
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
    if (song.titulo && song.artista && song.tono ){
        fs.promises.readFile('repertory.json', 'utf8')
            .then(function(result  ) {
                const resultJson = JSON.parse(result);
                const repertory = [...resultJson];
                repertory.push(song);
                (async function main() {
                    try {
                        await fsPromises.writeFile('repertory.json', JSON.stringify(repertory))
                        console.log("File write successfully");
                    } catch (err) {
                        console.error(err);
                    }})();
            }).catch(function(error) {
        })
        res.send('song added successfully!');
    }else{
        console.error("All fields are required")
        res.status(400).send("All fields are required!!!!");
    }
});
//getting the reapository.json with the songs
app.get("/canciones", (req, res) => {
    fs.promises.readFile('repertory.json', 'utf8')
        .then(function(result  ) {
            res.json(JSON.parse(result))
        });
});
// updating the song in the repository.json
app.put("/canciones/:id", (req,res)=>{
    const song = req.body;
    if(song.titulo && song.artista && song.tono){
        const {id} = req.params;
        fs.promises.readFile('repertory.json', 'utf8')
            .then(function(result  ) {
                const resultJson = JSON.parse(result);
                const repertory = [...resultJson];
                repertory[repertory.findIndex((elem)=> elem.id==id)]=song;
                (async function main() {
                    try {
                        await fsPromises.writeFile('repertory.json', JSON.stringify(repertory))
                        console.log("File update successfully");
                    } catch (err) {
                        console.error(err);
                    }})();
            }).catch(function(error) {
            console.log(error);
        })
        res.send("the songs was update successfully!");
    }else {
        res.send("All fields are required!!!!");
    }
});
//deleted song from repository.json
app.delete("/canciones/:id", (req,res)=>{
    const {id} = req.params;
    fs.promises.readFile('repertory.json', 'utf8')
        .then(function(result  ) {
            const resultJson = JSON.parse(result);
            const repertory = [...resultJson];
            repertory.splice(repertory.findIndex((elem)=> elem.id==id), 1);
            (async function main() {
                try {
                    await fsPromises.writeFile('repertory.json', JSON.stringify(repertory))
                    console.log("File update successfully");
                } catch (err) {
                    console.error(err);
                }})();
        }).catch(function(error) {
        console.log(error);
    })
    res.send("the songs was delete successfully!");
});