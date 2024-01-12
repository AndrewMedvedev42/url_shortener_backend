const express = require('express');
const app = express();
const port = process.env.PORT || 5001
require('dotenv').config()
const connectToDataBase = require('./data/db.ts')
const bodyParser = require("body-parser"); //use to parse incoming request bodies
const urlServices = require("./routes/service.ts");
const Url = require("./data/url.model.js");
var cors = require('cors');

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `${process.env.CORS_HOST}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next()
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/url", async (req, res) => {
    try {
        if (!!urlServices.validateUrl(req.body.url))
            return res.status(400).send({ msg: "Invalid URL." });

        const shortUrlId = urlServices.generateUrlKey();
        const shortUrl = `${process.env.HOST}/${shortUrlId}`
        
        const url = new Url()

        url.longURL = req.body.url
        url.shortURL = shortUrl
        url.shortUrlId = shortUrlId

        await url.save()
        return res.status(200).send({ shortUrl });

    } catch (error) {
        console.log(error)
        return res.status(500).send({ msg: "Something went wrong. Please try again." });
    }
}); 

app.get("/:shortUrlId", async (req, res) => {
    try {
        const url = await Url.findOne({shortUrlId:req.params.shortUrlId});
        return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)

    } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong. Please try again.")
    }
}); 

const start = async () => {
    try {
        await connectToDataBase()
        app.listen(port, console.log(`Listening port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()