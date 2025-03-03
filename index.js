const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.use(express.urlencoded({extend:true}));

app.set("view engine","ejs");
app.set("viwes",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`);
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs" , {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id, username , content});
    res.redirect("/posts");// thisline join the form page to index page 
});

let posts = [
    {
        id : uuidv4(),
        username : "Khushi23",
        content : "Goodlooking and sweet heart"
    },
    {
        id : uuidv4(),
        username : "Lucky",
        content : "Don't think what people think"
    },
    {
        id : uuidv4(),
        username : "Disha",
        content : "I am ready to fucking"
    },
];

app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
    console.log(post);
});
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    let newContent = req.body.content;
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

