const express = require('express')
const app = express()
const port = 3000
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const ExpressError = require("./ExpressError")

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
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
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
 try {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
 } catch (err) {
    next(err)
 }
})

//ADD NewChat Route:-
app.get("/chats/new",(req,res) => {
    // throw new ExpressError(404,"Page not found");
    res.render("new.ejs");
  })
  
app.post("/chats",async(req,res,next) => {
    try {
        let {from,msg,to} = req.body;
        let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    await newChat.save()
     res.redirect("/chats")
    } catch (err) {
     next(err);   
    }
    
});

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

//New - Show Route:-
app.get("/chats/:id/", asyncWrap (async(req,res,next) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        if(!chat) {
            next (new ExpressError(404,"Chat not found"));
        }
        res.render("edit.ejs",{chat});
      }))

//Edit Route:-
app.get("/chats/:id/edit", asyncWrap(async(req,res) => {
        let {id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs",{chat});
  }))

//Update Route:-
app.put("/chats/:id",asyncWrap (async(req,res) => { 
        let {id} = req.params;
        let {msg : newMsg} = req.body;
        let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg},{runValidators: true, new:true})
        console.log(updatedChat);
        res.redirect("/chats") 
}))

//Delete Route:-
try {
    app.delete("/chats/:id", async(req,res) => {
        let {id} = req.params;
        let deletedChat = await Chat.findByIdAndDelete(id);
        console.log(deletedChat);
        res.redirect("/chats")
    })   
} catch (error) {
    next(err)
}

const handleValidationErr = (err) => {
    console.log("This was a validation error. Please fallow rules");
    console.dir(err.message);
    return err;
}
app.use((err, req, res, next ) => {
    console.log(err.name);
    if(err.name === "ValidationError") {
       err = handleValidationErr(err)
    }
    next(err);
})
// Error handing middleware
  app.use((err,req,res,next) => {
    let {status = 500, message = "Some Error Occurred"} = err;
    res.status(status).send(message);
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))