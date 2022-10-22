const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const saveBook = (data) => {
let results = JSON.stringify(data);
fs.writeFileSync("db.json", results)
}

const books = require("./db")

app.get('/books',(req,res) => {
    res.send(books)
})

app.get('/books/:id',(req,res) => {
    res.send(books.find(book => book.id === req.params.id))
}) 

app.post('/books', (req, res) => {

    books.push(req.body)
    saveBook(books)
    res.status(201).json(req.body)
})
app.put('/books/:id', (req, res) => {

    const updateIndex = books.findIndex(x => x.id == req.params.id)
    
    Object.assign(books[updateIndex], req.body)
    
    saveBook(books)
    
    res.status(200).json(req.body)
    
    }) 

app.delete('/books/:id', (req, res) => {

    const deletedIndex = books.findIndex(book => book.id === req.params.id)
    
    books.splice(deletedIndex, 1)
    
    saveBook(books)
    
    res.status(204).send()
    
    }) 

app.get('/',(req,res) => {
res.send('Hello World')
})
app.get('/getname',(req,res) => {
    res.send('Pokin Kittiyapinit')
})
app.listen(3000,() => {
    console.log('Start sever at port 3000.')
})
app.get('/getprofile',(req,res) => {
    let data = {
        name: 'Pokin Kittiyapinit',
        age: 29,
        apocalypse:'trust yourself',
        detail:'learn to more'
    }
    
    
    res.send(data)
})
app.get('/getabout',(req,res) => {
    let data = {
        name: 'Pokin Kittiyapinit',
        age: 29,
        email:'Pokin2292gg@gmail.com',
        address:'330/12'
    }
    
    
    res.send(data)
})
app.get('/getproject',(req,res) => {
    let data = {
        project_name: 'Tom Clancys Rainbow Six Siege Scrimmage SEASON 5',
        project_description:'แข่งเกมRainbow six siege ',
        Project_link:'https://www.youtube.com/watch?v=RW32ibiSSF8'
    }
    
    
    res.send(data)
})
app.get('/getcontact',(req,res) => {
    let data = {
        address:'Thailand',
        email:'Pokin2292gg@gmail.com',
        Phone_number:'0963578139'
    }
    
    
    res.send(data)
})
