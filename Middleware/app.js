const  express = require('express')
const app = express()
const port = 3000

//logger
app.use((req,res,next) =>{
    req.responseTime = new Date (Date.now()).toString();
    console.log(req.method,req.path,req.responseTime,req.hostname)
    next();
})

const checkToken = ("/api",(req,res,next) => {
    let {token} = req.query;
    if (token === "giveaccess"){
        next();
    }
    throw new Error("ACCESS DENIED!")
})

app.get("/api", checkToken, (req,res) => {
    res.send("data");
})


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/random', (req, res) => {
        res.send('this is random page!')
});

app.use((req, res) => {
    res.send('Page not found')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))