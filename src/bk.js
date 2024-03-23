const express=require("express");
const path = require("path");
const app =express();
const hbs=require("hbs")
const book =require("./database");
// const LoginCollection =require("./mongodb");
// const bookRoute=require('../routes/book/index')



const staticPath=path.join(__dirname, '../public');
const tempaletePath = path.join(__dirname,"../tempelates")
const partialsPath = path.join(__dirname,"../tempelates/partials")
//to set the view engine we will do this
app.use(express.json())
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:false}));


app.set("view engine","hbs");
app.set("views",tempaletePath)



hbs.registerPartials(partialsPath)



app.get("/",(req,res)=>{
    res.render('home')
})
//in templetes we use res.render 
app.get("/home",(req,res)=>{
    res.render('home')
})
//in templetes we use res.render 
app.get('/books', async(req, res, next)=> {
    const books= await book.find({});
    // console.log(books)
    res.render("books",{books})
   
  });
  app.get('/books/addbook', function(req, res, next) {
    res.render( 'addbook');
  });

  app.get("/login",(req,res)=>{
         
    res.render('login')

});
app.get("/signup",(req,res)=>{
    res.render("signup");

});




app.post('/addbook', async(req,res)=>{
    try{
    const book1 = await book.create(req.body);
    res.redirect("books");
    } catch(e){
        console.log(e.toString());
    }
 
});

// app.post('/signup', async(req,res)=>{
  
//     const data={
//         name:req.body.name,
        
//         password:req.body.password,
        
//     }
 
//     await LoginCollection.insertMany([data])
//     res.render("home")
// });
// app.post('/login',async(req,res,nex)=>{
//     // const {
//     //     email,
//     //     password
//     // } = req.body;
//     // const user = await userService.findUserByEmail(email, next);
//     // if (!user) {
//     //     res.locals.message = "User does not exist with this email.";
//     //     return res.redirect("/user/login")
//     // }
//     // if (!(bcrypt.compare(password, user.password))) {
//     //     res.locals.message = "Incorrect password.";
//     //     return res.redirect("/user/login")
//     // }
//     // const userId = user._id;
//     // const token = await tokenHelper.sign({ userId: userId }, next);
//     // user.token = token;
//     // delete user._id;
//     // await userService.updateUser(user, userId, next);
//     // res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 1 });
//     // return res.redirect("/user/profile");

// });
// app.post('/signup',async(req,res,next)=>{
// //     const {
// //         email,
// //         password
// //     } = req.body;
// //     const user = await userService.findUserByEmail(email, next);
// //     if (user) {
// //         res.locals.message = "User already exists.";
// //         return res.redirect("/user/signup")
// //     }
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     req.body.password = hashedPassword;
// //     const newUser = await userService.createUser(req.body, next);
// //     return res.redirect("/user/login");
// })

app.listen(8000, ()=>{
    console.log("listening to the port 8000")
})