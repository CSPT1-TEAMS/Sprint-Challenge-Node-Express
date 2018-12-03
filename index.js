const express = require('express')
const action = require('./actions')
const projects = require('./projects')
var bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Hello'))
app.use('/actions', action);
app.use('/projects',projects);


app.listen(3000, () => console.log('Listening on port 3000s'))