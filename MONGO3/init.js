const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
.then( () => {
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
};

let allChats = [
    {
    from : "Krishna",
    to: "Rohit",
    msg: "Ka ho ka haal ba",
    created_at : new Date()
},
{
    from : "Ansh",
    to: "Rishabh",
    msg: "Bhai aaj kis cheez ka exam hai",
    created_at : new Date()
},
{
    from : "Aryan",
    to: "Lovkush",
    msg: "Bhai scooty mai chalunga ",
    created_at : new Date()
},
{
    from : "Chootu",
    to: "Rohan",
    msg: "Es matter me kuch bhi nhi karna hai",
    created_at : new Date()
},
];

Chat.insertMany(allChats)

