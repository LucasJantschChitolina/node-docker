const express = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send("<h2>Hia Thereaa Foulksa!? grefte aNeste! A rar roberson!!!!<h2>")
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));