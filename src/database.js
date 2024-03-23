require("dotenv").config(); // load env file
const mongoose=require("mongoose")
const DB="mongodb+srv://y55:y55@cluster0.5jb58bg.mongodb.net/book";


mongoose.set('strictQuery', false);
mongoose.set('strictQuery', true);

mongoose.connect(DB)
.then(()=>{
   console.log("connected ")
})
.catch(()=>{

    console.log("faieled to connect")
})


// mongoose.set('strictQuery', false);
//  mongoose.set('strictQuery', true);
 
const BookSchema=new mongoose.Schema({
    book_name: { type: String, required: true },
    cover_image: { type: String, required: true },
    author_name: { type: String, required: true },
    isbn: { type: String, required: true },
    genres: { type: String, required: true },
    publisher: { type: String, required: true },
    quantity: { type: Number, default: 100 },
    price: { type: Number, default: 200 }
}, { timestamps: true });



const book = new mongoose.model("Book",BookSchema)

module.exports=book; 

