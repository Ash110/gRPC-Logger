const logger = require("./middleware");

const express = require('express');

const app = express();
app.use(express.json());
app.use(logger);

app.post('/', (req,res) => {
    res.status(200).send(req.body);
});

app.listen(5000, () => console.log('Server Running'));