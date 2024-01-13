const express = require('express');
const app = express();
const port = process.env.PORT || 5001
require('dotenv').config()
const connectToDataBase = require('./data/db.ts')
const bodyParser = require("body-parser"); //use to parse incoming request bodies
const urlServices = require("./routes/service.ts");
const Url = require("./data/url.model.js");
const isGoogleSafeBrowse = require("./google/google.ts")
var cors = require('cors');

//Cors settings
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.CORS_HOST}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Accept POST request
app.post("/url", async (req, res) => {
    try {
        //Check if url is safe
        if (await isGoogleSafeBrowse(req.body.url) && new URL(req.body.url)){
            // Create shorten url
            const shortUrlId = urlServices.generateUrlKey();
            const shortUrl = `${process.env.HOST}/${shortUrlId}`
                
            // Create new entry with data to database
            const url = new Url()
            url.longURL = req.body.url
            url.shortURL = shortUrl
            url.shortUrlId = shortUrlId
        
            await url.save()
            return res.status(200).send({ shortUrl });
        }else{
            return res.status(400).send({ msg: "Invalid URL." });
        }
    } catch (error) {
        return res.status(500).send({ msg: "Something went wrong. Please try again." });
    }
}); 

//When shorten url is used, find the entry with url in database and redirect full url
app.get("/:shortUrlId", async (req, res) => {
    try {
        const url = await Url.findOne({shortUrlId:req.params.shortUrlId});
        return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)

    } catch (error) {
        return res.status(500).send("Something went wrong. Please try again.")
    }
}); 

const start = async () => {
    try {
        //Connection to database
        await connectToDataBase()
        app.listen(port, console.log(`Listening port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
//Starts the server
start()