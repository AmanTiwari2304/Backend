const  express = require('express');
const app = express();
const port = 3000;
const ExpressError = require("./ExpressError");

//logger
// app.use((req,res,next) =>{
//     req.responseTime = new Date (Date.now()).toString();
//     console.log(req.method,req.path,req.responseTime,req.hostname)
//     next();
// })

const checkToken = ("/api",(req,res,next) => {
    let {token} = req.query;
    if (token === "giveaccess"){
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED!");
})

app.get("/api", checkToken, (req,res) => {
    res.send("data");
})

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/random', (req, res) => {
     res.send('this is random page!')
});

app.get("/err",(req,res) => {
    abcd= abcd
})

app.get("/admin",(req,res) => {
    throw new ExpressError(403,"Access to admin is forbidden")
})

// app.use((req, res) => {
//     res.send('Page not found')
// });

// Error Handling:-

app.use((err,req,res,next) => {
    let{status = 500,message = "Some Error Occurrred"} = err;
    res.status(status).send(message);
    
})


// app.use((err,req,res,next) => {
//     console.log("----ERROR----");
//     res.send(err);
//     // next(err);
// })

// app.use((err,req,res,next) => {
//     console.log("----ERROR 2----");
//     next();
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))