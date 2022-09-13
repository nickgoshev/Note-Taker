const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const uuid= require('uuid');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req,res)=>
res.sendFile(path.join(__dirname, 'public/index.html'))
);
app.get('/notes', (req,res)=>
res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('/api/notes', (req,res)=>
res.json(db)
);
app.post('/api/notes', (req, res)=> {

    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid.v1()
    }

    db.push(newNote)

      console.log(newNote);
      res.status(201).json(newNote);

});

app.get('*', (req,res)=>
res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, ()=>
    console.log(`Example app listening at http://localhost:${PORT}`)
);