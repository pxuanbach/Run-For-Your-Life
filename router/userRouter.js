
const express = require("express")
const  router = express.Router()
const { User } = require("../models/user")

router.get('/',async function(req,res){
    var users = await User.find();
   if (users) {
     res.send(users);
   } else {
      res.status(500).send("Bad server");
   }
    
    
})

router.post("/login", async function(req,res){
    let user = await User.findOne({username : req.body.username})
    if (!req.body.username) {
        return res.status(400).send("Vui lòng nhập tài khoản");
      }
      if (!req.body.password) {
        return res.status(400).send("Vui lòng nhập mật khẩu");
    }
    if (!user) {
        return res.status(400).send("Tài khoản không hợp lệ");
      }
    if(user && (req.body.password==user.password)){ 
        return res.status(200).send("Đăng nhập thành công")
    }

})

//register
router.post('/register', async function(req,res){
    let user = User({
        email: req.body.email,
        username: req.body.username,
        password:req.body.password,
        phone: req.body.phone,
        sex: req.body.sex,
        address: req.body.address,
        fullname: req.body.fullname,
             
      });
      user
        .save()
        .then((createdUser) => {   
          res.send({username:createdUser.username,password:createdUser.password});
          console.log("Đăng ký thành công ^^")
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
            success: false,
          });
        });
})
module.exports = router;
