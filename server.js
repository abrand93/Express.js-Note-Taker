const express = require('express')
const notesdb = require('./db/db.json')
const app = express()
 const PORT = process.env.PORT || 3001
 const path = require('path')
 const fs = require('fs')
 const uniqid = require('uniqid')
 const routes = require('./public/assets/js/routes')



app.use(express.json())
app.use(express.urlencoded({extended: true}))
 app.use(express.static('public'))


// app.get('*', (req, res) =>{
//   res.sendFile(path.join(__dirname,'./public/index.html'))
// });

app.get('/notes', (req, res) =>{
  res.sendFile(path.join(__dirname,'./public/notes.html'))
//  console.log(notesdb)
});






app.get('/api/notes', (req, res) =>{
 res.json(notesdb)

 app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname,'/public/index.html'))
});

    
})

app.post('/api/notes', (req,res) =>{
  // res.json(notesdb)
const {title, text,  } = req.body
if(title && text){
const newNote = {
  title,
  text,
  id: uniqid()
}
fs.readFile('./db/db.json', 'utf-8',(err,data) =>{
  if (err){console.error(err)
  } else{
    const parsedNote = JSON.parse(data)
  
 

    parsedNote.push(newNote)
    notesdb.push(newNote)

 const noteString = JSON.stringify(newNote)

fs.writeFile('./db/db.json', JSON.stringify(parsedNote,null, 4), (err) => err ? console.error(err): console.log("It worked ",))
// notesdb.push(newNote)
res.json(notesdb)
}

})
}
})




app.listen(PORT,() => console.log(`server listening on http://localhost:${PORT}`))