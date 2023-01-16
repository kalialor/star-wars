const express = require('express')                //enables us to use expressx
const MongoClient = require('mongodb').MongoClient
const app = express()  
const bodyParser = require('body-parser')                              
const connectionString = 'mongodb+srv://kalialor:Oliver@cluster0.lhtg5ww.mongodb.net/?retryWrites=true&w=majority'

/*
Great, we know that Express is handling the form for us right now. The next question is, how do we get the input values with 
Express? Turns out, Express doesn’t handle reading data from the <form> element on it’s own. We have to add another package 
called body-parser to gain this functionality.
Body-parser is a middleware. They help to tidy up the request object before we use them. Express lets us use 
middleware with the use method.  */



//Make sure you place body-parser before your CRUD handlers!

MongoClient.connect(connectionString, {useUnifiedTopology: true},)
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')                            //set up ejs file
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())


     //CRUD handlers
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
          .then(result => {
            res.redirect('/')
          })
          .catch(error => console.error(error))
      })
    
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
          { name: 'Yoda' },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote
            }
          },
          {
            upsert: true
          }
        )
          .then(result => res.json('Success'))
          .catch(error => console.error(error))
      })
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
          { name: req.body.name }
        )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json('Deleted Darth Vadar\'s quote')
          })
          .catch(error => console.error(error))
      })



    app.listen(3000, function(){
        console.log('Listening on 3000')
    })
})

  .catch(error => console.error(error))