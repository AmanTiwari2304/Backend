const express = require('express')
const app = express()

// console.log(app);

let port = 3000;

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
});

//Method 1:-

// app.use(( req, res) => {
//     console.log("request received"); 
//     // res.send("this is a basic response")

//     // res.send({
//     //     name:"apple",
//     //     color:"red"
//     // });//Return data into json

//     let code = "<h1>Fruits</h1> <ul> <li>apple</li> <li>orange</li> </ul>";
//     res.send(code);
// });

//Method 2:-

app.get("/",(req,res) => {
    res.send("Use of nodemon to get this root path statement");
});

// app.get("/apple",(req,res) => {
//     res.send("You contacted apple path");
// });

// app.get("/orange",(req,res) => {
//     res.send("You contacted orange path");
// });

// app.get("*",(req,res) => {
//     res.send("this path");
// });

//Path Parameter :-
app.get("/:username/:id", (req,res) => {
    let {username,id} = req.params;
    let htmlStr = `<h1> Welcome to the page of @${username} ! </h1>`
    res.send(htmlStr);
    // res.send(`This account belongs to @${username} and his id is ${id}`)
})

//Query Strings:-
app.get("/search",(req,res) => {
    let {q} = req.query;
    if (!q) {
        res.send(`<h1> Nothing Search </h1>`);
    }
    res.send(`<h1> Search result for @${q} ! </h1>`);
})