const express = require('express');
const fs = require('fs');
const app = express();
const port = 5500;

app.use(express.json());

app.post('/products', (req, res) => {
    const data = req.body;

    fs.writeFile('products.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data');
        } else {
            console.log('Data saved successfully');
            res.status(200).send('Data saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:5500`);
});
