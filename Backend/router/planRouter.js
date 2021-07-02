const express = require("express")
const  router = express.Router()
const { planType, plan } = require("../models/plan")

router.get('/',async function(req,res){
    var plantype = await planType.find()
                                .populate({path: 'list'});
   if (plantype) {
     res.send(plantype);
   } else {
      res.status(500).send("Bad server");
   }
})

router.get('/items',async function(req,res){
    var pl = await plan.find();
   if (pl) {
     res.send(pl);
   } else {
      res.status(500).send("Bad server");
   }
})



router.get('/type',async function(req,res){
    var plantype = await planType.find();
   if (plantype) {
     res.send(plantype);
   } else {
      res.status(500).send("Bad server");
   }
})



router.post('/insertType', async (req, res) => {
    let newtype = planType({
        type: req.body.type,
        title: req.body.title,
    })
    console.log()
    newtype.save()
    .then((newtype)=> {
        res.status(200).send(newtype)
    })
    .catch((err)=>
    res.status(422).send(err)
    )
})


router.post('/insertPlan', async function(req,res){ 
    let pl = plan({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        webUrl: req.body.webUrl,
        plantype: req.body.plantype,
    });
    await pl
      .save()
      .then(async (pl)=>{
          const pt = await planType.findById({_id: pl.plantype})   
          pt.list.push(pl)
          await pt.save()         
          .then(()=>{
            res.status(200).send(pt);
            console.log("Thêm plan and push plantype thành công ^^");
          })
          .catch((err)=>{
              res.status(422).send(err)
          });
          
      })
      .catch((err)=>{
          res.status(500).json({
              error: err,
              status: 'Failure'
          })
      })
})



module.exports = router;
