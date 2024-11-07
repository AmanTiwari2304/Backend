const mongoose = require('mongoose');

main()
.then( () => {
    console.log("Connection Successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
};

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author : {
        type: String,
    },
    price:{
        type:Number,
        min: [1, "Price is too low for selling"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["Friction","Non-Friction"]
    },
    genre:[String]
});

const Book = mongoose.model("Book", bookSchema);

Book.findByIdAndUpdate(
    "67250e8536588b99d5b506fc",
    {price : -100},
    { runValidators : true}
)

// let book1 = new Book ({
//     title : "Marvel Comics v2",
//     price : 700,
//     genre : ["comic", "superman", "friction"]
    
// });
// book1.save()
.then((res) => {
    console.log(res)
})
.catch((err) => {
    console.log(err.errors.price.properties.message);
})