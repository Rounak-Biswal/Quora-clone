const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        "username" : "Rounak",
        "content" : "Hardwork is key to success"
    },
    {
        "username" : "Tulika",
        "content" : "Beauty lies in the eyes of the beholder"
    },
    {
        "username" : "Nikita",
        "content" : "All that glitters, are not gold"
    }
]

app.listen(port, () => {
    console.log(`server is live at ${port}`);
});

app.get("/posts", (req,res) => {
    res.render("home.ejs", { posts });
})

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

app.get("/posts/:username", (req,res) => {
    let { username } = req.params;
    let post = posts.find((p) => username === p.username);
    if(post){
        res.render("display.ejs", { post });
    }
    else{
        res.render("error.ejs");
    }
});

app.post("/posts", (req,res) => {
    let { username, content } = req.body;
    posts.push({ username, content });
    res.redirect("/posts");
});

/* PATCH(edit) ROUTE */

app.get("/posts/:username/edit", (req,res) => {
    let { username } = req.params;
    username = username.trim();         //had to use trim() due to some issues in local system
    let post = posts.find((p) => username === p.username);
    //console.log(post);
    res.render("edit.ejs", { post });
})

app.patch("/posts/:username", (req,res) => {
    let { username } = req.params;
    console.log(username);
    let newContent = req.body.content;
    let post = posts.find((p) => username === p.username);
    post.content = newContent;
    res.redirect("/posts");
});

/* DELETE ROUTE */

app.delete("/posts/:username", (req,res) => {
    let { username } = req.params;
    posts = posts.filter((p) => username !== p.username);
    res.redirect("/posts");
})