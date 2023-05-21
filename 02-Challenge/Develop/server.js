const express = require('express')
const notes = require('./db/db.json')
const app = express()
 const PORT = 3001

app.get('/api', (req, res) =>{
    res.json(notes)
})

app.post('/api', (req, res) =>{

    res.json(`${req.method} was received`)
})





app.listen(PORT,() => console.log(`server listening on localhost:${PORT}`))