const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//middleware or parser 
app.use(express.urlencoded());
app.use(express.static('assets'));
/*//mddleware1
app.use(function(req,res,next){
    req.myName="Vipul";
    //console.log('middleware 1 called');
    next();
});
//middleware 2,middlewares can override each other
app.use(function(req,res,next){
    console.log('my name from mw2 ',req.myName);
    //console.log('middleware 2 called');
    next();
});*/
var contactList = [
    {
        name:"ARPAN",
        phone:"1111111111"
    },
    {
        name:"miku",
        phone:"1234567890"
    },
    {
        name:"nishu",
        phone:"0987654321"
    }
]
app.get('/',function(req,res){
   //console.log('from the get route controller',req.myName)
   //Contact.find({name:"Nick"},function(err,contacts){(to search using query or id or any such thing)
   Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
        });
   });

   
});
app.get('/practice',function(req,res){
   
    return res.render('practice',{title:"play with ejs"});
 });
app.get('/profile',function(req,res){
    res.send('<h1>cool,it is running</h1>');
});

app.post('/create-contact',function(req,res){
   // return res.redirect('/practice');
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    //can also write above command as 'contactList.push(req.body);'
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a contact');
        return;}
        console.log('********',newContact);
        return res.redirect('back');
    });
    //return res.redirect('/');
});

app.get('/delete-contact/',function(req,res){
     // console.log(req.query);
    // let phone=req.query.phone;
    // let contactIndex=contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');

    //get the id
    let id = req.query.id;
    //find the contact in database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
   

});
app.listen(port, function(err){
    if(err){ console.log('error occured',err); }
    console.log('express server is running:',port);
});