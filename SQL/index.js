const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
const port = 3000;

const { v4: uuidv4 } = require('uuid');
uuidv4();

const methodOverride = require('method-override');
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

//Home Route:-
app.get('/', (req, res) =>{
 let q = `SELECT COUNT(*) FROM user`;
 try {
  connection.query(q,(err, result) => {
    if(err) throw err;
    let count = result[0]["COUNT(*)"];
    res.render("home.ejs",{count});
  });
 } catch (err) {
  console.log(err);
  res.send("some error in Database");
 }
});

//Show Route:-
app.get("/user",(req,res) => {
  let q = `SELECT * FROM user`;
  try {
   connection.query(q,(err, users) => {
     if(err) throw err;
     res.render("showusers.ejs",{users});
    
   });
  } catch (err) {
   console.log(err);
   res.send("some error in Database");
  }
});

//Edit Route:-
app.get("/user/:id/edit",(req,res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
   connection.query(q,(err, result) => {
     if(err) throw err;
     let user = result[0];
     res.render("edit.ejs",{user});
    
   });
  } catch (err) {
   console.log(err);
   res.send("some error in Database");
  }
});

//UPDATE (DB) ROUTE:-
app.patch("/user/:id",(req,res) => {
  let {id} = req.params;
  let {password: formPass, username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
   connection.query(q,(err, result) => {
     if(err) throw err;
     let user = result[0];
     if(formPass != user.password){
      res.send("Wrong password");
     }else{
      let q2 = `UPDATE user SET username=' ${newUsername}' WHERE id='${id}'`;
      connection.query(q2,(err,result) => {
        if(err) throw err;
        res.redirect("/user");
      }) 
     }
     res.send(user);
   });
  } catch (err) {
   console.log(err);
   res.send("some error in Database");
  }
});

//ADD NEWUSER ROUTE:-

app.get("/user/new",(req,res) => {
  res.render("new.ejs");
})

app.post("/user",(req,res) => {
  let {username,email,password} = req.body;
  let id = uuidv4();
  
  let q = `INSERT INTO user (id, username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
  try {
      connection.query(q, (error,result) => {
          if(error) throw error;
          console.log(result);
          
      })
  } catch (error) {
      console.log(error)
  };

  res.redirect("/user")
});

//DELETE USER:-

app.get("/user/:id/delete", (req,res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`
  try {
   connection.query(q,(err, result) => {
     if(err) throw err;
     let user = result[0];
     res.render("delete.ejs",{user});
    
   });
  } catch (err) {
   console.log(err);
   res.send("some error in Database");
  }
});

//UPDATE DATABASE AFTER DELETE:-
app.delete("/user/:id",(req,res) => {
  let {id} = req.params;
  let {password: formPass, useremail: formemail} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
   connection.query(q,(err, result) => {
     if(err) throw err;
     let user = result[0];
     if(formPass != user.password || formemail != user.email){
      res.send("Wrong password Or email");
     }else{
      let q2 = `DELETE FROM user WHERE id='${id}'`;
      connection.query(q2,(err,result) => {
        if(err) throw err;
        res.redirect("/user");
      }) 
    }
   });
  } catch (err) {
   console.log(err);
   res.send("some error in Database");
  }
})

app.listen(port, () => console.log(`app listening on port ${port}!`))

// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'Aman@2210'
});

let  getRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.userName(),
     faker.internet.email(),
     faker.internet.password(),
  ];
};

// console.log(getRandomUser());

//Inserting New Data
// let q = "INSERT INTO user (id, username,email,password) VALUES ?";
// let users = [
// ["123b","123_newuserb","abc@gmail.comb","abcb"],
// ["123c","123_newuserc","abc@gmail.comc","abcc"],
// ];

// try {
//     connection.query(q, [users], (error,result) => {
//         if(error) throw error;
//         console.log(result);
//     })
// } catch (error) {
//     console.log(error)
// };

// connection.end();



