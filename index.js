const bodyParser = require('body-parser');
const express = require('express');
const app = express();


app.use(bodyParser.json());

let user ={
    name: "fahrul",
    nim:"12174964"
}

app.get('/', function (req, res) {
    res.json(user)
})

app.listen(4000,() => console.log('connect'))
