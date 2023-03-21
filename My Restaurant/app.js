const express=require('express')
const app=express();
var cons = require('consolidate');
const path=require('path')
const fs=require('fs');
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/booking_details');
  }

const port=80;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const info = mongoose.model('info', contactSchema);



//serving static file
app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.engine('html', cons.swig)
app.set('view engine', 'html');
app.set('views',path.join(__dirname,'views'))

//endpoint
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('index',params);
});

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact',params);
});

app.get('/menu',(req,res)=>{
    const params={}
    res.status(200).render('menu',params);
});

app.post('/contact', (req, res)=>{
    var myData = new info(req.body);
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(400).send('item was not saved to the databse')
});
})

//indicate server listening
app.listen(port,()=>{
    console.log(`application successfully started on port ${port}`)
})