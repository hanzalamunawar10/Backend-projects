const express=require('express');

const fs=require('fs');
const app=express();
const path=require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.get("/",function(req,res){//connecting front end
fs.readdir(`./files`,function(err,files){
    res.render("index",{files:files});
})


})


app.get("/files/:filename",function(req,res){//connecting front end
    fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err,filedata){
        res.render("show",{filename:req.params.filename,filedata: filedata});
    })
    })

app.post("/create",function(req,res){
   
fs.writeFile(`./files/${req.body.Title.split(' ').join('')}.txt`,req.body.detailes,function(err){
    res.redirect("/")
});
    })
// app.get("/profile/:username",function(req,res){//dynamic routes

// res.send(req.params.username);

// });

app.listen(3000)
