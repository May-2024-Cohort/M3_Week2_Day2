const express = require("express");
const logger = require("morgan");
const mongoose = require('mongoose')
const Recipe = require('./models/Recipe.model')
const axios = require('axios')

const app = express();



// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

mongoose.connect('mongodb://127.0.0.1:27017/express-mongoose-recipes-dev')
.then(()=>{console.log("Connected to my Database")})
.catch(()=>{console.log("Something went wrong in the connection to the DB")})




function myMiddlewareFunction(req,res,next){

    console.log("Middleware Activated")
    next()
}





// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route


app.post('/recipes',(req,res)=>{
    console.log(req.body)

    Recipe.create(req.body)
    .then((createdRecipe)=>{
        res.status(201).json(createdRecipe)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})


async function myFunction(){

    // let myRecipes = await Recipe.find()
    // let myName = await "Omar"
    // console.log(myRecipes)

    // Recipe.find()
    // .then((allRecipes)=>{
    //     console.log(allRecipes)
    // })



    try{
        let allStudents = await axios.get("https://omar-class-api.adaptable.app/studts")
        let allRecipes = await Recipe.find()
    
        console.log(allStudents.data)
        console.log(allRecipes)
    
    }catch(err){
        console.log("Issue with API")
    }
    



}

myFunction()



//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get('/recipes',myMiddlewareFunction,(req,res)=>{

    Recipe.find()
    .then((allRecipes)=>{
        res.json(allRecipes)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})




app.get('/recipes',async (req,res)=>{

    try{
        let recipes = await Recipe.find()

        res.json(recipes)
    
    }
    catch(err){
        res.status(500).json(err)
    }

})



//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

  app.get("/recipes/:id",async (req,res)=>{

    console.log(req.params.id)

    try{

       let foundRecipe = await Recipe.findById(req.params.id)

       res.json(foundRecipe)
    }catch(err){

        res.json(err)
    }
  })


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put('/recipes/:id', async (req,res)=>{
    

    try{
        let updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id,req.body,{new:true})

        res.json(updatedRecipe)

    }
    catch(err){

        res.json(err)

    }

})


let myName = {
    studentName : "Amit"
}

const {studentName} = myName

console.log(studentName)

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route


app.delete('/recipes/:id',(req,res)=>{

    const {id} = req.params

    try{
        let deletedRecipe = Recipe.findByIdAndDelete(id)

        res.json(deletedRecipe)

    }
    catch(err){
        res.json(err)
    }
})




// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
