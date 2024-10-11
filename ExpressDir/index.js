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
    res.send("You contacted root path");
});

app.get("/apple",(req,res) => {
    res.send("You contacted apple path");
});

app.get("/orange",(req,res) => {
    res.send("You contacted orange path");
});

app.get("*",(req,res) => {
    res.send("this path");
});