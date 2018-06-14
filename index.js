const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config()
const pc = require('./products_controller')

const app = express();
app.use( bodyParser.json() );
massive(process.env.CONNECTION_STRING)
.then(dbInstance=> app.set("db", dbInstance))
.catch(err=> console.log(err))

app.get("/api/products", pc.getAll)
app.get('/api/product/:id', pc.getOne)
app.post("/api/product", pc.create)
app.put('/api/product/:id', pc.update)
app.delete('/api/product/:id', pc.delete)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server listening on port ${port}`) } );