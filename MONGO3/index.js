const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));

main()
.then( () => {
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let chat1 = new Chat({
    from : "Krishna",
    to: "Rohit",
    msg: "Ka ho ka haal ba",
    created_at : new Date()
});

chat1.save()
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err)
})

//Home Route :-
app.get('/', (req, res) => res.send('Root is working'))

//Index Route :-
app.get("/chats", async (req,res) => {
   let chats = await Chat.find();
   console.log(chats);
   res.render("index.ejs",{chats});
})

//ADD NewChat Route:-
app.get("/chats/new",(req,res) => {
    res.render("new.ejs");
  })
  
app.post("/chats",(req,res) => {
    let {from,msg,to} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save()
    .then((res) => {
        console.log("chat was saved")
    })
    .catch((err) => {
        console.log(err)
    })
    
     res.redirect("/chats")
});

//Edit Route:-
app.get("/chats/:id/edit", async(req,res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
  })

//Update Route:-
app.put("/chats/:id", async(req,res) => {
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators: true, new:true})

    console.log(updatedChat);
    res.redirect("/chats")
})

//Delete Route:-
app.delete("/chats/:id", async(req,res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats")
    
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))