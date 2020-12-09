const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const wordSearch = req.body.wordSearch;
    const langTran = "en-fr";
    const key = "dict.1.1.20200528T081452Z.ddcfe414dac8ab3a.a40b00bbfab3e7ddecf234fac2b9b2c971efa8b6";
    const url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=" + key + "&lang=" + langTran + "&text=" + wordSearch + "";
    https.get(url, function(response){
        response.on("data", function(data){
            const dictionaryData = JSON.parse(data);
            const frenchTrans = dictionaryData.def[0].tr[0].text;
            //const frenchSyn1 = dictionaryData.def[0].tr[0].syn[0].text;
            //const frenchSyn2 = dictionaryData.def[0].tr[0].syn[1].text;
            res.write("<h1>The French translation of " + wordSearch + " is " + frenchTrans + "</h1>");
            //res.write("<h3>Another synonym is " + frenchSyn1 +"</h3>");
            res.send();

        });
    });
});


app.listen(3000, function(){
    console.log("Server is running at Port 3000");
});