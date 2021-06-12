const express = require("express")
const  router = express.Router()
const { Food } = require("../models/food")

router.get('/',async function(req,res){
    var food = await Food.find();
   if (food) {
     res.send(food);
   } else {
      res.status(500).send("Bad server");
   }
    
    
})

router.post('/insert', async function(req,res){
    let food = Food({
        name:  req.body.name,
        type: req.body.type,
        urlImage: req.body.urlImage,
        calories: req.body.calories,
        totalWeight: req.body.serving_size_g,
        fat: req.body.fat_total_g,
        protein: req.body.protein_g,
        carbohydrates: req.body.carbohydrates_total_g,
        cholesterol: req.body.cholesterol_mg,
    });
    food
      .save()
      .then((newFood)=>{
          res.send({name:newFood.name , totalWeight: newFood.totalWeight,calories: newFood.calories })
          console.log("Thêm thức ăn thành công ^^")
      })
      .catch((err)=>{
          res.status(500).json({
              error: err,
              status: 'Failure'
          })
      })
})



module.exports = router;